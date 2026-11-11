import test from "node:test";
import assert from "node:assert/strict";
import { LauncherMenuMachine } from "../src/launcher/launcher-menu-machine.ts";

test("LauncherMenuMachine initial state has no active menu and no delete confirmation", () => {
  const machine = new LauncherMenuMachine();
  assert.equal(machine.activeMenu, "none");
  assert.equal(machine.confirmingDelete, "none");
  assert.equal(machine.flyoutOpen, false);
});

test("LauncherMenuMachine ensures strictly one menu open at a time", () => {
  const machine = new LauncherMenuMachine();

  assert.ok(machine.send({ type: "OPEN_LINK_MENU" }));
  assert.equal(machine.activeMenu, "link");
  assert.equal(machine.isMenuOpen("link"), true);

  // Opening folder menu switches active menu
  assert.ok(machine.send({ type: "OPEN_FOLDER_MENU" }));
  assert.equal(machine.activeMenu, "folder");
  assert.equal(machine.isMenuOpen("folder"), true);
  assert.equal(machine.isMenuOpen("link"), false);

  // Close all resets
  assert.ok(machine.send({ type: "CLOSE_ALL" }));
  assert.equal(machine.activeMenu, "none");
});

test("LauncherMenuMachine manages secondary delete confirmations", () => {
  const machine = new LauncherMenuMachine();

  // Cannot request delete if no menu is open
  assert.equal(machine.send({ type: "REQUEST_DELETE", target: "link" }), false);

  machine.send({ type: "OPEN_LINK_MENU" });
  assert.ok(machine.send({ type: "REQUEST_DELETE", target: "link" }));
  assert.equal(machine.confirmingDelete, "link");
  assert.equal(machine.isConfirming("link"), true);

  // Canceling delete resets confirming state
  assert.ok(machine.send({ type: "CANCEL_DELETE" }));
  assert.equal(machine.confirmingDelete, "none");
});
