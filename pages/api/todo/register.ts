// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch('http://localhost:8080/api/todo/register')
  const todos = await response.json()
  res.status(200).json({ todos })
}