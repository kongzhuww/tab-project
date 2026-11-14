import { MulticaRequestError } from '../services/multica.service';
export { MulticaRequestError } from '../services/multica.service';

/** Delay repeated background reads; never automatically retry invalid credentials. */
export function commentPollBackoff(failures: number, error: unknown): { delay: number; blocked: boolean } {
  const blocked = error instanceof MulticaRequestError && (error.status === 401 || error.status === 403);
  const delay = error instanceof MulticaRequestError && error.status === 429
    ? Math.max(300000, error.retryAfterMs || 0)
    : Math.min(300000, 20000 * 2 ** Math.min(Math.max(failures, 0), 4));
  return { delay, blocked };
}
