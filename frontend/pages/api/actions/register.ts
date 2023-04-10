import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import {
  hashPassword,
  insertUser,
} from "../../../lib/user";
import { setFingerprintCookieAndSignJwt } from "../../../lib/setFingerprintCookieAndSignJwt";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  try {
    const { name, username, password, is_admin } = req.body.input.params;
    const refresh_token = uuidv4();
    const { user } = await insertUser({
      name,
      username,
      password: await hashPassword(password),
      refresh_token,
      // 1 hour, UTC time in ISO format
      refresh_token_expires_at: new Date(
        Date.now() + 1000 * 60 * 60 * 1
      ).toISOString(),
      is_admin
    });
    // Generate a random string that will constitute the fingerprint for this user
    const fingerprint = crypto.randomBytes(50).toString("hex");
    // Add the fingerprint in a hardened cookie to prevent Token Sidejacking
    // https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html#token-sidejacking
    // const jwt = setFingerprintCookieAndSignJwt(fingerprint, res, user);
    // return res.json({ jwt, refreshToken: refresh_token });
    return res.json({ ok: true })
  } catch (error) {
    return res.status(400).json({ message: "Error signing up" });
  }
});
