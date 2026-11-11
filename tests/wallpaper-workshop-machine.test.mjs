import test from "node:test";
import assert from "node:assert/strict";
import { WorkshopMachine } from "../src/wallpaper/workshop-machine.ts";

test("WorkshopMachine initial state is idle", () => {
  const machine = new WorkshopMachine();
  assert.equal(machine.phase, "idle");
  assert.equal(machine.isScanning, false);
  assert.equal(machine.isApplying, false);
  assert.equal(machine.isDraggingOver, false);
  assert.equal(machine.applyingId, null);
});

test("WorkshopMachine scanning lifecycle", () => {
  const machine = new WorkshopMachine();

  assert.ok(machine.send({ type: "START_SCAN" }));
  assert.equal(machine.phase, "scanning");
  assert.equal(machine.isScanning, true);

  // Concurrency guard: cannot start another scan or apply while scanning
  assert.equal(machine.send({ type: "START_SCAN" }), false);
  assert.equal(machine.send({ type: "START_APPLY", itemId: "item-123" }), false);

  assert.ok(machine.send({ type: "SCAN_COMPLETE", count: 10 }));
  assert.equal(machine.phase, "idle");
  assert.equal(machine.isScanning, false);
});

test("WorkshopMachine applying wallpaper lifecycle with concurrency protection", () => {
  const machine = new WorkshopMachine();

  assert.ok(machine.send({ type: "START_APPLY", itemId: "wp-456" }));
  assert.equal(machine.phase, "applying");
  assert.equal(machine.isApplying, true);
  assert.equal(machine.applyingId, "wp-456");

  // Cannot trigger scan or another apply while applying
  assert.equal(machine.send({ type: "START_SCAN" }), false);
  assert.equal(machine.send({ type: "START_APPLY", itemId: "wp-789" }), false);

  assert.ok(machine.send({ type: "APPLY_COMPLETE" }));
  assert.equal(machine.phase, "idle");
  assert.equal(machine.isApplying, false);
  assert.equal(machine.applyingId, null);
});

test("WorkshopMachine drag file over and leave transitions", () => {
  const machine = new WorkshopMachine();

  assert.ok(machine.send({ type: "DRAG_ENTER" }));
  assert.equal(machine.phase, "dragging_file");
  assert.equal(machine.isDraggingOver, true);

  assert.ok(machine.send({ type: "DRAG_LEAVE" }));
  assert.equal(machine.phase, "idle");
  assert.equal(machine.isDraggingOver, false);
});
