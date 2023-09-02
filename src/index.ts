import { v4 } from "uuid";
import { Crypto } from "@peculiar/webcrypto";
import { publicJsonWebKey, privateJsonWebKey } from "./const";
import { encodeBase64Url, encodeJwtInfo } from "./utils";
import type { Method } from "axios";

const { subtle } = new Crypto();

export default async function generateMercariJwt(apiUrl: string, method: Method) {
  const { crv, kty, x, y} = publicJsonWebKey;
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

  // plaintext -> digest + privateKey -> signature
  const privateCryptoKey = await subtle.importKey(
    "jwk",
    privateJsonWebKey,
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    true,
    ["sign"]
  );
  const signature = await subtle.sign(
    {
      name: "ECDSA",
      hash: {
        // use SHA-256 as digest algorithm
        name: "SHA-256",
      },
    },
    privateCryptoKey,
    encodedData
  );
  return jwtWrap + "." + encodeBase64Url(signature);
}
