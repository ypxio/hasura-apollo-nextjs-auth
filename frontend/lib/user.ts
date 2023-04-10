import crypto from "crypto";
import { promisify } from "util";
import { Auth } from "../graphql/types";

const scrypt = promisify(crypto.scrypt);

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(8).toString("hex");
  const derivedKey = await scrypt(password, salt, 64);
  // @ts-ignore
  return salt + ":" + derivedKey.toString("hex");
}

export async function checkPassword(plaintextPassword: string, hashedPassword: string) {
  const [salt, key] = hashedPassword.split(":")
  const derivedKey = (await scrypt(plaintextPassword, salt, 64)) as NodeJS.ArrayBufferView
  return crypto.timingSafeEqual(Buffer.from(key, "hex"), derivedKey)
}

export async function findAuth(where: Record<string, any>) {
  const request = await fetch(process.env["NEXT_PUBLIC_HASURA_URL"] as string, {
    method: "POST",
    //@ts-ignore
    headers: {
      "Content-Type": "application/json",
      "X-Hasura-Admin-Secret": process.env["HASURA_SECRET"],
    },
    body: JSON.stringify({
      query: `
        query FindAuth($where: auth_bool_exp!) {
          result: auth(where: $where) {
            username
            password
            user {
              id
              name
              is_admin
              status
            }
          }
        }
      `,
      variables: { where },
    }),
  })
  const result = await request.json()
  const auth = result.data.result[0]
  return auth as Auth
}

export async function insertUser({
  name,
  username,
  password,
  refresh_token,
  refresh_token_expires_at,
  is_admin
}: {
  name: string
  username: string
  password: string
  refresh_token: string
  refresh_token_expires_at: string
  is_admin: boolean
}) {
  const request = await fetch(process.env["NEXT_PUBLIC_HASURA_URL"] as string, {
    method: "POST",
    //@ts-ignore
    headers: {
      "Content-Type": "application/json",
      "X-Hasura-Admin-Secret": process.env["HASURA_SECRET"],
    },
    body: JSON.stringify({
      query: `
        mutation InsertAuth($params: auth_insert_input!) {
          result: insert_auth_one(object: $params) {
            user {
              id
              is_admin
            }
          }
        }
      `,
      variables: {
        params: {
          username,
          password,
          refresh_token,
          refresh_token_expires_at,
          user: {
            data: {
              name,
              is_admin,
              status: is_admin ? 1 : 0,
            },
          },
        },
      },
    }),
  });
  const result = await request.json();
  const user = result.data.result;
  return user;
}

export async function updateAuthRefreshToken({
  username,
  refresh_token,
  refresh_token_expires_at,
}: {
  username: string
  refresh_token: string
  refresh_token_expires_at: string
}) {
  const request = await fetch(process.env["NEXT_PUBLIC_HASURA_URL"] as string, {
    method: "POST",
    //@ts-ignore
    headers: {
      "Content-Type": "application/json",
      "X-Hasura-Admin-Secret": process.env["HASURA_SECRET"],
    },
    body: JSON.stringify({
      query: `
        mutation UpdateUserRefreshToken($username: String!, $refresh_token: String!, $refresh_token_expires_at: timestamptz!) {
          update_auth_by_pk(
            pk_columns: { username: $username },
            _set: {
              refresh_token: $refresh_token,
              refresh_token_expires_at: $refresh_token_expires_at
            }
          ) {
            username
            refresh_token
          }
        }
      `,
      variables: {
        username,
        refresh_token,
        refresh_token_expires_at,
      },
    }),
  });
  const result = await request.json();
  const user = result.data.update_auth_by_pk;
  return user;
}
