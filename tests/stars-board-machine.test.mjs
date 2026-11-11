import test from "node:test";
import assert from "node:assert/strict";
import { BoardInteractionMachine } from "../src/github/stars-board-machine.ts";

const fixtureRepo = {
  id: 101,
  name: "tab-project",
  full_name: "test/tab-project"
};

test("BoardInteractionMachine initial state is idle with no drag or menu", () => {
  const machine = new BoardInteractionMachine();
  assert.equal(machine.mode, "idle");
  assert.equal(machine.isDraggingRepo, false);
  assert.equal(machine.isDraggingColumn, false);
  assert.equal(machine.activeDragRepo, null);
  assert.equal(machine.repoMenu, null);
  assert.equal(machine.columnMenu, null);
});

test("BoardInteractionMachine repo drag lifecycle with column hover", () => {
  const machine = new BoardInteractionMachine();

  assert.ok(machine.send({ type: "START_DRAG_REPO", repo: fixtureRepo, fromList: "tools" }));
  assert.equal(machine.mode, "dragging_repo");
  assert.equal(machine.isDraggingRepo, true);
  assert.equal(machine.activeDragRepo?.full_name, "test/tab-project");
  assert.equal(machine.activeDragFromList, "tools");

  assert.ok(machine.send({ type: "HOVER_TARGET_COLUMN", columnId: "favorites" }));
  assert.equal(machine.hoverTargetColumn, "favorites");

  assert.ok(machine.send({ type: "HOVER_TARGET_COLUMN", columnId: null }));
  assert.equal(machine.hoverTargetColumn, null);

  assert.ok(machine.send({ type: "END_DRAG_REPO" }));
  assert.equal(machine.mode, "idle");
  assert.equal(machine.isDraggingRepo, false);
  assert.equal(machine.activeDragRepo, null);
});

test("BoardInteractionMachine column drag lifecycle", () => {
  const machine = new BoardInteractionMachine();

  assert.ok(machine.send({ type: "START_DRAG_COLUMN", columnId: "col-1" }));
  assert.equal(machine.mode, "dragging_column");
  assert.equal(machine.isDraggingColumn, true);
  assert.equal(machine.draggingColumnId, "col-1");

  assert.ok(machine.send({ type: "HOVER_COLUMN_REORDER", columnId: "col-2" }));
  assert.equal(machine.hoverColumnId, "col-2");

  assert.ok(machine.send({ type: "END_DRAG_COLUMN" }));
  assert.equal(machine.mode, "idle");
  assert.equal(machine.draggingColumnId, null);
  assert.equal(machine.hoverColumnId, null);
});

test("BoardInteractionMachine repo context menu opens and closes", () => {
  const machine = new BoardInteractionMachine();

  assert.ok(machine.send({
    type: "OPEN_REPO_MENU",
    payload: {
      x: 100,
      y: 200,
      repo: fixtureRepo,
      fromList: null,
      activeSubMenu: "folder",
      isFlyoutLeft: false
    }
  }));
  assert.equal(machine.mode, "repo_context_menu");
  assert.equal(machine.repoMenu?.x, 100);
  assert.equal(machine.repoMenu?.repo.full_name, "test/tab-project");

  assert.ok(machine.send({ type: "CLOSE_REPO_MENU" }));
  assert.equal(machine.mode, "idle");
  assert.equal(machine.repoMenu, null);
});

test("BoardInteractionMachine column menu and repo menu are mutually exclusive", () => {
  const machine = new BoardInteractionMachine();

  machine.send({
    type: "OPEN_REPO_MENU",
    payload: { x: 50, y: 50, repo: fixtureRepo, fromList: null }
  });
  assert.equal(machine.mode, "repo_context_menu");

  // Opening column menu automatically closes repo menu
  machine.send({
    type: "OPEN_COLUMN_MENU",
    payload: { x: 80, y: 80, list: { id: "col-1", name: "Dev" } }
  });
  assert.equal(machine.mode, "column_menu");
  assert.equal(machine.repoMenu, null);
  assert.equal(machine.columnMenu?.list.name, "Dev");

  // RESET_IDLE closes everything
  machine.send({ type: "RESET_IDLE" });
  assert.equal(machine.mode, "idle");
  assert.equal(machine.columnMenu, null);
});
