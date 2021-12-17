import { v4 } from "uuid";
import { Crypto } from "@peculiar/webcrypto";


const { subtle } = new Crypto();

const encodeBase64Url = function (e: ArrayBuffer) {
  return Buffer.from((String.fromCharCode(...new Uint8Array(e))), "binary").toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const encodeJwtInfo = function (e: string) {
  return new TextEncoder().encode(unescape(encodeURIComponent(e)));
};

const privateJsonWebKey = {
  crv: "P-256",
  d: "qzJefZlCFzPnUUyuD37QgBZATFZ2Rt-t-9TK4jMhqwo",
  ext: true,
  key_ops: ["sign"],
  kty: "EC",
  x: "VJ2fGWql1ozEs8U9eTyCstNPSYbrd4-4OB-88C_i1yM",
  y: "aZy9Pa39dIP-U-WF9IoYK-LgSUUZiht5gG7bqQ-dbPQ",
} as const;

export default async function generateMercariJwt(apiUrl: string, method: string = "GET") {
  const { crv, kty, x, y} = privateJsonWebKey;
  const key = await (subtle as any).importKey(
    "jwk",
    privateJsonWebKey,
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    !0,
    ["sign"]
  );

  const header = JSON.stringify({
    typ: "dpop+jwt",
    alg: "ES256",
    jwk: {
      crv,
      kty,
      x,
      y,
    },
  });
  const payload = JSON.stringify({
    iat: Math.ceil(new Date().getTime() / 1000),
    jti: v4(),
    htu: apiUrl,
    htm: method,
    uuid: v4(),
  });
  const jwtWrap = [
    encodeBase64Url(encodeJwtInfo(header)),
    encodeBase64Url(encodeJwtInfo(payload)),
  ].join(".");
  const encodedData = encodeJwtInfo(jwtWrap);
  const signature = await subtle.sign(
    {
      name: "ECDSA",
      hash: {
        name: "SHA-256",
      },
    },
    key,
    encodedData
  );
  return jwtWrap + "." + encodeBase64Url(signature);
}
