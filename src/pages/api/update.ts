// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcrypt';
import { createClient } from 'redis';

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = createClient({
  socket: {
    host: 'localhost',
    port: 6379,
  },
});
client
  .connect()
  .then(() => console.log('Connected to Redis -- /update'))
  .catch(console.error);

type Response = {
  success: boolean;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });
  const { password, content, page } = req.body;

  try {
    const hash = await client.GET('pass');
    if (!hash) return res.status(500).json({ success: false, error: 'Database Error' });
    const isVerified = await bcrypt.compare(password, hash);
    if (!isVerified) return res.status(401).json({ success: false, error: 'Incorrect password' });
    await client.LPUSH(page, content);
    await fs.writeFile(join(__dirname, `../../../public/md/${page}.md`), content);
  } catch (e) {
    console.log((e as Error).message);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
  res.status(200).json({ success: true });
}
