import { isImeComposing, shouldSubmitOnEnter, type ImeKeyEventLike } from '../core/ime-keyboard';

type TaskKeyEvent = ImeKeyEventLike;

/** Enter (or Ctrl/Meta+Enter) creates a task; Shift+Enter inserts a newline and IME confirmation never submits. */
export function shouldCreateTask(event: TaskKeyEvent): boolean {
  return shouldSubmitOnEnter(event, { allowCtrlOrMeta: true });
}

export function isImeKey(event: Pick<ImeKeyEventLike, 'isComposing' | 'keyCode' | 'which' | 'target'>): boolean {
  return isImeComposing(event);
}
