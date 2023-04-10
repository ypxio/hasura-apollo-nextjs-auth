import nc from "next-connect";
import {
  checkPassword,
  findAuth,
  updateAuthRefreshToken,
} from "../../../lib/user";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { setFingerprintCookieAndSignJwt } from "../../../lib/setFingerprintCookieAndSignJwt";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  try {
    const { username, password } = req.body.input.params;
    const auth = await findAuth({ username: { _eq: username }});
    if (!auth) {
      return res.status(400).json({ message: "Maaf, username tidak ditemukan" });
    }
    const validPassword = await checkPassword(password, auth.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Maaf, kombinasi username dan password salah" });
    }
		if (auth.user.status !== 1) {
			return res.status(400).json({ message: 'User tidak aktif. Silahkan hubungi Admin'})
		}
    const refresh_token = uuidv4();
    await updateAuthRefreshToken({
      username,
      refresh_token,
      // 1 hour, UTC time in ISO format
      refresh_token_expires_at: new Date(
        Date.now() + 1000 * 60 * 60 * 1
      ).toISOString(),
    });
    // //Generate a random string that will constitute the fingerprint for this user
    const fingerprint = crypto.randomBytes(50).toString("hex");
    // Add the fingerprint in a hardened cookie to prevent Token Sidejacking
    // https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html#token-sidejacking
    const jwt = setFingerprintCookieAndSignJwt(fingerprint, res, auth);
    return res.status(200).json({ jwt, refreshToken: refresh_token, isAdmin: auth.user.is_admin });
  } catch (error) {
    return res.status(400).json({ message: "Error logging in" });
  }
});
