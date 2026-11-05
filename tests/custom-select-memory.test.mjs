import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';
import { ref, computed, watch, nextTick, reactive } from 'vue';

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
async function fixture(store = new Map(), key = 'main-llm') {
  const props = reactive({ modelValue: 'a0', options: [
    ...Array.from({ length: 30 }, (_, i) => ({ value: `a${i}`, label: `A ${i}`, group: 'A' })),
    ...Array.from({ length: 30 }, (_, i) => ({ value: `b${i}`, label: `B ${i}`, group: 'B' }))
  ], grouped: true, memoryKey: key });
  const context = vm.createContext({ ref, computed, watch, nextTick,
    onMounted() {}, onBeforeUnmount() {}, onUnmounted() {},
    defineProps: () => props, withDefaults: p => p, defineEmits: () => () => {},
    localStorage: { getItem: k => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) }
  });
  vm.runInContext(stripTypeScriptTypes(await read('src/core/select-memory.ts')).replace(/^export /gm, ''), context);
  const sfc = await read('src/core/CustomSelect.vue');
  const script = sfc.match(/<script setup lang="ts">([\s\S]*?)<\/script>/)[1];
  vm.runInContext(stripTypeScriptTypes(script).replace(/^import .*;\s*$/gm, '') + `
    globalThis.picker = { toggleDropdown, closeDropdown, selectGroup, rememberPosition, restorePosition,
      selectOption, visibleOptions, groups, activeGroup, listRef, isOpen };
  `, context);
  const picker = context.picker;
  const list = { scrollTop: 0, clientHeight: 160,
    getBoundingClientRect: () => ({ top: 0 }),
    querySelectorAll: () => picker.visibleOptions.value.map((option, i) => ({
      dataset: { selectValue: String(option.value) },
      getBoundingClientRect: () => ({ top: i * 32 - list.scrollTop, bottom: (i + 1) * 32 - list.scrollTop })
    }))
  };
  picker.listRef.value = list;
  return { picker, list, props, store, context };
}

const settle = async () => { await nextTick(); await nextTick(); };

test('menu reopens at scrolled position, not the selected model or top', async () => {
  const { picker, list } = await fixture();
  picker.toggleDropdown(); await settle();
  list.scrollTop = 640;
  picker.closeDropdown(); list.scrollTop = 0;
  picker.toggleDropdown(); await settle();
  assert.equal(list.scrollTop, 640);
});

test('manufacturer buttons derive counts from options and preserve independent positions', async () => {
  const { picker, list } = await fixture();
  assert.equal(picker.groups.value[0].count, 30);
  picker.toggleDropdown(); await settle();
  await picker.selectGroup('A');
  assert.equal(picker.visibleOptions.value.length, 30);
  assert.ok(picker.visibleOptions.value.every(option => option.group === 'A'));
  list.scrollTop = 320;
  await picker.selectGroup('B'); list.scrollTop = 576;
  await picker.selectGroup('A'); assert.equal(list.scrollTop, 320);
  await picker.selectGroup('B'); assert.equal(list.scrollTop, 576);
});

test('remount retains manufacturer and scroll while primary/comparison/category stay isolated', async () => {
  const { picker, list, store } = await fixture();
  picker.toggleDropdown(); await settle(); await picker.selectGroup('B');
  list.scrollTop = 448; picker.closeDropdown();
  const reopened = await fixture(store);
  reopened.picker.toggleDropdown(); await settle();
  assert.equal(reopened.picker.activeGroup.value, 'B');
  assert.equal(reopened.list.scrollTop, 448);
  for (const key of ['compare-llm', 'main-vision']) {
    const other = await fixture(store, key);
    assert.equal(other.picker.activeGroup.value, '');
  }
});

test('anchor survives insertion of models before the visible item', async () => {
  const { picker, list, props } = await fixture();
  picker.toggleDropdown(); await settle(); list.scrollTop = 327;
  picker.closeDropdown();
  props.options.unshift({ value: 'new', label: 'New model', group: 'A' });
  await settle();
  list.scrollTop = 0; picker.toggleDropdown(); await settle();
  assert.equal(list.scrollTop, 359);
});

test('no history locates selected item; damaged preferences do not break opening', async () => {
  const { picker, list, props } = await fixture(new Map([['main-llm', '{bad-json']]));
  props.modelValue = 'a20'; picker.toggleDropdown(); await settle();
  assert.equal(list.scrollTop, 560);
});

test('opening before async options arrive does not erase saved manufacturer or position', async () => {
  const store = new Map([['main-llm', JSON.stringify({ group: 'B', positions: {
    B: { top: 320, anchor: 'b10', offset: 0 }
  } })]]);
  const { picker, list, props } = await fixture(store);
  const options = props.options;
  props.options = []; await settle();
  picker.toggleDropdown(); await settle();
  picker.rememberPosition();
  assert.equal(JSON.parse(store.get('main-llm')).positions.B.top, 320);
  props.options = options; await settle();
  assert.equal(picker.activeGroup.value, 'B');
  assert.equal(list.scrollTop, 320);
});

test('selection and outside/Escape close paths save position before destroying the list', async () => {
  const { picker, list, store } = await fixture();
  picker.toggleDropdown(); await settle(); list.scrollTop = 288;
  picker.selectOption({ value: 'a12' });
  assert.equal(picker.isOpen.value, false);
  assert.equal(JSON.parse(store.get('main-llm')).positions[''].top, 288);
  const source = await read('src/core/CustomSelect.vue');
  assert.match(source, /function handlePointerDown[\s\S]*?closeDropdown\(\)/);
  assert.match(source, /function handleKeydown[\s\S]*?closeDropdown\(\)/);
});
