"""Bounded inline raster policy; never fetch remote URLs or decode images on the server."""
import base64
import binascii
import re

from protocol_contract import MAX_IMAGE_BYTES, MAX_IMAGE_MESSAGE_BYTES, MAX_IMAGE_DIMENSION, MAX_IMAGE_PIXELS as MAX_PIXELS, IMAGE_MIME_TYPES

def image_dimensions(raw, mime):
    if mime == "png" and len(raw) >= 33 and raw[:8] == b"\x89PNG\r\n\x1a\n" and raw[8:16] == b"\x00\x00\x00\rIHDR":
        return int.from_bytes(raw[16:20], "big"), int.from_bytes(raw[20:24], "big")
    if mime == "gif" and len(raw) >= 13 and raw[:6] in (b"GIF87a", b"GIF89a"):
        return int.from_bytes(raw[6:8], "little"), int.from_bytes(raw[8:10], "little")
    if mime == "webp" and len(raw) >= 25 and raw[:4] == b"RIFF" and raw[8:12] == b"WEBP" and int.from_bytes(raw[4:8], "little") + 8 == len(raw):
        kind = raw[12:16]
        if kind == b"VP8X" and len(raw) >= 30:
            return 1 + int.from_bytes(raw[24:27], "little"), 1 + int.from_bytes(raw[27:30], "little")
        if kind == b"VP8L" and raw[20] == 0x2f:
            bits = int.from_bytes(raw[21:25], "little")
            return 1 + (bits & 0x3fff), 1 + ((bits >> 14) & 0x3fff)
        if kind == b"VP8 " and len(raw) >= 30 and raw[23:26] == b"\x9d\x01\x2a":
            return int.from_bytes(raw[26:28], "little") & 0x3fff, int.from_bytes(raw[28:30], "little") & 0x3fff
    if mime == "jpeg" and raw[:2] == b"\xff\xd8":
        pos = 2
        while pos + 4 <= len(raw):
            if raw[pos] != 0xff:
                break
            while pos < len(raw) and raw[pos] == 0xff:
                pos += 1
            if pos >= len(raw):
                break
            marker = raw[pos]
            pos += 1
            if marker in (0xd8, 0x01) or 0xd0 <= marker <= 0xd7:
                continue
            if marker in (0xd9, 0xda) or pos + 2 > len(raw):
                break
            size = int.from_bytes(raw[pos:pos + 2], "big")
            if size < 2 or pos + size > len(raw):
                break
            if marker in (0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf) and size >= 8:
                return int.from_bytes(raw[pos + 5:pos + 7], "big"), int.from_bytes(raw[pos + 3:pos + 5], "big")
            pos += size
    raise ValueError("invalid_image_header")

def validate_image_meta(meta):
    if not isinstance(meta, dict) or not isinstance(meta.get("imageUrl"), str):
        raise ValueError("invalid_image")
    value = meta["imageUrl"]
    if len(value) > ((MAX_IMAGE_BYTES + 2) // 3) * 4 + 32:
        raise ValueError("image_limit")
    prefix, sep, encoded = value.partition(",")
    if not sep or not re.fullmatch(r"data:image/(png|jpeg|gif|webp);base64", prefix) or prefix[5:].split(";")[0] not in IMAGE_MIME_TYPES:
        raise ValueError("invalid_image_type")
    try:
        raw = base64.b64decode(encoded, validate=True)
    except (binascii.Error, ValueError):
        raise ValueError("invalid_image_encoding") from None
    if not 0 < len(raw) <= MAX_IMAGE_BYTES:
        raise ValueError("image_limit")
    width, height = image_dimensions(raw, prefix[11:].split(";", 1)[0])
    if not (0 < width <= MAX_IMAGE_DIMENSION and 0 < height <= MAX_IMAGE_DIMENSION and width * height <= MAX_PIXELS):
        raise ValueError("image_dimensions")
    # Only this validated payload is stored; no external image fetch/public file endpoint.
    return {"imageUrl": value}
