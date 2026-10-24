"""Create local owner credentials without printing secrets. Run manually on the server."""
import argparse
import json
import os
import re
import secrets
from pathlib import Path
from urllib.parse import urlparse, quote
import base64

p = argparse.ArgumentParser()
p.add_argument("--origin", required=True)
p.add_argument("--uid", required=True)
p.add_argument("--output-dir", required=True)
a = p.parse_args()
u = urlparse(a.origin)
if u.scheme not in ("http", "https") or not u.hostname or u.username or u.password or u.params or u.query or u.fragment or u.path not in ("", "/"):
    raise SystemExit("Use an HTTPS origin without credentials, path, query or fragment")
try:
    u.port  # Reject malformed ports before creating any credential files.
except ValueError:
    raise SystemExit("Invalid origin port") from None
if u.scheme == "http" and u.hostname not in ("localhost", "127.0.0.1", "::1"):
    raise SystemExit("Public origins require HTTPS; HTTP is allowed only on localhost, 127.0.0.1 or ::1")
if not re.fullmatch(r"[A-Za-z0-9_-]{1,160}", a.uid):
    raise SystemExit("Invalid owner UID")
out = Path(a.output_dir)
out.mkdir(parents=True, exist_ok=True, mode=0o700)
# Never chmod an arbitrary pre-existing path supplied by an administrator.
if os.name == "posix" and out.stat().st_mode & 0o077:
    raise SystemExit("Use a dedicated private output directory with mode 0700")
env = out / "private-chat.env"
invite = out / "owner-invite.txt"
if env.exists() or invite.exists():
    raise SystemExit("Refusing to overwrite existing credentials; keep your original recovery copy")
secret = secrets.token_urlsafe(32)
value = {"origin": f"{u.scheme}://{u.netloc}", "room": "main", "uid": a.uid, "token": secret}
code = "BEAVER-PRIVATE1:" + base64.b64encode(quote(json.dumps(value, separators=(",", ":")), safe="~()*!.'-").encode()).decode()
for path, text in [(env, f"CHAT_OWNER_TOKEN={secret}\nCHAT_OWNER_UID={a.uid}\n"), (invite, code + "\n")]:
    fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(fd, "w", encoding="utf-8") as f:
        f.write(text)
print("Created protected environment and owner invitation files. Do not paste their contents into logs or AI chats.")
