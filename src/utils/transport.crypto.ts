const HEX_TO_BYTES = (hex:any) =>
  new Uint8Array(hex.match(/.{1,2}/g).map((b:any) => parseInt(b, 16)));
 
const KEY_HEX ="e4b7c9a1d8f02c7b9a3e1d5f6a9b0c4e7d8a1f2c3b4e5d6a7b8c9d0e1f2a3212"; // 32 bytes
 
/**
* 🔓 AUTO-SAFE DECRYPT
* - HTTP → skip
* - HTTPS → decrypt
* - Plain JSON → return
*/
export const decryptApiResponse=async(payload:any)=> {
  // Plain response → return directly
  if (!payload?.data || !payload?.iv || !payload?.tag) {
    return payload;
  }
 
  // HTTP / unsupported browser
  if (!window.crypto?.subtle) {
    console.warn("🔓 Crypto unavailable (HTTP mode)");
    return payload;
  }
 
  try {
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      HEX_TO_BYTES(KEY_HEX),
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );
 
    const iv = HEX_TO_BYTES(payload.iv);
    const encrypted = HEX_TO_BYTES(payload.data);
    const tag = HEX_TO_BYTES(payload.tag);
 
    const combined = new Uint8Array(encrypted.length + tag.length);
    combined.set(encrypted);
    combined.set(tag, encrypted.length);
 
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv, tagLength: 128 },
      cryptoKey,
      combined
    );
 
    return JSON.parse(new TextDecoder().decode(decryptedBuffer));
  } catch (err) {
    console.error("❌ Frontend decrypt failed", err);
    return null;
  }
}
 