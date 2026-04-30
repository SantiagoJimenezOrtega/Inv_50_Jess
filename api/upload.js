import { handleUpload } from '@vercel/blob/client';

export default async function handler(req, res) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(500).json({
      error: 'BLOB_READ_WRITE_TOKEN no configurado. Ve a Vercel Dashboard → Storage → Connect Blob store.',
    });
  }

  try {
    const body = await handleUpload({
      body:    req.body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ['image/*', 'audio/*', 'video/*'],
        maximumSizeInBytes:  150 * 1024 * 1024,
      }),
      onUploadCompleted: async () => {},
    });
    return res.json(body);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
