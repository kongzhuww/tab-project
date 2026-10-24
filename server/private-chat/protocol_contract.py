"""Static wire contract only: no credentials, database, environment or network access."""
import json
from pathlib import Path

SPEC = json.loads(Path(__file__).with_name("protocol.json").read_text(encoding="utf-8"))
if type(SPEC.get("schema")) is not int or type(SPEC.get("protocol")) is not int or SPEC["schema"] != 1 or SPEC["protocol"] != 1:
    raise RuntimeError("Unsupported packaged chat contract")
if not isinstance(SPEC.get("messageTypes"), dict) or any(not isinstance(value, dict) or type(value.get("legacy")) is not bool for value in SPEC["messageTypes"].values()):
    raise RuntimeError("Invalid packaged message type table")
MESSAGE_TYPES = tuple(SPEC["messageTypes"])
IMAGE_MIME_TYPES = tuple(SPEC["imageMimeTypes"])
if not MESSAGE_TYPES or len(MESSAGE_TYPES) > 64 or any(type(value) is not str or not value or len(value) > 32 for value in MESSAGE_TYPES) or "system" in MESSAGE_TYPES or len(set(MESSAGE_TYPES)) != len(MESSAGE_TYPES):
    raise RuntimeError("Invalid packaged message types")
if not IMAGE_MIME_TYPES or not set(IMAGE_MIME_TYPES) <= {"image/png", "image/jpeg", "image/gif", "image/webp"}:
    raise RuntimeError("Invalid packaged image types")
LIMIT_NAMES = ("messageBytes", "imageMessageBytes", "imageBytes", "textChars", "imageMaxDimension", "imageMaxPixels")
LIMITS = {name: SPEC["limits"].get(name) for name in LIMIT_NAMES}
for name in LIMIT_NAMES:
    if type(LIMITS.get(name)) is not int or LIMITS[name] < 1:
        raise RuntimeError("Invalid packaged chat limit")
PROTOCOL = SPEC["protocol"]
IMAGE_MESSAGES_SUPPORTED = int("image" in MESSAGE_TYPES)
MAX_MESSAGE_BYTES = LIMITS["messageBytes"]
MAX_IMAGE_MESSAGE_BYTES = LIMITS["imageMessageBytes"]
MAX_IMAGE_BYTES = LIMITS["imageBytes"]
MAX_TEXT_CHARS = LIMITS["textChars"]
MAX_IMAGE_DIMENSION = LIMITS["imageMaxDimension"]
MAX_IMAGE_PIXELS = LIMITS["imageMaxPixels"]

def capabilities():
    # Keep old imageMessages/maxImageBytes readers compatible.
    return {"schema": 1, "protocol": PROTOCOL, "messageTypes": list(MESSAGE_TYPES), "imageMimeTypes": list(IMAGE_MIME_TYPES),
            "limits": dict(LIMITS), "imageMessages": IMAGE_MESSAGES_SUPPORTED, "maxImageBytes": MAX_IMAGE_BYTES}
