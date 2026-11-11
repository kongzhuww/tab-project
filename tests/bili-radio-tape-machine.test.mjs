import test from "node:test";
import assert from "node:assert/strict";
import { BiliRadioTapeMachine } from "../src/bilibili/bili-radio-tape-machine.ts";

test("BiliRadioTapeMachine initial state is idle and uncollapsed", () => {
  const machine = new BiliRadioTapeMachine();
  assert.equal(machine.phase, "idle");
  assert.equal(machine.isDragOver, false);
  assert.equal(machine.isInserting, false);
  assert.equal(machine.isCollapsed, false);
  assert.equal(machine.isSeriesPickerOpen, false);
});

test("BiliRadioTapeMachine drag over and cassette insertion animation lifecycle", () => {
  const machine = new BiliRadioTapeMachine();

  assert.ok(machine.send({ type: "DRAG_ENTER" }));
  assert.equal(machine.phase, "drag_over");
  assert.equal(machine.isDragOver, true);

  assert.ok(machine.send({ type: "DRAG_LEAVE" }));
  assert.equal(machine.phase, "idle");

  assert.ok(machine.send({ type: "START_INSERT", title: "Cyberpunk Radio" }));
  assert.equal(machine.phase, "inserting");
  assert.equal(machine.isInserting, true);
  assert.equal(machine.insertedTitle, "Cyberpunk Radio");

  // Cannot open series picker during insert animation
  assert.equal(machine.send({ type: "TOGGLE_SERIES_PICKER", open: true }), false);

  assert.ok(machine.send({ type: "FINISH_INSERT" }));
  assert.equal(machine.phase, "idle");
  assert.equal(machine.isInserting, false);
  assert.equal(machine.insertedTitle, "");
});

test("BiliRadioTapeMachine dock collapse closes popovers", () => {
  const machine = new BiliRadioTapeMachine();

  assert.ok(machine.send({ type: "TOGGLE_SERIES_PICKER", open: true }));
  assert.equal(machine.isSeriesPickerOpen, true);

  // Collapsing automatically closes series picker
  assert.ok(machine.send({ type: "TOGGLE_COLLAPSE", collapsed: true }));
  assert.equal(machine.phase, "collapsed");
  assert.equal(machine.isCollapsed, true);
  assert.equal(machine.isSeriesPickerOpen, false);

  // Uncollapse returns to idle
  assert.ok(machine.send({ type: "TOGGLE_COLLAPSE", collapsed: false }));
  assert.equal(machine.phase, "idle");
  assert.equal(machine.isCollapsed, false);
});
