import {
  hasExtensionLocalStorage,
  readExtensionStorage,
  readLocalMirrorJson,
  writeExtensionStorage,
  writeLocalMirrorJson
} from "../core/storage-repo";

export interface DeviceInfo {
  deviceId: string;
  deviceName: string;
  os: "macOS" | "Windows" | "Linux" | "Unknown";
}

const DEVICE_STORAGE_KEY = "lw_device_identity_v1";

function detectOS(): "macOS" | "Windows" | "Linux" | "Unknown" {
  if (typeof navigator === "undefined") return "Unknown";
  const ua = navigator.userAgent;
  if (/Macintosh|Mac OS X/i.test(ua)) return "macOS";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Linux/i.test(ua)) return "Linux";
  return "Unknown";
}

function generateDefaultName(os: string): string {
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  if (os === "macOS") return `MacBook · ${rand}`;
  if (os === "Windows") return `Windows PC · ${rand}`;
  if (os === "Linux") return `Linux · ${rand}`;
  return `Device · ${rand}`;
}

export async function getLocalDeviceInfo(): Promise<DeviceInfo> {
  const os = detectOS();
  if (hasExtensionLocalStorage()) {
    try {
      const res = await readExtensionStorage([DEVICE_STORAGE_KEY]);
      const stored = res[DEVICE_STORAGE_KEY] as DeviceInfo | undefined;
      if (stored?.deviceId && stored?.deviceName) return stored;
    } catch {}
  }

  const mirrored = readLocalMirrorJson<DeviceInfo>(DEVICE_STORAGE_KEY);
  if (mirrored && typeof mirrored === "object" && mirrored.deviceId && mirrored.deviceName) {
    return mirrored;
  }

  const newDevice: DeviceInfo = {
    deviceId: `dev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    deviceName: generateDefaultName(os),
    os
  };

  await saveLocalDeviceInfo(newDevice);
  return newDevice;
}

export async function saveLocalDeviceInfo(info: DeviceInfo): Promise<void> {
  const safeInfo: DeviceInfo = {
    deviceId: info.deviceId || `dev_${Date.now()}`,
    deviceName: (info.deviceName || "").trim() || "我的设备",
    os: info.os || detectOS()
  };

  if (hasExtensionLocalStorage()) {
    try { await writeExtensionStorage({ [DEVICE_STORAGE_KEY]: safeInfo }); } catch {}
  }
  writeLocalMirrorJson(DEVICE_STORAGE_KEY, safeInfo);
}
