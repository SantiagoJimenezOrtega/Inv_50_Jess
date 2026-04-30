import { put } from '@vercel/blob';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const raw      = req.headers['x-filename'] ?? `upload-${Date.now()}`;
  const filename = decodeURIComponent(raw);

  try {
    const blob = await put(filename, req, { access: 'public' });
    return res.status(200).json({ url: blob.url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
