import test from "node:test";
import assert from "node:assert/strict";
import { loadTsModule } from "./helpers/load-ts.mjs";

const { extractVariables, fillVariables } = await loadTsModule("src/backpack/utils.ts");

test("extractVariables correctly extracts single and multiple variable placeholders", () => {
  const template = "Review code in {{language}}:\n```{language}\n{{code_block}}\n```\nTarget: {target_audience}";
  const vars = extractVariables(template);
  assert.deepEqual(vars.sort(), ["code_block", "language", "target_audience"].sort());
});

test("extractVariables handles unicode variable names and trims cleanly", () => {
  const template = "请优化以下提示词：{{原始需求}}，要求风格为：{风格_style-1}";
  const vars = extractVariables(template);
  assert.deepEqual(vars.sort(), ["原始需求", "风格_style-1"].sort());
});

test("extractVariables ignores empty and pure numeric indices", () => {
  assert.deepEqual(extractVariables("Hello {} and {123}"), []);
});

test("fillVariables replaces matched placeholders and leaves untouched missing keys", () => {
  const template = "Translate {{text}} to {target_lang}. Mode: {{mode}}";
  const filled = fillVariables(template, {
    text: "Hello World",
    target_lang: "zh-CN"
  });
  assert.equal(filled, "Translate Hello World to zh-CN. Mode: {{mode}}");
});
