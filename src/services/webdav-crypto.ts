const FORMAT = 'tab-project-webdav-encrypted';
const ITERATIONS = 600000;
const MAX_BYTES = 20 * 1024 * 1024;
const AAD = new TextEncoder().encode('tab-project-webdav-encrypted:v1');
export interface EncryptedBackup { kind: typeof FORMAT; version: 1; kdf: 'PBKDF2-SHA-256'; iterations: number; cipher: 'AES-256-GCM'; salt: string; iv: string; ciphertext: string }
function encode(bytes: Uint8Array): string {
  const parts: string[] = [];
  for (let i = 0; i < bytes.length; i += 8192) {
    const end = Math.min(i + 8192, bytes.length);
    let chunk = '';
    for (let j = i; j < end; j++) chunk += String.fromCharCode(bytes[j]);
    parts.push(chunk);
  }
  return btoa(parts.join(''));
}
function decode(value: unknown, limit: number): Uint8Array {
  // Avoid grouped base64 repetition `(?:[...]{4})*`, whose backtracking overflows V8's RegExp stack on multi-MB backups.
  if (
    typeof value !== 'string' ||
    value.length > Math.ceil(limit / 3) * 4 + 4 ||
    value.length % 4 !== 0 ||
    !/^[A-Za-z0-9+/]*={0,2}$/.test(value)
  ) {
    throw new Error('加密备份格式无效');
  }
  let binary: string;
  try { binary = atob(value); } catch { throw new Error('加密备份格式无效'); }
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
async function keyFor(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name:'PBKDF2', hash:'SHA-256', salt: salt as BufferSource, iterations:ITERATIONS }, material, { name:'AES-GCM', length:256 }, false, ['encrypt','decrypt']);
}
export function isEncryptedBackup(value: unknown): boolean { return Boolean(value && typeof value === 'object' && (value as { kind?: unknown }).kind === FORMAT); }
export async function encryptBackup(payload: unknown, password: string): Promise<EncryptedBackup> {
  if (!password || password.length < 8) throw new Error('请先设置至少 8 个字符的独立备份口令');
  const plain = new TextEncoder().encode(JSON.stringify(payload));
  if (plain.length > MAX_BYTES) throw new Error('备份超过 20 MB，未上传');
  const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await keyFor(password, salt);
  const encrypted = await crypto.subtle.encrypt({ name:'AES-GCM', iv, additionalData:AAD, tagLength:128 }, key, plain);
  return { kind:FORMAT, version:1, kdf:'PBKDF2-SHA-256', iterations:ITERATIONS, cipher:'AES-256-GCM', salt:encode(salt), iv:encode(iv), ciphertext:encode(new Uint8Array(encrypted)) };
}
export async function decryptBackup(value: unknown, password: string): Promise<unknown> {
  if (!password) throw new Error('请先在同步设置中输入备份口令');
  const item = value as Partial<EncryptedBackup> | null;
  if (!item || item.kind !== FORMAT || item.version !== 1 || item.kdf !== 'PBKDF2-SHA-256' || item.iterations !== ITERATIONS || item.cipher !== 'AES-256-GCM') throw new Error('加密备份版本或格式不受支持');
  const salt = decode(item.salt,16), iv = decode(item.iv,12), cipher = decode(item.ciphertext,MAX_BYTES + 16);
  if (salt.length !== 16 || iv.length !== 12 || cipher.length < 16) throw new Error('加密备份格式无效');
  try {
    const key = await keyFor(password,salt);
    const plain = await crypto.subtle.decrypt({ name:'AES-GCM', iv:iv as BufferSource, additionalData:AAD, tagLength:128 }, key, cipher as BufferSource);
    return JSON.parse(new TextDecoder('utf-8', { fatal:true }).decode(plain));
  } catch { throw new Error('备份口令错误或加密文件已损坏；未修改本地或云端数据'); }
}
