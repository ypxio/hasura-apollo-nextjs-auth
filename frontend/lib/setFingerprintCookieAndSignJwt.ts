import { generateHasuraJWT, sha256 } from "./jwt";
import { NextApiResponse } from "next";
import { Auth, User } from "../graphql/types";

export const FINGERPRINT_COOKIE_NAME = "__User-Fgp";
export const FINGERPRINT_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

export function setFingerprintCookieAndSignJwt(
  fingerprint: string,
  res: NextApiResponse,
  auth: Auth
) {
  // res.setHeader(
  //   "Set-Cookie",
  //   serialize(FINGERPRINT_COOKIE_NAME, fingerprint, {
  //     path: "/",
  //     maxAge: FINGERPRINT_COOKIE_MAX_AGE,
  //     httpOnly: true,
  //     domain: undefined,
  //     secure: process.env.NODE_ENV === "production",
  //   })
  // );
  const { password, ...authDataWithoutPassword } = auth
  return generateHasuraJWT({
    allowedRoles: [auth.user.is_admin ? "admin" : "user"],
    defaultRole: auth.user.is_admin ? "admin" : "user",
    expiresIn: "1m",
    otherClaims: {
      "X-Hasura-User-Id": String(auth.user.id),
      "X-Hasura-User-Data": JSON.stringify(authDataWithoutPassword),
      "X-User-Fingerprint": sha256(fingerprint),
    },
  });
}
