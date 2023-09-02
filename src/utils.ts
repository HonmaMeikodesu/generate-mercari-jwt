export const encodeBase64Url = function (e: ArrayBuffer) {
  return Buffer.from((String.fromCharCode(...new Uint8Array(e))), "binary").toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const encodeJwtInfo = function (e: string) {
  return new TextEncoder().encode(unescape(encodeURIComponent(e)));
};