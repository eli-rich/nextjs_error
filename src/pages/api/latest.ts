// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from 'redis';

const client = createClient({
  socket: {
    host: 'localhost',
    port: 6379,
  },
});
client
  .connect()
  .then(() => console.log('Connected to Redis -- /latest'))
  .catch(console.error);

type Response = {
  data?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const { page } = req.query;
  if (typeof page !== 'string' || page === '') return res.status(400).json({ error: 'Bad request' });
  let data;
  try {
    data = await client.LRANGE(page, 0, 0);
  } catch (e) {
    console.log((e as Error).message);
    return res.status(500).json({ error: 'Internal server error' });
  }
  res.status(200).json({ data: data[0] });
}
