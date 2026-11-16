type TaskKeyEvent = Pick<KeyboardEvent, 'key' | 'isComposing' | 'keyCode' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey' | 'repeat'>;

/** Only an explicit shortcut may create a task; IME confirmation is never submission. */
export function shouldCreateTask(event: TaskKeyEvent): boolean {
  return event.key === 'Enter' && !event.isComposing && event.keyCode !== 229 &&
    (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && !event.repeat;
}

export function isImeKey(event: Pick<KeyboardEvent, 'isComposing' | 'keyCode'>): boolean {
  return event.isComposing || event.keyCode === 229;
}
