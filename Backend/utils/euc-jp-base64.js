import iconv from "iconv-lite";
import crypto from "crypto";

export function encodeChar(name) {
  if (!/^[a-zA-Z0-9]{1,25}$/.test(name)) {
    throw new Error("Name must be 1 to 25 half-width alphanumeric characters");
  }

  let eucJpBuffer = iconv.encode(name, "EUC-JP");

  if (eucJpBuffer.length > 25) {
    throw new Error("Encoded name exceeds 25 bytes");
  }

  let base64EncodedName = eucJpBuffer.toString("base64");

  return base64EncodedName;
}

export function decodeChar(encodedName) {
  let eucJpBuffer = Buffer.from(encodedName, "base64");

  let originalName = iconv.decode(eucJpBuffer, "EUC-JP");

  return originalName;
}

export function generateSecureRandomAlphanumeric(length) {
  const bytes = crypto.randomBytes(length);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < bytes.length; ++i) {
    result += characters[bytes[i] % characters.length];
  }
  return result;
}
