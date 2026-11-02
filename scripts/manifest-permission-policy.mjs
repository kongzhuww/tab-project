// A reviewed ceiling, not a claim that all retained permissions are least-privilege.
// Removing a permission is allowed; additions require reviewing this policy and the audit.
export const reviewedApiPermissions = Object.freeze([
  'storage', 'unlimitedStorage', 'topSites', 'bookmarks', 'favicon', 'alarms',
  'activeTab', 'tabs', 'cookies', 'declarativeNetRequest', 'identity', 'scripting',
  'notifications', 'downloads', 'contextMenus', 'clipboardWrite',
]);

const retiredHosts = ['multica.ai', 'weread.qq.com'];

export function auditManifestPermissions(manifest) {
  const errors = [];
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) return ['Invalid manifest'];
  if (manifest.manifest_version !== 3) errors.push('Manifest must use MV3');
  for (const key of ['permissions', 'host_permissions', 'optional_permissions', 'optional_host_permissions']) {
    const values = manifest[key] ?? [];
    if (!Array.isArray(values) || values.some(value => typeof value !== 'string')) {
      errors.push(key + ' must be an array of strings');
      continue;
    }
    if (new Set(values).size !== values.length) errors.push(key + ' contains duplicates');
    if (key.endsWith('host_permissions')) {
      for (const value of values) {
        // HTTP(S) broad access is deliberately retained and recorded as unresolved risk.
        if (!/^https?:\/\/[^/]+\/\S*$/.test(value)) {
          errors.push('Only HTTP(S) host patterns are reviewed: ' + value);
          continue;
        }
        const host = value.split('/')[2].replace(/^\*\./, '').toLowerCase();
        if (retiredHosts.some(retired => host === retired || host.endsWith('.' + retired))) {
          errors.push('Retired host declaration: ' + value);
        }
      }
    } else {
      for (const value of values) {
        if (!reviewedApiPermissions.includes(value)) errors.push('Unreviewed API permission: ' + value);
      }
    }
  }
  if (manifest.side_panel !== undefined) errors.push('Native side_panel is retired');
  if (manifest.externally_connectable !== undefined) errors.push('External messaging requires a separate review');
  if (manifest.content_scripts?.length) errors.push('Automatic content scripts require a separate review');
  for (const group of manifest.web_accessible_resources ?? []) {
    if (!Array.isArray(group.matches) || group.matches.some(value => typeof value !== 'string' || !/^https?:\/\//.test(value))) {
      errors.push('Web-accessible resources must be scoped to HTTP(S) pages');
    }
  }
  return errors;
}
