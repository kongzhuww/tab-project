import { shallowRef, onBeforeUnmount, type ShallowRef } from "vue";

export interface SubscribableStateMachine<TState> {
  readonly state: TState;
  subscribe(listener: (state: TState) => void): () => void;
}

/**
 * Bridges any Tab-Project explicit State Machine into Vue's reactivity system.
 *
 * Automatically tracks state transitions, triggers re-computation of Vue computeds,
 * and cleans up subscription on component unmount.
 */
export function useMachine<TState>(machine: SubscribableStateMachine<TState>): ShallowRef<TState> {
  const state = shallowRef<TState>(machine.state);
  const unsub = machine.subscribe(next => {
    state.value = next;
  });

  try {
    onBeforeUnmount(unsub);
  } catch {
    // Non-setup context (e.g. testing or singleton service)
  }

  return state;
}
