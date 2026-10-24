"""Private link/card chat. Python 3.12+, stdlib only. Bind loopback behind HTTPS."""
import hashlib
from image_policy import MAX_IMAGE_MESSAGE_BYTES, validate_image_meta
from protocol_contract import PROTOCOL, MESSAGE_TYPES, MAX_MESSAGE_BYTES, MAX_TEXT_CHARS, IMAGE_MESSAGES_SUPPORTED, capabilities
import hmac
import json
import os
import re
import secrets
import sqlite3
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse, parse_qs

# Keep the database, WAL and newly created side files private on POSIX hosts.
os.umask(0o077)
DATA = Path(os.environ.get("CHAT_DATA", "./data")).resolve()
DATA.mkdir(mode=0o700, parents=True, exist_ok=True)
os.chmod(DATA, 0o700)
OWNER_TOKEN = os.environ.get("CHAT_OWNER_TOKEN", "")
OWNER_UID = os.environ.get("CHAT_OWNER_UID", "")
if not re.fullmatch(r"[A-Za-z0-9_-]{43}", OWNER_TOKEN) or not re.fullmatch(r"[A-Za-z0-9_-]{1,160}", OWNER_UID):
    raise RuntimeError("Configure CHAT_OWNER_TOKEN and CHAT_OWNER_UID before starting")
LIMIT = MAX_MESSAGE_BYTES
MAX_DB = int(os.environ.get("CHAT_MAX_DB_BYTES", str(1024 * 1024 * 1024)))
LOCK = threading.RLock()
DB = sqlite3.connect(DATA / "chat.sqlite3", check_same_thread=False)
os.chmod(DATA / "chat.sqlite3", 0o600)
DB.execute("PRAGMA journal_mode=WAL")
DB.execute("PRAGMA synchronous=FULL")
DB.executescript("""
CREATE TABLE IF NOT EXISTS members(id TEXT PRIMARY KEY, digest TEXT UNIQUE, uid TEXT, name TEXT, room TEXT, expires INTEGER, revoked INTEGER DEFAULT 0, avatar TEXT DEFAULT '🦫');
CREATE TABLE IF NOT EXISTS messages(seq INTEGER PRIMARY KEY AUTOINCREMENT, room TEXT NOT NULL, uid TEXT NOT NULL, id TEXT NOT NULL, body TEXT NOT NULL, UNIQUE(room,id));
CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY, value TEXT);
CREATE INDEX IF NOT EXISTS room_seq ON messages(room,seq);
CREATE TABLE IF NOT EXISTS rooms(parent TEXT, id TEXT, name TEXT, icon TEXT, description TEXT DEFAULT '', archived INTEGER DEFAULT 0, space TEXT DEFAULT 'hub_main', PRIMARY KEY(parent,id));
CREATE TABLE IF NOT EXISTS spaces(parent TEXT, id TEXT, name TEXT, icon TEXT, archived INTEGER DEFAULT 0, PRIMARY KEY(parent,id));
CREATE TABLE IF NOT EXISTS friend_requests(id TEXT PRIMARY KEY, parent TEXT NOT NULL, from_uid TEXT NOT NULL, to_uid TEXT NOT NULL, from_name TEXT NOT NULL, from_avatar TEXT NOT NULL, status TEXT NOT NULL, timestamp INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS friendships(parent TEXT NOT NULL, uid1 TEXT NOT NULL, uid2 TEXT NOT NULL, timestamp INTEGER NOT NULL, PRIMARY KEY(parent, uid1, uid2));
CREATE INDEX IF NOT EXISTS fr_uids ON friend_requests(parent, from_uid, to_uid);
CREATE INDEX IF NOT EXISTS fs_uids ON friendships(parent, uid1, uid2);
""")
try:
    DB.execute("ALTER TABLE members ADD COLUMN avatar TEXT DEFAULT '🦫'")
except sqlite3.OperationalError:
    pass
if 'space' not in {r[1] for r in DB.execute('PRAGMA table_info(rooms)')}:
    DB.execute("ALTER TABLE rooms ADD COLUMN space TEXT DEFAULT 'hub_main'")
DB.commit()
WINDOWS = {}
PRESENCE = {}
# Condition.wait releases the SAME RLock used by all database handlers, including
# recursive acquisitions, then reacquires it before any further SQLite access.
SYNC_COND = threading.Condition(LOCK)

def notify_sync():
    with SYNC_COND:
        SYNC_COND.notify_all()

def digest(value):
    return hashlib.sha256(value.encode()).hexdigest()

def valid_id(value, limit=160):
    return isinstance(value, str) and re.fullmatch(r"[A-Za-z0-9_-]{1," + str(limit) + "}", value)

def safe_str(val):
    if not isinstance(val, str):
        return ""
    try:
        return val.encode("iso-8859-1").decode("utf-8")
    except (UnicodeDecodeError, UnicodeEncodeError):
        return val

def room_catalog(parent):
    return [{"id": r[0], "name": r[1], "icon": r[2], "description": r[3], "space": r[4]} for r in DB.execute("SELECT id,name,icon,description,space FROM rooms WHERE parent=? AND archived=0 ORDER BY rowid", (parent,))]

def space_catalog(parent):
    return [{"id": r[0], "name": r[1], "icon": r[2]} for r in DB.execute("SELECT id,name,icon FROM spaces WHERE parent=? AND archived=0 ORDER BY rowid", (parent,))]

def ensure_spaces(parent):
    # One-time additive restoration of the original sidebar presets. Never replace user rooms.
    if DB.execute("SELECT 1 FROM spaces WHERE parent=?", (parent,)).fetchone():
        return
    DB.execute("INSERT INTO spaces(parent,id,name,icon) VALUES(?,'hub_main','公共自习室','🏠')", (parent,))
    DB.execute("INSERT INTO spaces(parent,id,name,icon) VALUES(?,'hub_gaming','宿舍开黑组','🎮')", (parent,))
    presets = [('music','音乐分享','🎵','hub_main'), ('bili','B站放映厅','📺','hub_main'), ('dev','开源与代码','🐙','hub_main'), ('game_general','开黑集合','💬','hub_gaming'), ('game_music','战歌分享','🎵','hub_gaming'), ('game_meme','搞笑动态','⚡','hub_gaming')]
    count = DB.execute("SELECT count(*) FROM rooms WHERE parent=? AND archived=0", (parent,)).fetchone()[0]
    for rid, name, icon, space in presets:
        if count >= 32:
            break
        inserted = DB.execute("INSERT OR IGNORE INTO rooms(parent,id,name,icon,space) VALUES(?,?,?,?,?)", (parent, 'preset_'+rid, name, icon, space))
        count += inserted.rowcount

class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    def log_message(self, *_args):
        pass  # Never log credentials, request paths, or user content.

    def setup(self):
        super().setup()
        self.connection.settimeout(30)

    def reply(self, status, data):
        raw = json.dumps(data, ensure_ascii=False, separators=(",", ":")).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Connection", "close")
        self.end_headers()
        self.wfile.write(raw)
        self.close_connection = True

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type")
        self.send_header("Content-Length", "0")
        self.end_headers()

    def read_json(self, limit=LIMIT):
        size = int(self.headers.get("Content-Length", "0"))
        if not 0 < size <= limit or self.headers.get("Transfer-Encoding"):
            raise ValueError("size")
        data = json.loads(self.rfile.read(size))
        if not isinstance(data, dict):
            raise ValueError("shape")
        return data

    def auth(self, room):
        credential = self.headers.get("Authorization", "").removeprefix("Bearer ")
        if not re.fullmatch(r"[A-Za-z0-9_-]{43}", credential):
            return None
        if hmac.compare_digest(credential, OWNER_TOKEN):
            row = DB.execute("SELECT value FROM meta WHERE key='owner_name'").fetchone()
            name = row[0] if row else "群主"
            return {"id": "owner", "uid": OWNER_UID, "name": name, "role": "owner"}
        row = DB.execute("SELECT id,uid,name,room,expires,revoked,COALESCE(avatar,'🦫') FROM members WHERE digest=?", (digest(credential),)).fetchone()
        if not row or row[3] != room or row[5] or row[4] <= int(time.time()):
            return None
        return {"id": row[0], "uid": row[1], "name": row[2], "role": "member", "avatar": row[6]}

    def limited(self, key):
        now = time.monotonic()
        start, count = WINDOWS.get(key, (now, 0))
        if now - start >= 60:
            start, count = now, 0
        WINDOWS[key] = (start, count + 1)
        if len(WINDOWS) > 512:
            for k, (t, _) in list(WINDOWS.items()):
                if now - t > 60:
                    WINDOWS.pop(k, None)
        return count >= 180

    def handle_api(self, method):
        try:
            parsed = urlparse(self.path)
            query = parse_qs(parsed.query)
            room = query.get("room", ["main"])[0]
            if not valid_id(room):
                self.reply(400, {"error": "invalid_room"}); return
            if parsed.path == "/health" and method == "GET":
                self.reply(200, {"service": "beaver-private-chat", "protocol": PROTOCOL, "imageMessages": IMAGE_MESSAGES_SUPPORTED, "capabilities": capabilities()}); return
            # Body read outside database lock, bounded size and socket timeout.
            body = self.read_json(MAX_IMAGE_MESSAGE_BYTES if parsed.path == "/api/v1/messages" else LIMIT) if method == "POST" else None
            if method == "POST" and parsed.path == "/api/v1/messages" and int(self.headers.get("Content-Length", "0")) > LIMIT:
                if not isinstance(body.get("message"), dict) or body["message"].get("type") != "image":
                    self.reply(413, {"error": "message_limit"}); return
            with LOCK:
                actor = self.auth(room)
                if not actor:
                    self.reply(401, {"error": "unauthorized"}); return
                if self.limited(actor["id"]):
                    self.reply(429, {"error": "rate_limit"}); return
                # Enforce management permissions on the server, before any writes.
                management_write = method in ("POST", "DELETE") and any(
                    parsed.path == root or parsed.path.startswith(root + "/")
                    for root in ("/api/v1/members", "/api/v1/spaces", "/api/v1/rooms")
                )
                if management_write and actor["role"] != "owner":
                    self.reply(403, {"error": "owner_required"}); return
                # Invitations authorize the parent room only. Children inherit that exact membership.
                with DB:
                    DB.execute("INSERT OR IGNORE INTO rooms(parent,id,name,icon) VALUES(?,'main','综合讨论','💬')", (room,))
                    ensure_spaces(room)
                channel = query.get("channel", ["main"])[0]
                if not valid_id(channel):
                    raise ValueError("channel")
                if parsed.path == "/api/v1/spaces" or parsed.path.startswith("/api/v1/spaces/"):
                    if method == "GET" and parsed.path == "/api/v1/spaces":
                        self.reply(200, {"spaces": space_catalog(room), "rooms": room_catalog(room)}); return
                    sid = parsed.path.rsplit("/", 1)[-1]
                    if method == "POST":
                        name, icon = body.get("name"), body.get("icon", "👥")
                        if not isinstance(name, str) or not 1 <= len(name.strip()) <= 80 or not isinstance(icon, str) or not 1 <= len(icon) <= 8:
                            raise ValueError("space_fields")
                        if parsed.path == "/api/v1/spaces":
                            if DB.execute("SELECT count(*) FROM spaces WHERE parent=? AND archived=0", (room,)).fetchone()[0] >= 16 or DB.execute("SELECT count(*) FROM rooms WHERE parent=? AND archived=0", (room,)).fetchone()[0] >= 32:
                                self.reply(409, {"error": "capacity"}); return
                            sid = 's_' + secrets.token_hex(16)
                            with DB:
                                DB.execute("INSERT INTO spaces(parent,id,name,icon) VALUES(?,?,?,?)", (room,sid,name.strip(),icon))
                                DB.execute("INSERT INTO rooms(parent,id,name,icon,space) VALUES(?,?,?,'💬',?)", (room,'r_'+secrets.token_hex(16),'综合讨论',sid))
                        else:
                            with DB:
                                updated = DB.execute("UPDATE spaces SET name=?,icon=? WHERE parent=? AND id=? AND archived=0", (name.strip(),icon,room,sid))
                            if not updated.rowcount:
                                self.reply(404, {"error": "space_not_found"}); return
                        notify_sync()
                        self.reply(200, {"id": sid}); return
                    if method == "DELETE" and valid_id(sid) and sid != 'hub_main':
                        with DB:
                            updated = DB.execute("UPDATE spaces SET archived=1 WHERE parent=? AND id=? AND archived=0", (room,sid))
                            DB.execute("UPDATE rooms SET archived=1 WHERE parent=? AND space=?", (room,sid))
                        notify_sync()
                        self.reply(200 if updated.rowcount else 404, {"archived": bool(updated.rowcount)}); return
                    self.reply(400, {"error": "invalid_space_operation"}); return
                if parsed.path == "/api/v1/rooms" and method == "GET":
                    self.reply(200, {"rooms": room_catalog(room), "spaces": space_catalog(room)}); return
                if parsed.path == "/api/v1/rooms" or parsed.path.startswith("/api/v1/rooms/"):
                    rid = parsed.path.rsplit("/", 1)[-1]
                    if method == "POST":
                        name, icon, description = body.get("name"), body.get("icon", "💬"), body.get("description", "")
                        if not isinstance(name, str) or not 1 <= len(name.strip()) <= 80 or not isinstance(icon, str) or not 1 <= len(icon) <= 8 or not isinstance(description, str) or len(description) > 500:
                            raise ValueError("room_fields")
                        space = body.get('space', 'hub_main')
                        if not valid_id(space) or not DB.execute("SELECT 1 FROM spaces WHERE parent=? AND id=? AND archived=0", (room,space)).fetchone():
                            raise ValueError('space')
                        if parsed.path == "/api/v1/rooms":
                            if DB.execute("SELECT count(*) FROM rooms WHERE parent=? AND archived=0", (room,)).fetchone()[0] >= 32:
                                self.reply(409, {"error": "room_capacity"}); return
                            rid = "r_" + secrets.token_hex(16)
                            with DB:
                                DB.execute("INSERT INTO rooms(parent,id,name,icon,description,space) VALUES(?,?,?,?,?,?)", (room, rid, name.strip(), icon, description, space))
                        else:
                            with DB:
                                updated = DB.execute("UPDATE rooms SET name=?,icon=?,description=? WHERE parent=? AND id=? AND archived=0", (name.strip(), icon, description, room, rid))
                            if not updated.rowcount:
                                self.reply(404, {"error": "room_not_found"}); return
                        notify_sync()
                        self.reply(200, {"id": rid}); return
                    if method == "DELETE" and valid_id(rid) and rid != "main":
                        with DB:
                            updated = DB.execute("UPDATE rooms SET archived=1 WHERE parent=? AND id=? AND archived=0", (room, rid))
                        notify_sync()
                        self.reply(200 if updated.rowcount else 404, {"archived": bool(updated.rowcount)}); return
                    self.reply(400, {"error": "invalid_room_operation"}); return
                if channel.startswith("dm_"):
                    parts = channel[3:].split("__")
                    if len(parts) != 2 or actor["uid"] not in parts:
                        self.reply(403, {"error": "dm_forbidden"}); return
                else:
                    selected = DB.execute("SELECT 1 FROM rooms WHERE parent=? AND id=? AND archived=0", (room, channel)).fetchone()
                    if not selected:
                        self.reply(404, {"error": "room_not_found"}); return
                # Preserve existing parent history; child keys cannot collide with valid parent IDs.
                message_room = room if channel == "main" else json.dumps([room, channel], separators=(",", ":"))
                if parsed.path == "/api/v1/friends/request" and method == "POST":
                    to_uid = body.get("toUid")
                    if not valid_id(to_uid) or to_uid == actor["uid"]:
                        self.reply(400, {"error": "invalid_target"}); return
                    target_ok = (to_uid == OWNER_UID) or DB.execute("SELECT 1 FROM members WHERE room=? AND uid=? AND revoked=0", (room, to_uid)).fetchone()
                    if not target_ok:
                        self.reply(404, {"error": "target_not_found"}); return
                    req_id = "fr_" + secrets.token_hex(16)
                    with DB:
                        old = DB.execute("SELECT id FROM friend_requests WHERE parent=? AND from_uid=? AND to_uid=? AND status='pending'", (room, actor["uid"], to_uid)).fetchone()
                        if old:
                            req_id = old[0]
                        else:
                            DB.execute("INSERT INTO friend_requests(id, parent, from_uid, to_uid, from_name, from_avatar, status, timestamp) VALUES(?,?,?,?,?,?,?,?)",
                                (req_id, room, actor["uid"], to_uid, actor["name"], actor.get("avatar", "🦫"), "pending", int(time.time() * 1000)))
                    notify_sync()
                    self.reply(200, {"id": req_id, "status": "pending"}); return
                if parsed.path == "/api/v1/friends/respond" and method == "POST":
                    req_id = body.get("id")
                    accept = bool(body.get("accept"))
                    if not valid_id(req_id):
                        self.reply(400, {"error": "invalid_request_id"}); return
                    row = DB.execute("SELECT from_uid, to_uid FROM friend_requests WHERE id=? AND parent=? AND to_uid=? AND status='pending'", (req_id, room, actor["uid"])).fetchone()
                    if not row:
                        self.reply(404, {"error": "request_not_found"}); return
                    from_uid, to_uid = row[0], row[1]
                    status = "accepted" if accept else "rejected"
                    with DB:
                        DB.execute("UPDATE friend_requests SET status=? WHERE id=?", (status, req_id))
                        if accept:
                            u1, u2 = sorted([from_uid, to_uid])
                            DB.execute("INSERT OR REPLACE INTO friendships(parent, uid1, uid2, timestamp) VALUES(?,?,?,?)", (room, u1, u2, int(time.time() * 1000)))
                    notify_sync()
                    self.reply(200, {"status": status}); return
                if parsed.path == "/api/v1/sync" and method == "GET":
                    req_avatar = query.get("avatar", [""])[0]
                    raw_name = query.get("name", [""])[0]
                    req_name = safe_str(raw_name).strip()
                    raw_act_type = query.get("act_type", [""])[0]
                    raw_act_title = query.get("act_title", [""])[0]
                    raw_act_url = query.get("act_url", [""])[0]
                    if raw_act_type and raw_act_title:
                        act = {"type": safe_str(raw_act_type)[:32], "title": safe_str(raw_act_title)[:200], "url": safe_str(raw_act_url)[:500], "updatedAt": int(time.time() * 1000)}
                        PRESENCE[actor["uid"]] = {"last_seen": time.time(), "activity": act}
                    else:
                        PRESENCE.setdefault(actor["uid"], {})["last_seen"] = time.time()
                    if req_avatar and (req_avatar.startswith("https://") or req_avatar.startswith("http://") or len(req_avatar) <= 8) and len(req_avatar) <= 1000:
                        if actor["role"] == "owner":
                            DB.execute("INSERT INTO meta(key,value) VALUES('owner_avatar',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value", (req_avatar,))
                        else:
                            DB.execute("UPDATE members SET avatar=? WHERE id=?", (req_avatar, actor["id"]))
                    if req_name and 1 <= len(req_name) <= 100:
                        if actor["role"] == "owner":
                            DB.execute("INSERT INTO meta(key,value) VALUES('owner_name',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value", (req_name,))
                        else:
                            DB.execute("UPDATE members SET name=? WHERE id=?", (req_name, actor["id"]))
                    DB.commit()

                    wait_seconds = 0
                    try:
                        wait_seconds = min(max(int(query.get("wait", ["0"])[0]), 0), 12)
                    except (ValueError, TypeError):
                        wait_seconds = 0

                    after = int(query.get("after", ["0"])[0])
                    if after < 0:
                        raise ValueError("cursor")
                    rows = DB.execute("SELECT seq,body FROM messages WHERE room=? AND seq>? ORDER BY seq LIMIT 50", (message_room, after)).fetchall()
                    if not rows and wait_seconds > 0:
                        with SYNC_COND:
                            SYNC_COND.wait(timeout=wait_seconds)
                        # A revocation, expiry or room archive can happen while the
                        # condition has released LOCK. Never return a stale grant.
                        actor = self.auth(room)
                        if not actor:
                            self.reply(401, {"error": "unauthorized"}); return
                        if not channel.startswith("dm_") and not DB.execute(
                            "SELECT 1 FROM rooms WHERE parent=? AND id=? AND archived=0", (room, channel)
                        ).fetchone():
                            self.reply(404, {"error": "room_not_found"}); return
                        rows = DB.execute("SELECT seq,body FROM messages WHERE room=? AND seq>? ORDER BY seq LIMIT 50", (message_room, after)).fetchall()
                    messages, size = [], 0
                    for seq, raw in rows:
                        if messages and size + len(raw.encode()) > 1024 * 1024:
                            break
                        messages.append({"seq": seq, "message": json.loads(raw)})
                        size += len(raw.encode())

                    owner_av_row = DB.execute("SELECT value FROM meta WHERE key='owner_avatar'").fetchone()
                    owner_nm_row = DB.execute("SELECT value FROM meta WHERE key='owner_name'").fetchone()
                    owner_avatar = owner_av_row[0] if owner_av_row else "🦫"
                    owner_name = owner_nm_row[0] if owner_nm_row else "群主"
                    now = time.time()
                    owner_p = PRESENCE.get(OWNER_UID, {})
                    owner_online = now - owner_p.get("last_seen", 0) <= 45
                    roster = [{"uid": OWNER_UID, "name": owner_name, "role": "owner", "avatar": owner_avatar, "activity": owner_p.get("activity"), "online": owner_online, "lastSeen": int(owner_p.get("last_seen", 0) * 1000)}]
                    for uid, name, m_avatar in DB.execute("SELECT uid,name,COALESCE(avatar,'🦫') FROM members WHERE room=? AND revoked=0 AND expires>?", (room, int(time.time()))):
                        p = PRESENCE.get(uid, {})
                        m_online = now - p.get("last_seen", 0) <= 45
                        roster.append({"uid": uid, "name": name, "role": "member", "avatar": m_avatar, "activity": p.get("activity"), "online": m_online, "lastSeen": int(p.get("last_seen", 0) * 1000)})
                    req_rows = DB.execute("SELECT id, from_uid, to_uid, from_name, from_avatar, status, timestamp FROM friend_requests WHERE parent=? AND (to_uid=? OR from_uid=?) ORDER BY timestamp DESC LIMIT 30", (room, actor["uid"], actor["uid"])).fetchall()
                    friend_requests = [{"id": r[0], "from": {"uid": r[1], "name": r[3], "avatar": r[4]}, "toUid": r[2], "status": r[5], "createdAt": r[6]} for r in req_rows]
                    friend_rows = DB.execute("SELECT uid1, uid2 FROM friendships WHERE parent=? AND (uid1=? OR uid2=?)", (room, actor["uid"], actor["uid"])).fetchall()
                    friends = [r[1] if r[0] == actor["uid"] else r[0] for r in friend_rows]
                    ident = {"id": actor["id"], "uid": actor["uid"], "name": owner_name if actor["role"] == "owner" else actor["name"], "role": actor["role"], "avatar": owner_avatar if actor["role"] == "owner" else actor.get("avatar", "🦫")}
                    rooms = room_catalog(room)
                    self.reply(200, {"capabilities": capabilities(), "identity": ident, "members": roster, "spaces": space_catalog(room), "rooms": rooms, "friendRequests": friend_requests, "friends": friends, "messages": messages, "hasMore": len(rows) == 50 or len(messages) < len(rows)})
                    return
                if parsed.path == "/api/v1/messages" and method == "POST":
                    m = body.get("message")
                    if not isinstance(m, dict) or not valid_id(m.get("id")) or m.get("type") not in MESSAGE_TYPES:
                        self.reply(400, {"error": "invalid_message"}); return
                    if int(self.headers.get("Content-Length", "0")) > (MAX_IMAGE_MESSAGE_BYTES if m["type"] == "image" else LIMIT):
                        self.reply(413, {"error": "message_limit"}); return
                    if not isinstance(m.get("content"), str) or len(m["content"]) > MAX_TEXT_CHARS or not isinstance(m.get("sender"), dict) or m["sender"].get("uid") != actor["uid"]:
                        self.reply(400, {"error": "invalid_sender_or_content"}); return
                    image_meta = validate_image_meta(m.get("meta")) if m["type"] == "image" else None
                    # Retries cannot overwrite or double-insert an accepted message.
                    old = DB.execute("SELECT seq,uid FROM messages WHERE room=? AND id=?", (message_room, m["id"])).fetchone()
                    if old:
                        if old[1] != actor["uid"]:
                            self.reply(409, {"error": "message_id_conflict"}); return
                        self.reply(200, {"id": m["id"], "seq": old[0], "stored": True}); return
                    if sum(p.stat().st_size for p in DATA.glob("chat.sqlite3*")) >= MAX_DB:
                        self.reply(507, {"error": "storage_limit"}); return
                    name = m["sender"].get("name", actor["name"])
                    if isinstance(name, str):
                        name = safe_str(name)[:100]
                    else:
                        name = actor["name"]
                    avatar = m["sender"].get("avatar")
                    if not isinstance(avatar, str) or len(avatar) > 1000 or not (avatar.startswith("https://") or avatar.startswith("http://") or len(avatar) <= 8):
                        avatar = "🦫"
                    if actor["role"] == "owner":
                        DB.execute("INSERT INTO meta(key,value) VALUES('owner_avatar',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value", (avatar,))
                        DB.execute("INSERT INTO meta(key,value) VALUES('owner_name',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value", (name,))
                    else:
                        DB.execute("UPDATE members SET avatar=?, name=? WHERE id=?", (avatar, name, actor["id"]))
                    stored = {"id": m["id"], "sender": {"uid": actor["uid"], "name": name, "avatar": avatar}, "type": m["type"], "content": m["content"], "timestamp": int(time.time() * 1000), "meta": image_meta if image_meta is not None else m.get("meta", {})}
                    raw = json.dumps(stored, ensure_ascii=False, separators=(",", ":"))
                    if len(raw.encode()) > (MAX_IMAGE_MESSAGE_BYTES if m["type"] == "image" else LIMIT):
                        self.reply(413, {"error": "message_limit"}); return
                    with DB:
                        cursor = DB.execute("INSERT INTO messages(room,uid,id,body) VALUES(?,?,?,?)", (message_room, actor["uid"], m["id"], raw))
                    notify_sync()
                    self.reply(201, {"id": m["id"], "seq": cursor.lastrowid, "stored": True}); return
                if parsed.path.startswith("/api/v1/members"):
                    if method == "GET" and parsed.path == "/api/v1/members":
                        if actor["role"] != "owner":
                            self.reply(403, {"error": "owner_required"}); return
                        members = [{"id": r[0], "uid": r[1], "name": r[2], "expiresAt": r[3] * 1000, "revoked": bool(r[4])} for r in DB.execute("SELECT id,uid,name,expires,revoked FROM members WHERE room=?", (room,))]
                        self.reply(200, {"members": members}); return
                    if method == "POST" and parsed.path == "/api/v1/members":
                        uid, name = body.get("uid"), body.get("name")
                        if not valid_id(uid) or uid == OWNER_UID or not isinstance(name, str) or not 1 <= len(name.strip()) <= 80:
                            self.reply(400, {"error": "invalid_member"}); return
                        if DB.execute("SELECT count(*) FROM members WHERE revoked=0 AND expires>? AND NOT (room=? AND uid=?)", (int(time.time()), room, uid)).fetchone()[0] >= 64:
                            self.reply(409, {"error": "capacity"}); return
                        credential = secrets.token_urlsafe(32)
                        mid = secrets.token_hex(16)
                        # Reissue atomically: a failed insert must not strand the
                        # member with a revoked old credential and no replacement.
                        with DB:
                            DB.execute("UPDATE members SET revoked=1 WHERE room=? AND uid=?", (room, uid))
                            DB.execute("INSERT INTO members(id,digest,uid,name,room,expires) VALUES(?,?,?,?,?,?)", (mid, digest(credential), uid, name.strip(), room, int(time.time()) + 30 * 86400))
                        notify_sync()
                        self.reply(201, {"id": mid, "token": credential}); return
                    if method == "DELETE":
                        if actor["role"] != "owner":
                            self.reply(403, {"error": "owner_required"}); return
                        mid = parsed.path.rsplit("/", 1)[-1]
                        if not re.fullmatch(r"[a-f0-9]{32}", mid):
                            raise ValueError("member")
                        with DB:
                            DB.execute("UPDATE members SET revoked=1 WHERE id=? AND room=?", (mid, room))
                        notify_sync()
                        self.reply(200, {"ok": True}); return
                self.reply(404, {"error": "not_found"})
        except (ValueError, TypeError, KeyError, json.JSONDecodeError):
            self.reply(400, {"error": "invalid_request"})
        except (sqlite3.Error, OSError):
            try: self.reply(503, {"error": "storage_or_io_error"})
            except OSError: pass

    def do_GET(self): self.handle_api("GET")
    def do_POST(self): self.handle_api("POST")
    def do_DELETE(self): self.handle_api("DELETE")

class Server(ThreadingHTTPServer):
    daemon_threads = True
    request_queue_size = 64
    slots = threading.BoundedSemaphore(64)
    def process_request(self, request, client_address):
        if not self.slots.acquire(blocking=False):
            request.close(); return
        try: super().process_request(request, client_address)
        except Exception:
            self.slots.release(); raise
    def process_request_thread(self, request, client_address):
        try: super().process_request_thread(request, client_address)
        finally: self.slots.release()

if __name__ == "__main__":
    Server(("127.0.0.1", int(os.environ.get("CHAT_PORT", "8788"))), Handler).serve_forever()
