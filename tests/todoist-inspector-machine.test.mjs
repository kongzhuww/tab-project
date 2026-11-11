import test from "node:test";
import assert from "node:assert/strict";
import { TodoistInspectorMachine } from "../src/todoist/inspector-machine.ts";

test("TodoistInspectorMachine initial state has no active popover and no desc editing", () => {
  const machine = new TodoistInspectorMachine();
  assert.equal(machine.activePopover, "none");
  assert.equal(machine.isDescEditing, false);
  assert.equal(machine.isPopoverOpen("start_date"), false);
  assert.equal(machine.isPopoverOpen("priority"), false);
});

test("TodoistInspectorMachine ensures strictly one popover active at a time", () => {
  const machine = new TodoistInspectorMachine();

  assert.ok(machine.send({ type: "OPEN_POPOVER", popover: "start_date" }));
  assert.equal(machine.activePopover, "start_date");
  assert.equal(machine.isPopoverOpen("start_date"), true);
  assert.equal(machine.isPopoverOpen("due_date"), false);

  // Opening another popover automatically closes the previous one (accordion pattern)
  assert.ok(machine.send({ type: "OPEN_POPOVER", popover: "priority" }));
  assert.equal(machine.activePopover, "priority");
  assert.equal(machine.isPopoverOpen("start_date"), false);
  assert.equal(machine.isPopoverOpen("priority"), true);

  // Toggle same popover closes it
  assert.ok(machine.send({ type: "TOGGLE_POPOVER", popover: "priority" }));
  assert.equal(machine.activePopover, "none");
});

test("TodoistInspectorMachine editing description closes open popover", () => {
  const machine = new TodoistInspectorMachine();
  machine.send({ type: "OPEN_POPOVER", popover: "labels" });
  assert.equal(machine.isPopoverOpen("labels"), true);

  // Starting description edit closes popovers
  assert.ok(machine.send({ type: "START_DESC_EDIT" }));
  assert.equal(machine.isDescEditing, true);
  assert.equal(machine.activePopover, "none");

  assert.ok(machine.send({ type: "FINISH_DESC_EDIT" }));
  assert.equal(machine.isDescEditing, false);
});
