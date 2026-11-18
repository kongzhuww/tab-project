export const NATIVE_HOST_NAME = 'com.tab_project.agent_bridge';

export type InstallerPlatform = 'macos-linux' | 'windows';

export function detectInstallerPlatform(userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''): InstallerPlatform {
  return /windows/i.test(userAgent) ? 'windows' : 'macos-linux';
}

export function validateExtensionId(extensionId: string): string {
  const clean = extensionId.trim().toLowerCase();
  if (!/^[a-p]{32}$/.test(clean)) {
    throw new Error('无效的浏览器扩展 ID，无法生成 Native Messaging 安装脚本。');
  }
  return clean;
}

function buildManifestJson(extensionId: string, hostPathPlaceholder: string): string {
  return JSON.stringify({
    name: NATIVE_HOST_NAME,
    description: 'tab-project local zero-port Native Messaging terminal bridge',
    path: hostPathPlaceholder,
    type: 'stdio',
    allowed_origins: [`chrome-extension://${extensionId}/`],
  }, null, 2);
}

/** Generate a self-contained POSIX sh installation script for macOS / Linux. */
export function buildMacLinuxInstaller(extensionId: string, hostSource: string): string {
  const id = validateExtensionId(extensionId);
  const marker = '__TAB_PROJECT_NATIVE_HOST_EOF__';
  if (hostSource.includes(marker)) throw new Error('Host source contains reserved heredoc marker.');
  const manifestTemplate = buildManifestJson(id, '__HOST_RUNNER_PATH__');

  return `#!/bin/sh
set -eu

HOST_NAME="${NATIVE_HOST_NAME}"
EXTENSION_ID="${id}"
INSTALL_DIR="\${HOME}/.tab-project-native-host"
HOST_SCRIPT="\${INSTALL_DIR}/tab-project-native-host.mjs"
RUNNER_SCRIPT="\${INSTALL_DIR}/run-host.sh"

OS_NAME="$(uname -s)"
if [ "\${OS_NAME}" = "Darwin" ]; then
  DIR_1="\${HOME}/Library/Application Support/Google/Chrome/NativeMessagingHosts"
  DIR_2="\${HOME}/Library/Application Support/Microsoft Edge/NativeMessagingHosts"
  DIR_3="\${HOME}/Library/Application Support/Chromium/NativeMessagingHosts"
  DIR_4="\${HOME}/Library/Application Support/BraveSoftware/Brave-Browser/NativeMessagingHosts"
  DIR_5="\${HOME}/Library/Application Support/Citro Labs/ego lite/NativeMessagingHosts"
else
  DIR_1="\${HOME}/.config/google-chrome/NativeMessagingHosts"
  DIR_2="\${HOME}/.config/microsoft-edge/NativeMessagingHosts"
  DIR_3="\${HOME}/.config/chromium/NativeMessagingHosts"
  DIR_4="\${HOME}/.config/BraveSoftware/Brave-Browser/NativeMessagingHosts"
  DIR_5="\${HOME}/.config/ego-lite/NativeMessagingHosts"
fi

if [ "\${1:-}" = "--uninstall" ]; then
  rm -f "\${DIR_1}/\${HOST_NAME}.json" "\${DIR_2}/\${HOST_NAME}.json" "\${DIR_3}/\${HOST_NAME}.json" "\${DIR_4}/\${HOST_NAME}.json" "\${DIR_5}/\${HOST_NAME}.json"
  rm -rf "\${INSTALL_DIR}"
  echo "已卸载 \${HOST_NAME}，未保留任何端口或后台守护进程。"
  exit 0
fi

find_node() {
  if command -v node >/dev/null 2>&1; then
    command -v node
    return 0
  fi
  for c in \
    "/opt/homebrew/bin/node" \
    "/usr/local/bin/node" \
    "\${HOME}/.volta/bin/node" \
    "\${HOME}/.fnm/aliases/default/bin/node"
  do
    if [ -x "$c" ]; then
      echo "$c"
      return 0
    fi
  done
  nvm_node=""
  for candidate in "\${HOME}/.nvm/versions/node"/*/bin/node; do
    if [ -x "$candidate" ]; then
      nvm_node="$candidate"
    fi
  done
  if [ -n "$nvm_node" ]; then
    echo "$nvm_node"
    return 0
  fi
  return 1
}

NODE_BIN="$(find_node || true)"
if [ -z "\${NODE_BIN}" ]; then
  echo "错误：未找到 Node.js，请先安装 Node.js >= 20 后重试。" >&2
  exit 1
fi

NODE_MAJOR="$("\${NODE_BIN}" -p "process.versions.node.split('.')[0]" 2>/dev/null || echo 0)"
if [ "\${NODE_MAJOR}" -lt 20 ]; then
  echo "错误：需要 Node.js >= 20（当前检测到 \${NODE_BIN}，主版本 \${NODE_MAJOR}）。" >&2
  exit 1
fi

mkdir -p "\${INSTALL_DIR}"
cat > "\${HOST_SCRIPT}" <<'${marker}'
${hostSource.trimEnd()}
${marker}
chmod 755 "\${HOST_SCRIPT}"

cat > "\${RUNNER_SCRIPT}" <<EOF
#!/bin/sh
exec "\${NODE_BIN}" "\${HOST_SCRIPT}"
EOF
chmod 755 "\${RUNNER_SCRIPT}"

"\${NODE_BIN}" --check "\${HOST_SCRIPT}"

INSTALLED_COUNT=0
write_manifest() {
  dir="$1"
  mkdir -p "\${dir}"
  cat > "\${dir}/\${HOST_NAME}.json" <<EOF
${manifestTemplate.replace('__HOST_RUNNER_PATH__', '${RUNNER_SCRIPT}')}
EOF
  INSTALLED_COUNT=$((INSTALLED_COUNT + 1))
}

for dir in "\${DIR_1}" "\${DIR_2}" "\${DIR_3}" "\${DIR_4}" "\${DIR_5}"; do
  parent="$(dirname "\${dir}")"
  if [ -d "\${parent}" ]; then
    write_manifest "\${dir}"
  fi
done

if [ "\${INSTALLED_COUNT}" -eq 0 ]; then
  write_manifest "\${DIR_1}"
  write_manifest "\${DIR_2}"
fi

echo "完成！已安装零端口 Native Messaging 桥接（扩展 ID: \${EXTENSION_ID}）"
echo "Node 路径: \${NODE_BIN}"
echo "现在回到浏览器标签页，几秒内会自动变为「已连接」（无需重启电脑）。"
`;
}

/** Generate a self-contained Windows PowerShell installation script for the Native Messaging host. */
export function buildWindowsInstaller(extensionId: string, hostSource: string): string {
  const id = validateExtensionId(extensionId);
  if (/^'@/m.test(hostSource)) throw new Error('Host source contains unsafe PowerShell terminator.');
  const manifestTemplate = buildManifestJson(id, '__HOST_RUNNER_PATH__');

  return `param(
  [switch]$Uninstall
)

$ErrorActionPreference = 'Stop'
$HostName = '${NATIVE_HOST_NAME}'
$ExtensionId = '${id}'
$InstallDir = Join-Path $env:LOCALAPPDATA 'tab-project-native-host'
$HostScript = Join-Path $InstallDir 'tab-project-native-host.mjs'
$RunnerCmd = Join-Path $InstallDir 'run-host.cmd'
$ManifestFile = Join-Path $InstallDir "$HostName.json"
$RegPaths = @(
  "HKCU:\\Software\\Google\\Chrome\\NativeMessagingHosts\\$HostName",
  "HKCU:\\Software\\Microsoft\\Edge\\NativeMessagingHosts\\$HostName",
  "HKCU:\\Software\\Chromium\\NativeMessagingHosts\\$HostName"
)

if ($Uninstall) {
  foreach ($reg in $RegPaths) {
    if (Test-Path $reg) { Remove-Item -Path $reg -Force }
  }
  if (Test-Path $InstallDir) { Remove-Item -Path $InstallDir -Recurse -Force }
  Write-Host "Uninstalled $HostName."
  exit 0
}

$NodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $NodeCmd) {
  Write-Error 'Node.js >= 20 is required but was not found in PATH.'
  exit 1
}
$NodeBin = $NodeCmd.Source
$NodeMajor = [int](& $NodeBin -p "process.versions.node.split('.')[0]")
if ($NodeMajor -lt 20) {
  Write-Error "Node.js >= 20 is required (found $NodeBin v$NodeMajor)."
  exit 1
}

New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null

$HostCode = @'
${hostSource.trimEnd()}
'@
Set-Content -Path $HostScript -Value $HostCode -Encoding UTF8

$CmdContent = "@echo off\`r\`n\`"$NodeBin\`" \`"%~dp0tab-project-native-host.mjs\`" %*\`r\`n"
Set-Content -Path $RunnerCmd -Value $CmdContent -Encoding ASCII

$ManifestJson = @'
${manifestTemplate}
'@
$EscapedRunner = $RunnerCmd.Replace('\\', '\\\\')
$ManifestJson = $ManifestJson.Replace('__HOST_RUNNER_PATH__', $EscapedRunner)
Set-Content -Path $ManifestFile -Value $ManifestJson -Encoding UTF8

foreach ($reg in $RegPaths) {
  $parent = Split-Path $reg -Parent
  if (-not (Test-Path $parent)) { New-Item -Path $parent -Force | Out-Null }
  New-Item -Path $reg -Force | Out-Null
  Set-ItemProperty -Path $reg -Name '(Default)' -Value $ManifestFile
}

Write-Host "Installed $HostName for extension $ExtensionId using $NodeBin."
Write-Host "Return to the browser tab; it will connect automatically."
`;
}

function encodeUtf16LeBase64(text: string): string {
  const bytes = new Uint8Array(text.length * 2);
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    bytes[i * 2] = code & 0xff;
    bytes[i * 2 + 1] = (code >> 8) & 0xff;
  }
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  if (typeof btoa === 'function') return btoa(binary);
  return Buffer.from(bytes).toString('base64');
}

/** Generate a double-clickable Windows .cmd installer wrapping the PowerShell setup script. */
export function buildWindowsCmdInstaller(extensionId: string, hostSource: string): string {
  const ps1 = buildWindowsInstaller(extensionId, hostSource);
  const encoded = encodeUtf16LeBase64(ps1);
  return `@echo off\r\nchcp 65001 >nul\r\npowershell -NoProfile -ExecutionPolicy Bypass -EncodedCommand ${encoded}\r\nif errorlevel 1 (\r\n  echo.\r\n  echo 安装未完成，请确认已安装 Node.js 20 或以上版本。\r\n  pause\r\n  exit /b 1\r\n)\r\necho.\r\necho 完成！现在可以直接回到浏览器查看连接状态。\r\npause\r\n`;
}
