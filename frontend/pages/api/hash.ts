// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { hashPassword } from '../../lib/user'

type Data = {
  hash: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const hashed_password = await hashPassword(req.body.text)
  res.status(200).json({ hash: hashed_password })
}
