import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { checkLocales, validateManifestLocales } from "../scripts/validate-locales.mjs";

const root = new URL("../", import.meta.url);
const read = name => readFile(new URL(name, root), "utf8");
async function dictionary(locale) {
  const js = stripTypeScriptTypes(await read(`src/i18n/locales/${locale}.ts`));
  // Execute the actual dictionary in isolation, without Vue or installed dependencies.
  return vm.runInNewContext(js.replace(/export default /, "globalThis.dictionary = ").replace(/export \{[^}]*\};?/g, "") + "\ndictionary;");
}
const zh = await dictionary("zh");
const en = await dictionary("en");
const source = stripTypeScriptTypes(await read("src/i18n/index.ts"))
  .replace(/^import .*;\s*$/gm, "")
  .replace(/^export /gm, "");
const flush = () => new Promise(resolve => setImmediate(resolve));

function page({ saved, chrome, browserLanguage = "zh-CN", blocked = false } = {}) {
  const cache = new Map(saved ? [["app_language", saved]] : []);
  const events = {};
  const warnings = [];
  const localStorage = {
    getItem: key => { if (blocked) throw Error("blocked"); return cache.get(key) ?? null; },
    setItem: (key, value) => { if (blocked) throw Error("blocked"); cache.set(key, value); }
  };
  const context = vm.createContext({
    ref: value => ({ value }), zh, en, chrome,
    localStorage, navigator: { language: browserLanguage },
    document: { documentElement: { lang: "" } },
    window: { addEventListener: (name, callback) => { events[name] = callback; } },
    console: { warn: message => warnings.push(message) }
  });
  vm.runInContext(source + "\nglobalThis.api = { t, setLanguage, currentLanguage };", context);
  return { ...context.api, context, cache, events, localStorage, warnings };
}
function storageBus(initial) {
  let value = initial;
  const listeners = [];
  const writes = [];
  const emit = (next, area = "local") => {
    for (const listener of listeners) listener({ app_language: { newValue: next } }, area);
  };
  const chrome = { storage: {
    onChanged: { addListener: callback => listeners.push(callback) },
    local: {
      get: async () => ({ app_language: value }),
      set: async data => { writes.push(data.app_language); value = data.app_language; emit(value); }
    }
  } };
  return { chrome, emit, writes };
}

test("all manifest locales satisfy name and description limits", async () => {
  await checkLocales(fileURLToPath(root));
});

test("manifest validation rejects overlong localized descriptions and missing default locale", () => {
  const manifest = { default_locale: "en", name: "__MSG_extName__", description: "__MSG_extDescription__" };
  const messages = length => ({ en: { extName: { message: "Tab" }, extDescription: { message: "a".repeat(length) } } });
  assert.doesNotThrow(() => validateManifestLocales(manifest, messages(132)));
  assert.throws(() => validateManifestLocales(manifest, messages(133)), /description/);
  assert.throws(() => validateManifestLocales(manifest, {}), /default locale/);
});

test("translation keys and placeholder sets agree", () => {
  assert.deepEqual(Object.keys(en).sort(), Object.keys(zh).sort());
  const placeholders = value => [...new Set([...value.matchAll(/\{([^{}]+)\}/g)].map(match => match[1]))].sort();
  for (const key of Object.keys(zh)) {
    assert.ok(zh[key].trim() && en[key].trim(), key);
    assert.deepEqual(placeholders(zh[key]), placeholders(en[key]), key);
  }
});

test("interpolation preserves dollar syntax, braces, repeated placeholders and Unicode literally", () => {
  const p = page({ saved: "en" });
  const name = "cost$& $` $' $$ {count} 中文";
  assert.equal(p.t("todoist.deleteTaskAlert", { name, count: 99 }), `Are you sure you want to delete task "${name}"?`);
  assert.equal(p.t("todoist.deleteTaskAlert"), en["todoist.deleteTaskAlert"]);
  assert.equal(p.t("topbar.notificationsUnread", { count: 3 }), "Notifications, 3 unread");
  const key = "test.repeated";
  en[key] = "{name} / {name}";
  try { assert.equal(p.t(key, { name: "$&" }), "$& / $&"); }
  finally { delete en[key]; }
});

test("local preference and browser fallback initialize document language", () => {
  const local = page({ saved: "en" });
  assert.equal(local.currentLanguage.value, "en");
  assert.equal(local.context.document.documentElement.lang, "en");
  const blocked = page({ blocked: true, browserLanguage: "en-US" });
  blocked.setLanguage("zh");
  assert.equal(blocked.currentLanguage.value, "zh");
  assert.equal(blocked.context.document.documentElement.lang, "zh");
  assert.equal(page({ saved: "invalid", browserLanguage: "zh-TW" }).currentLanguage.value, "zh");
});

test("extension preference hydrates stale cache and synchronizes open pages without echo writes", async () => {
  const bus = storageBus("en");
  const a = page({ saved: "zh", chrome: bus.chrome });
  const b = page({ chrome: bus.chrome });
  await flush();
  assert.equal(a.currentLanguage.value, "en");
  assert.equal(b.context.document.documentElement.lang, "en");
  a.setLanguage("zh");
  await flush();
  assert.equal(b.currentLanguage.value, "zh");
  assert.equal(b.cache.get("app_language"), "zh");
  assert.deepEqual(bus.writes, ["zh"]);
  bus.emit("en", "sync");
  bus.emit("fr");
  assert.equal(b.currentLanguage.value, "zh");
});

test("late hydration cannot undo a local selection or a storage notification", async () => {
  for (const remote of [false, true]) {
    const bus = storageBus("zh");
    let resolveRead;
    bus.chrome.storage.local.get = () => new Promise(resolve => { resolveRead = resolve; });
    const p = page({ chrome: bus.chrome });
    if (remote) bus.emit("en"); else p.setLanguage("en");
    resolveRead({ app_language: "zh" });
    await flush();
    assert.equal(p.currentLanguage.value, "en");
  }
});

test("rapid choices are persisted in order and invalid choices are ignored", async () => {
  const bus = storageBus("zh");
  const p = page({ chrome: bus.chrome });
  await flush();
  p.setLanguage("en"); p.setLanguage("zh"); p.setLanguage("fr");
  await flush();
  assert.deepEqual(bus.writes, ["en", "zh"]);
  assert.equal(p.currentLanguage.value, "zh");
});

test("failed extension reads and writes are handled without losing immediate UI changes", async () => {
  const bus = storageBus("zh");
  bus.chrome.storage.local.get = async () => { throw Error("read failure"); };
  bus.chrome.storage.local.set = async () => { throw Error("write failure"); };
  const p = page({ chrome: bus.chrome });
  await flush();
  p.setLanguage("en");
  await flush();
  assert.equal(p.currentLanguage.value, "en");
  assert.equal(p.warnings.length, 2);
});

test("browser preview uses same-origin storage events and ignores unrelated data", () => {
  const p = page();
  p.events.storage({ key: "app_language", newValue: "en", storageArea: p.localStorage });
  assert.equal(p.currentLanguage.value, "en");
  p.events.storage({ key: "app_language", newValue: "fr", storageArea: p.localStorage });
  p.events.storage({ key: "other", newValue: "zh", storageArea: p.localStorage });
  p.events.storage({ key: "app_language", newValue: "zh", storageArea: {} });
  assert.equal(p.currentLanguage.value, "en");
});

test("known UI regression points call translations rather than hardcoded labels", async () => {
  const todoist = await read("src/todoist/TodoistTaskList.vue");
  for (const action of ["closePromptModal", "closeConfirmModal"]) {
    assert.ok(todoist.includes(`@click="${action}">{{ t('common.cancel') }}`));
  }
  const topbar = await read("src/layout/AppTopBar.vue");
  assert.ok(topbar.includes("t('topbar.notificationsUnread', { count: notificationUnreadCount })"));
  const wheel = await read("src/nav-wheel/runtime.ts");
  assert.ok(wheel.includes('t("navwheel.editSites")'));
  assert.ok(wheel.includes('t("navwheel.finishEdit")'));
  assert.ok(wheel.includes("watch(currentLanguage,"));
  assert.ok(wheel.includes("stopLanguageWatch?.()"));
});
