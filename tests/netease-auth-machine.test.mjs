import test from "node:test";
import assert from "node:assert/strict";
import { NeteaseAuthMachine } from "../src/music/netease-auth-machine.ts";

test("NeteaseAuthMachine initial state without user is unauthenticated", () => {
  const machine = new NeteaseAuthMachine();
  assert.equal(machine.phase, "unauthenticated");
  assert.equal(machine.isConnecting, false);
  assert.equal(machine.isAuthenticated, false);
});

test("NeteaseAuthMachine connection lifecycle with success and logout", () => {
  const machine = new NeteaseAuthMachine();

  assert.ok(machine.send({ type: "START_CONNECT" }));
  assert.equal(machine.phase, "connecting");
  assert.equal(machine.isConnecting, true);

  // Concurrency guard: cannot start connect while already connecting
  assert.equal(machine.send({ type: "START_CONNECT" }), false);

  const mockUser = { userId: 12345, nickname: "MusicLover", avatarUrl: "https://example.com/avatar.jpg" };
  assert.ok(machine.send({ type: "CONNECT_SUCCESS", user: mockUser }));
  assert.equal(machine.phase, "authenticated");
  assert.equal(machine.isAuthenticated, true);
  assert.equal(machine.isConnecting, false);
  assert.equal(machine.state.user?.nickname, "MusicLover");

  // Logout
  assert.ok(machine.send({ type: "LOGOUT" }));
  assert.equal(machine.phase, "unauthenticated");
  assert.equal(machine.state.user, null);
});

test("NeteaseAuthMachine connection failure transitions to error", () => {
  const machine = new NeteaseAuthMachine();
  machine.send({ type: "START_CONNECT" });

  assert.ok(machine.send({ type: "CONNECT_FAILURE", message: "Network timeout" }));
  assert.equal(machine.phase, "error");
  assert.equal(machine.state.message, "Network timeout");
  assert.equal(machine.isAuthenticated, false);
});
