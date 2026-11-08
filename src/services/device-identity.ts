declare const chrome: any;

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
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    const res = await new Promise<any>((resolve) => {
      chrome.storage.local.get([DEVICE_STORAGE_KEY], (items: any) => resolve(items || {}));
    });
    if (res[DEVICE_STORAGE_KEY]?.deviceId && res[DEVICE_STORAGE_KEY]?.deviceName) {
      return res[DEVICE_STORAGE_KEY];
    }
  }

  if (typeof localStorage !== "undefined") {
    const raw = localStorage.getItem(DEVICE_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.deviceId && parsed.deviceName) return parsed;
      } catch {}
    }
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

  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    await new Promise<void>((resolve) => {
      chrome.storage.local.set({ [DEVICE_STORAGE_KEY]: safeInfo }, () => resolve());
    });
  }
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(DEVICE_STORAGE_KEY, JSON.stringify(safeInfo));
    } catch {}
  }
}
