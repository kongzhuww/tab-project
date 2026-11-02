import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';

const { TodoistApiError, retryAfterMs, todoistHttpError, todoistErrorText } = await loadTsModule('src/todoist/api-error.ts');

test('Todoist Error: parses numeric retry-after header correctly', () => {
  assert.strictEqual(retryAfterMs('120'), 120000);
  assert.strictEqual(retryAfterMs('0'), 1000); // clamped to min 1000ms
  assert.strictEqual(retryAfterMs(null), 60000); // default fallback
});

test('Todoist Error: classifies HTTP response codes into semantic error kinds', () => {
  const mock401 = { status: 401, headers: new Headers() };
  const err401 = todoistHttpError(mock401);
  assert.strictEqual(err401.kind, 'auth');
  assert.strictEqual(err401.status, 401);

  const mock429 = { status: 429, headers: new Headers({ 'retry-after': '45' }) };
  const err429 = todoistHttpError(mock429);
  assert.strictEqual(err429.kind, 'rate-limit');
  assert.strictEqual(err429.retryAfterMs, 45000);

  const mock404 = { status: 404, headers: new Headers() };
  const err404 = todoistHttpError(mock404);
  assert.strictEqual(err404.kind, 'not-found');

  const mock500 = { status: 500, headers: new Headers() };
  const err500 = todoistHttpError(mock500);
  assert.strictEqual(err500.kind, 'http');
  assert.strictEqual(err500.status, 500);
});

test('Todoist Error: produces user-friendly localized messages without leaking tokens', () => {
  const rateLimitErr = new TodoistApiError('rate-limit', 429, 30000);
  assert.ok(todoistErrorText(rateLimitErr).includes('30 秒'));

  const authErr = new TodoistApiError('auth', 401);
  assert.ok(todoistErrorText(authErr).includes('账号或权限不可用'));

  const cancelledErr = new TodoistApiError('cancelled');
  assert.strictEqual(cancelledErr.name, 'AbortError');
  assert.ok(todoistErrorText(cancelledErr).includes('已取消'));
});
