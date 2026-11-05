// No dependencies. Credentials are provided only to this process by Actions Secrets.
import fs from 'node:fs/promises';

const extensionId = process.env.CHROME_EXTENSION_ID?.trim() || 'hogpkihhicjhiakkgjkbchpdoicmbolj';
const clientId = process.env.CHROME_CLIENT_ID?.trim();
const clientSecret = process.env.CHROME_CLIENT_SECRET?.trim();
const refreshToken = process.env.CHROME_REFRESH_TOKEN?.trim();
const tag = process.env.CHROME_RELEASE_TAG || process.env.RELEASE_TAG;

const summary = async (message) => {
  console.log(message);
  if (process.env.GITHUB_STEP_SUMMARY) {
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, message + '\n');
  }
};

// Check if secrets are configured
if (!clientId || !clientSecret || !refreshToken) {
  const missing = [];
  if (!clientId) missing.push('CHROME_CLIENT_ID');
  if (!clientSecret) missing.push('CHROME_CLIENT_SECRET');
  if (!refreshToken) missing.push('CHROME_REFRESH_TOKEN');

  const warning = `::warning::Missing Chrome Web Store credentials: ${missing.join(', ')}. Package upload skipped.`;
  console.log(warning);
  await summary(
    '### ⚠️ Chrome 商店自动发布跳过\n\n' +
    `检测到以下 GitHub Secrets 未配置：\`${missing.join(', ')}\`。\n\n` +
    '如需启用 Chrome 网上应用店自动上传与发布，请参考文档在 GitHub 仓库 Settings → Secrets and variables → Actions 中配置 Google OAuth 凭据。'
  );
  process.exit(0);
}

if (!/^[a-z0-9]{32}$/.test(extensionId)) {
  throw new Error('Invalid Chrome extension ID format: ' + extensionId);
}

if (!tag || !/^v\d+\.\d+\.\d+(?:\.\d+)?$/.test(tag)) {
  throw new Error('Invalid or missing Release tag: ' + tag);
}

async function getAccessToken() {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
    signal: AbortSignal.timeout(60000),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const desc = errorData.error_description || errorData.error || response.statusText;
    throw new Error(`Google OAuth2 token exchange failed (HTTP ${response.status}): ${desc}`);
  }

  const data = await response.json();
  if (!data.access_token) {
    throw new Error('Google OAuth2 response did not contain an access_token');
  }
  return data.access_token;
}

async function uploadPackage(accessToken, zipBuffer) {
  const uploadUrl = `https://www.googleapis.com/upload/chromewebstore/v1.1/items/${extensionId}`;
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-goog-api-version': '2',
      'Content-Type': 'application/zip',
    },
    body: zipBuffer,
    signal: AbortSignal.timeout(180000),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = result.error?.message || response.statusText;
    throw new Error(`Chrome Web Store upload failed (HTTP ${response.status}): ${message}`);
  }

  if (result.uploadState === 'FAILURE') {
    const details = result.itemError ? JSON.stringify(result.itemError) : 'Unknown upload error';
    throw new Error(`Chrome Web Store package validation failed: ${details}`);
  }

  return result;
}

async function publishItem(accessToken) {
  const publishUrl = `https://www.googleapis.com/chromewebstore/v1.1/items/${extensionId}/publish`;
  const response = await fetch(publishUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-goog-api-version': '2',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ target: 'default' }),
    signal: AbortSignal.timeout(60000),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = result.error?.message || response.statusText;
    throw new Error(`Chrome Web Store publish request failed (HTTP ${response.status}): ${message}`);
  }

  return result;
}

let packageUploaded = false;
try {
  const zipPath = `release-assets/tab-project-${tag}-extension.zip`;
  console.log(`Reading release package from ${zipPath}...`);
  const zipBuffer = await fs.readFile(zipPath);

  console.log('Exchanging refresh token for Google OAuth access token...');
  const accessToken = await getAccessToken();
  console.log('Access token acquired successfully.');

  console.log(`Uploading package to Chrome Web Store (Extension ID: ${extensionId})...`);
  const uploadResult = await uploadPackage(accessToken, zipBuffer);
  packageUploaded = true;
  await summary(`✅ Chrome 网上应用店：${tag} 扩展安装包上传成功 (UploadState: ${uploadResult.uploadState || 'SUCCESS'})。`);

  console.log('Submitting package for review / publication...');
  const publishResult = await publishItem(accessToken);
  const statusList = (publishResult.status || []).join(', ') || 'OK';
  await summary(`🚀 Chrome 网上应用店自动提审成功！状态: ${statusList}。请在 Chrome Web Store 开发者后台查看审核进度。`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Chrome Web Store publishing error: ${message}`);

  if (packageUploaded) {
    const warning = `::warning::Package for ${tag} was uploaded to Chrome Web Store, but submission encountered an issue: ${message}`;
    console.log(warning);
    await summary(
      '### ⚠️ Chrome 商店自动提审提示\n\n' +
      `**${tag} 安装包已成功上传到 Chrome 开发者信息中心（草稿状态）。**\n\n` +
      `提审阶段返回：\`${message}\`。\n\n` +
      '请登录 [Chrome Web Store 开发者信息中心](https://chrome.google.com/webstore/devconsole) 检查草稿并手动点击提交审核。'
    );
    process.exit(0);
  } else if (message.includes('ITEM_NOT_UPDATABLE')) {
    const warning = `::warning::Chrome Web Store item is currently in pending review. Submit ${tag} after the current review finishes.`;
    console.log(warning);
    await summary(
      '### ⚠️ Chrome 商店正在审核中\n\n' +
      `检测到前序版本当前正在 Chrome 官方审核队列中（状态: \`ITEM_NOT_UPDATABLE\`）。\n\n` +
      'Google 限制在同一时间只能有一个版本处于审核流程。请待当前审核通过后，或登录 [Chrome Web Store 开发者信息中心](https://chrome.google.com/webstore/devconsole) 取消前序审核后重新运行。'
    );
    process.exit(0);
  } else {
    await summary(
      '### ❌ Chrome 商店自动上传发布失败\n\n' +
      `错误详情: \`${message}\`\n\n` +
      '请检查 Google OAuth 凭据有效性及 Chrome 开发者后台权限配置。'
    );
    // Exit with 0 if continue-on-error behavior is desired, or let workflow handle it
    process.exit(1);
  }
}
