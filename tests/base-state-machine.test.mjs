import test from "node:test";
import assert from "node:assert/strict";
import { BaseStateMachine, getDiagnosticsMachines, registerMachineForDiagnostics } from "../src/core/state-machine.ts";

class CounterMachine extends BaseStateMachine {
  constructor() {
    super({ count: 0 }, "testCounter");
  }

  send(event) {
    if (event.type === "INC") {
      this.setState({ count: this._state.count + 1 }, event);
      return true;
    }
    if (event.type === "RESET") {
      this.setState({ count: 0 }, event);
      return true;
    }
    return false;
  }
}

test("BaseStateMachine records transition history in circular buffer", () => {
  const machine = new CounterMachine();
  assert.equal(machine.state.count, 0);
  assert.equal(machine.history.length, 0);

  machine.send({ type: "INC" });
  assert.equal(machine.state.count, 1);
  assert.equal(machine.history.length, 1);
  assert.equal(machine.history[0].fromState.count, 0);
  assert.equal(machine.history[0].toState.count, 1);
  assert.equal(machine.history[0].event.type, "INC");

  machine.send({ type: "INC" });
  assert.equal(machine.state.count, 2);
  assert.equal(machine.history.length, 2);
  assert.equal(machine.history[1].fromState.count, 1);
  assert.equal(machine.history[1].toState.count, 2);

  machine.send({ type: "RESET" });
  assert.equal(machine.state.count, 0);
  assert.equal(machine.history.length, 3);
  assert.equal(machine.history[2].toState.count, 0);
});

test("Diagnostics bridge provides list(), snapshot(), get(), and subscribeAll() for AX", () => {
  const counter = new CounterMachine();
  registerMachineForDiagnostics("diagCounter", counter);

  const bridge = getDiagnosticsMachines();

  // Test get()
  assert.equal(bridge.get("diagCounter"), counter);

  // Test list()
  const list = bridge.list();
  assert.ok("diagCounter" in list);
  assert.equal(list.diagCounter.count, counter.state.count);

  // Test snapshot()
  const snap = bridge.snapshot();
  assert.ok("diagCounter" in snap);
  assert.equal(snap.diagCounter.state.count, counter.state.count);
  assert.equal(snap.diagCounter.historyLength, counter.history.length);

  // Test subscribeAll()
  const transitions = [];
  const unsubscribeAll = bridge.subscribeAll((name, nextState, lastTransition) => {
    transitions.push({ name, nextState, lastTransition });
  });

  counter.send({ type: "INC" });
  assert.equal(transitions.length, 1);
  assert.equal(transitions[0].name, "testCounter");
  assert.equal(transitions[0].nextState.count, 1);

  unsubscribeAll();
  counter.send({ type: "INC" });
  // No new transition recorded after unsubscribeAll
  assert.equal(transitions.length, 1);
});
