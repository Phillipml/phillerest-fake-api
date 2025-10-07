import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    vercelUrl: process.env.VERCEL_URL,
    nextPublicVercelUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
  }

  console.log('Health check called:', healthCheck);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  res.status(200).json(healthCheck);
}
