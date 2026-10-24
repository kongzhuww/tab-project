-- ============================================================
-- 海狸自习室 / 好友摸鱼空间 - Cloudflare D1 核心持久化表结构
-- ============================================================

-- 1. 房间表（自习室）
CREATE TABLE IF NOT EXISTS rooms (
  room_id TEXT PRIMARY KEY,
  room_name TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  owner_uid TEXT NOT NULL,
  settings_json TEXT DEFAULT '{}'
);

-- 2. 消息流表（永久保存文字与卡片，支持按房间索引）
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  sender_uid TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  sender_avatar TEXT,
  msg_type TEXT NOT NULL,
  content TEXT NOT NULL,
  meta_json TEXT,
  timestamp INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_msg_room_time ON messages(room_id, timestamp DESC);

-- 3. 独立图片索引表（专门用于监控存储水位、自动淘汰过期或过量图片）
CREATE TABLE IF NOT EXISTS image_assets (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  msg_id TEXT NOT NULL,
  byte_size INTEGER NOT NULL,
  image_data TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_image_created ON image_assets(created_at ASC);

-- 4. 好友 / 房间成员持久化表
CREATE TABLE IF NOT EXISTS room_members (
  room_id TEXT NOT NULL,
  uid TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  role TEXT DEFAULT 'member', -- owner, member
  joined_at INTEGER NOT NULL,
  PRIMARY KEY (room_id, uid)
);

-- 5. 好友申请与双向关系持久化表
CREATE TABLE IF NOT EXISTS friend_requests (
  id TEXT PRIMARY KEY,
  from_uid TEXT NOT NULL,
  from_name TEXT NOT NULL,
  from_avatar TEXT,
  to_uid TEXT NOT NULL,
  note TEXT,
  status TEXT DEFAULT 'pending', -- pending, accepted, rejected
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_freq_to ON friend_requests(to_uid, status);
