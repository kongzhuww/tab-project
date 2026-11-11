import test from "node:test";
import assert from "node:assert/strict";
import { GitHubSettingsMachine } from "../src/github/github-settings-machine.ts";

test("GitHubSettingsMachine initial state is uninitialized", () => {
  const machine = new GitHubSettingsMachine();
  assert.equal(machine.phase, "uninitialized");
  assert.equal(machine.isReady, false);
  assert.equal(machine.isBusy, false);
  assert.equal(machine.testResult, null);
});

test("GitHubSettingsMachine load success and failure transitions", () => {
  const machine = new GitHubSettingsMachine();

  assert.ok(machine.send({ type: "LOAD_SUCCESS" }));
  assert.equal(machine.phase, "idle");
  assert.equal(machine.isReady, true);

  assert.ok(machine.send({ type: "LOAD_FAILURE", message: "Failed to load storage" }));
  assert.equal(machine.phase, "failed_load");
  assert.equal(machine.isReady, false);
  assert.equal(machine.message, "Failed to load storage");
});

test("GitHubSettingsMachine test token lifecycle with concurrency guard", () => {
  const machine = new GitHubSettingsMachine();
  machine.send({ type: "LOAD_SUCCESS" });

  assert.ok(machine.send({ type: "START_TEST" }));
  assert.equal(machine.phase, "testing");
  assert.equal(machine.isTesting, true);
  assert.equal(machine.isBusy, true);

  // Concurrency guard: cannot start save or test while testing
  assert.equal(machine.send({ type: "START_SAVE" }), false);
  assert.equal(machine.send({ type: "START_TEST" }), false);

  assert.ok(machine.send({
    type: "TEST_SUCCESS",
    result: { success: true, message: "Connected: @octocat", rateLimit: { remaining: 4999, limit: 5000 } }
  }));
  assert.equal(machine.phase, "idle");
  assert.equal(machine.isTesting, false);
  assert.equal(machine.testResult?.success, true);
  assert.equal(machine.testResult?.message, "Connected: @octocat");
});

test("GitHubSettingsMachine save lifecycle", () => {
  const machine = new GitHubSettingsMachine();
  machine.send({ type: "LOAD_SUCCESS" });

  assert.ok(machine.send({ type: "START_SAVE" }));
  assert.equal(machine.phase, "saving");
  assert.equal(machine.isSaving, true);

  assert.ok(machine.send({ type: "SAVE_COMPLETE", message: "Settings saved successfully." }));
  assert.equal(machine.phase, "idle");
  assert.equal(machine.isSaving, false);
  assert.equal(machine.message, "Settings saved successfully.");
});
