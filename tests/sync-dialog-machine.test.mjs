import test from "node:test";
import assert from "node:assert/strict";
import { SyncDialogMachine } from "../src/sync/sync-dialog-machine.ts";

test("SyncDialogMachine initial state is uninitialized and neither ready nor busy", () => {
  const machine = new SyncDialogMachine();
  assert.equal(machine.phase, "uninitialized");
  assert.equal(machine.isReady, false);
  assert.equal(machine.isBusy, false);
  assert.equal(machine.pendingOperation, null);
});

test("SyncDialogMachine INIT_SUCCESS brings machine to idle and ready", () => {
  const machine = new SyncDialogMachine();
  assert.ok(machine.send({ type: "INIT_SUCCESS" }));
  assert.equal(machine.phase, "idle");
  assert.equal(machine.isReady, true);
  assert.equal(machine.isBusy, false);
});

test("SyncDialogMachine INIT_FAILURE sets failed_init with error message", () => {
  const machine = new SyncDialogMachine();
  assert.ok(machine.send({ type: "INIT_FAILURE", error: "Failed to read storage" }));
  assert.equal(machine.phase, "failed_init");
  assert.equal(machine.isReady, false);
  assert.equal(machine.message, "Failed to read storage");
});

test("SyncDialogMachine save and test lifecycle", () => {
  const machine = new SyncDialogMachine();
  machine.send({ type: "INIT_SUCCESS" });

  // Start saving
  assert.ok(machine.send({ type: "START_SAVE" }));
  assert.equal(machine.phase, "saving");
  assert.equal(machine.isBusy, true);

  // Concurrency guard: cannot start another action while busy
  assert.equal(machine.send({ type: "START_TEST" }), false);
  assert.equal(machine.send({ type: "START_SAVE" }), false);

  // Complete saving
  assert.ok(machine.send({ type: "OPERATION_COMPLETE", message: "Settings saved" }));
  assert.equal(machine.phase, "idle");
  assert.equal(machine.isBusy, false);
  assert.equal(machine.message, "Settings saved");

  // Start testing
  assert.ok(machine.send({ type: "START_TEST" }));
  assert.equal(machine.phase, "testing");
  assert.equal(machine.isBusy, true);

  // Complete testing
  assert.ok(machine.send({ type: "OPERATION_COMPLETE", message: "WebDAV connection OK" }));
  assert.equal(machine.phase, "idle");
  assert.equal(machine.isBusy, false);
});

test("SyncDialogMachine backup confirmation and execution flow", () => {
  const machine = new SyncDialogMachine();
  machine.send({ type: "INIT_SUCCESS" });

  // Request operation
  assert.ok(machine.send({ type: "REQUEST_OPERATION", operation: "webdav-push" }));
  assert.equal(machine.phase, "confirming");
  assert.equal(machine.pendingOperation, "webdav-push");
  assert.equal(machine.isBusy, false);

  // Start sync execution
  assert.ok(machine.send({ type: "START_SYNC" }));
  assert.equal(machine.phase, "syncing");
  assert.equal(machine.isBusy, true);
  // Concurrency guard
  assert.equal(machine.send({ type: "REQUEST_OPERATION", operation: "webdav-pull" }), false);

  // Complete sync
  assert.ok(machine.send({ type: "OPERATION_COMPLETE", message: "Backup uploaded" }));
  assert.equal(machine.phase, "idle");
  assert.equal(machine.isBusy, false);
  assert.equal(machine.pendingOperation, null);
  assert.equal(machine.message, "Backup uploaded");
});

test("SyncDialogMachine cancel confirmation returns to idle without syncing", () => {
  const machine = new SyncDialogMachine();
  machine.send({ type: "INIT_SUCCESS" });

  assert.ok(machine.send({ type: "REQUEST_OPERATION", operation: "webdav-pull" }));
  assert.equal(machine.phase, "confirming");

  assert.ok(machine.send({ type: "CANCEL_CONFIRMATION" }));
  assert.equal(machine.phase, "idle");
  assert.equal(machine.pendingOperation, null);
  assert.equal(machine.isBusy, false);
});
