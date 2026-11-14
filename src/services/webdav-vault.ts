declare const chrome: any;
const KEY = 'webdavBackupPassphraseV1';
function areas() {
  if (typeof chrome === 'undefined' || !chrome.storage?.local || !chrome.storage?.session) throw new Error('需要在浏览器扩展中管理备份口令');
  return { local: chrome.storage.local, session: chrome.storage.session };
}
export const webdavVault = {
  async get(): Promise<string | null> {
    const { local, session } = areas();
    if (session.setAccessLevel) await session.setAccessLevel({ accessLevel:'TRUSTED_CONTEXTS' });
    const temporary = (await session.get(KEY))[KEY];
    if (typeof temporary === 'string' && temporary.length >= 8) return temporary;
    const remembered = (await local.get(KEY))[KEY];
    return typeof remembered === 'string' && remembered.length >= 8 ? remembered : null;
  },
  async remember(password: string, permanent: boolean): Promise<void> {
    if (password.length < 8) throw new Error('备份口令至少需要 8 个字符');
    const { local, session } = areas();
    if (session.setAccessLevel) await session.setAccessLevel({ accessLevel:'TRUSTED_CONTEXTS' });
    // Store before clearing the old copy; a storage failure never deletes the only copy.
    if (permanent) { await local.set({ [KEY]:password }); await session.remove(KEY); }
    else { await session.set({ [KEY]:password }); await local.remove(KEY); }
  },
  async forget(): Promise<void> {
    const { local, session } = areas();
    await session.remove(KEY); await local.remove(KEY);
  }
};
