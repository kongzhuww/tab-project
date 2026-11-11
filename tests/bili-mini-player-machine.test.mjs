import test from "node:test";
import assert from "node:assert/strict";
import { MiniPlayerMachine } from "../src/bilibili/mini-player-machine.ts";

test("MiniPlayerMachine initial state is closed", () => {
  const machine = new MiniPlayerMachine();
  assert.equal(machine.phase, "closed");
  assert.equal(machine.isOpen, false);
  assert.equal(machine.isLoading, false);
  assert.equal(machine.isPlaying, false);
  assert.equal(machine.isCollapsed, false);
  assert.equal(machine.isDrawerOpen("episodes"), false);
  assert.equal(machine.isDrawerOpen("desc"), false);
  assert.equal(machine.isDrawerOpen("comments"), false);
});

test("MiniPlayerMachine OPEN_START -> STREAM_RESOLVED -> PLAY / PAUSE", () => {
  const machine = new MiniPlayerMachine();

  assert.ok(machine.send({ type: "OPEN_START" }));
  assert.equal(machine.phase, "loading");
  assert.equal(machine.isOpen, true);
  assert.equal(machine.isLoading, true);
  assert.equal(machine.isPlaying, false);

  assert.ok(machine.send({ type: "STREAM_RESOLVED", isPlaying: true }));
  assert.equal(machine.phase, "playing");
  assert.equal(machine.isLoading, false);
  assert.equal(machine.isPlaying, true);

  assert.ok(machine.send({ type: "PAUSE" }));
  assert.equal(machine.phase, "paused");
  assert.equal(machine.isPlaying, false);

  assert.ok(machine.send({ type: "PLAY" }));
  assert.equal(machine.phase, "playing");
  assert.equal(machine.isPlaying, true);
});

test("MiniPlayerMachine ERROR phase clears loading and sets message", () => {
  const machine = new MiniPlayerMachine();
  machine.send({ type: "OPEN_START" });

  assert.ok(machine.send({ type: "ERROR", message: "Failed to fetch stream" }));
  assert.equal(machine.phase, "error");
  assert.equal(machine.isLoading, false);
  assert.equal(machine.isPlaying, false);
  assert.equal(machine.error, "Failed to fetch stream");
});

test("MiniPlayerMachine drawers toggle and cannot open when closed", () => {
  const machine = new MiniPlayerMachine();

  // Cannot open drawer when player is closed
  assert.equal(machine.send({ type: "TOGGLE_DRAWER", drawer: "comments", open: true }), false);

  machine.send({ type: "OPEN_START" });
  machine.send({ type: "STREAM_RESOLVED" });

  assert.ok(machine.send({ type: "TOGGLE_DRAWER", drawer: "comments", open: true }));
  assert.equal(machine.isDrawerOpen("comments"), true);

  assert.ok(machine.send({ type: "TOGGLE_DRAWER", drawer: "episodes", open: true }));
  assert.equal(machine.isDrawerOpen("episodes"), true);

  assert.ok(machine.send({ type: "TOGGLE_DRAWER", drawer: "comments", open: false }));
  assert.equal(machine.isDrawerOpen("comments"), false);
  assert.equal(machine.isDrawerOpen("episodes"), true);
});

test("MiniPlayerMachine collapsing automatically resets all open drawers and menus", () => {
  const machine = new MiniPlayerMachine();
  machine.send({ type: "OPEN_START" });
  machine.send({ type: "STREAM_RESOLVED" });

  machine.send({ type: "TOGGLE_DRAWER", drawer: "comments", open: true });
  machine.send({ type: "SET_QUALITY_MENU", open: true });

  assert.equal(machine.isDrawerOpen("comments"), true);
  assert.equal(machine.qualityMenuOpen, true);

  // Collapse player
  assert.ok(machine.send({ type: "TOGGLE_COLLAPSE", collapsed: true }));
  assert.equal(machine.isCollapsed, true);
  // All drawers and menus must be cleanly shut
  assert.equal(machine.isDrawerOpen("comments"), false);
  assert.equal(machine.qualityMenuOpen, false);

  // While collapsed, cannot open drawers or menus
  assert.equal(machine.send({ type: "TOGGLE_DRAWER", drawer: "desc", open: true }), false);
  assert.equal(machine.send({ type: "SET_SPEED_MENU", open: true }), false);
});

test("MiniPlayerMachine CLOSE cleans up everything", () => {
  const machine = new MiniPlayerMachine();
  machine.send({ type: "OPEN_START" });
  machine.send({ type: "STREAM_RESOLVED" });
  machine.send({ type: "TOGGLE_DRAWER", drawer: "episodes", open: true });

  assert.ok(machine.send({ type: "CLOSE" }));
  assert.equal(machine.phase, "closed");
  assert.equal(machine.isOpen, false);
  assert.equal(machine.isPlaying, false);
  assert.equal(machine.isDrawerOpen("episodes"), false);
});
