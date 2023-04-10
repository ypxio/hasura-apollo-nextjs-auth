import nc from "next-connect";
import { findAuth, updateAuthRefreshToken } from "../../../lib/user";
import { generateHasuraJWT, sha256 } from "../../../lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { FINGERPRINT_COOKIE_NAME } from "../../../lib/setFingerprintCookieAndSignJwt";
import { v4 as uuidv4 } from "uuid";
import Cookies from 'cookies'

export const config = {
  api: {
    bodyParser: true,
  },
};

export default nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  try {
    const { refreshToken, fingerprintHash } = req.body.input;
    // const fingerprintCookie = req.cookies[FINGERPRINT_COOKIE_NAME];
    // if (!fingerprintCookie)
    //   return res.status(400).json({ message: "Unable to refresh JWT token" });

    // Compute a SHA256 hash of the received fingerprint in cookie in order to compare
    // it to the fingerprint hash stored in the token
    // const fingerprintCookieHash = sha256(fingerprintCookie);

    // if (fingerprintHash != fingerprintCookieHash) {
    //   return res.status(400).json({ message: "Unable to refresh JWT token" });
    // }

    const auth = await findAuth({ refresh_token: { _eq: refreshToken } });
    if (!auth) return res.status(400).json({ message: "User not found" });

    // Update user refresh token and refresh token expiration
    // await updateAuthRefreshToken({
    //   username: auth.username,
    //   refresh_token: uuidv4(),
    //   refresh_token_expires_at: new Date(
    //     Date.now() + 1000 * 60 * 60 * 1
    //   ).toISOString(),
    // });
    const { password, ...authDataWithoutPassword } = auth
    const jwt = generateHasuraJWT({
      expiresIn: "1m",
      allowedRoles: [auth.user.is_admin ? "admin" : "user"],
      defaultRole: auth.user.is_admin ? "admin" : "user",
      otherClaims: {
        "X-Hasura-User-Id": String(auth.user.id),
        "X-Hasura-User-Data": JSON.stringify(authDataWithoutPassword),
      },
    });

    return res.json({ jwt });
  } catch (error) {
    return res.status(400).json({ message: "Error issuing jwt token refresh" });
  }
});
