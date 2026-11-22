import { shouldSubmitOnEnter, type ImeKeyEventLike } from '../core/ime-keyboard';

export function shouldSendComposer(event: ImeKeyEventLike): boolean {
  return shouldSubmitOnEnter(event);
}
