import type { NextApiRequest, NextApiResponse } from 'next';

// Simple in-memory store for rate limiting
// In production, you might want to use Redis or another persistent store
const rateLimit = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT = 5; // Maximum requests per uur
const WINDOW_MS = 60 * 60 * 1000; // 1 uur

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // IP address
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const clientIp = Array.isArray(ip) ? ip[0] : ip;

  // Check rate limit
  const now = Date.now();
  const userRateLimit = rateLimit.get(clientIp);

  if (userRateLimit) {
    // Clean up old entries
    if (now - userRateLimit.timestamp > WINDOW_MS) {
      rateLimit.set(clientIp, { count: 1, timestamp: now });
    } else if (userRateLimit.count >= RATE_LIMIT) {
      return res.status(429).json({
        error: 'Te veel verzoeken. Probeer het over een uur opnieuw.'
      });
    } else {
      rateLimit.set(clientIp, {
        count: userRateLimit.count + 1,
        timestamp: userRateLimit.timestamp
      });
    }
  } else {
    rateLimit.set(clientIp, { count: 1, timestamp: now });
  }

  try {
    // Forward to Formspree
    const response = await fetch('https://formspree.io/f/xjkaravr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({
      error: 'Er is een fout opgetreden bij het verzenden van het formulier.'
    });
  }
}
