import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

export function validateManifestLocales(manifest, locales) {
  if (!locales[manifest.default_locale]) throw new Error("Missing default locale");
  for (const [locale, messages] of Object.entries(locales)) {
    for (const [field, limit] of [["name", 75], ["description", 132]]) {
      const raw = manifest[field];
      const key = /^__MSG_(.+)__$/.exec(raw || "")?.[1];
      const value = key ? (messages[key] ?? locales[manifest.default_locale][key])?.message : raw;
      if (typeof value !== "string" || !value.trim() || value.length > limit) {
        throw new Error(`${locale}: manifest ${field} must contain 1-${limit} characters`);
      }
    }
  }
}

export async function checkLocales(root) {
  const manifest = JSON.parse(await readFile(path.join(root, "manifest.json"), "utf8"));
  const locales = {};
  for (const entry of await readdir(path.join(root, "_locales"), { withFileTypes: true })) {
    if (entry.isDirectory()) {
      locales[entry.name] = JSON.parse(await readFile(path.join(root, "_locales", entry.name, "messages.json"), "utf8"));
    }
  }
  validateManifestLocales(manifest, locales);
  console.log(`Manifest locale limits passed (${Object.keys(locales).length} locales).`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await checkLocales(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."));
}
