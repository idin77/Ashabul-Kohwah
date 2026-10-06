/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Persistent subscriber storage file path
const DATA_FILE = path.resolve(process.cwd(), 'subscribers.json');

export interface Subscriber {
  email: string;
  source: string;
  lang?: string;
  subscribedAt: string;
}

function loadSubscribers(): Subscriber[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read subscribers file:', err);
  }
  return [];
}

function saveSubscribers(subscribers: Subscriber[]): boolean {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(subscribers, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save subscribers file:', err);
    return false;
  }
}

// Ensure storage file exists
let subscribers = loadSubscribers();
if (!fs.existsSync(DATA_FILE)) {
  saveSubscribers(subscribers);
}

// POST endpoint: Subscribe to newsletter
app.post('/api/newsletter/subscribe', (req, res) => {
  const { email, lang = 'id', source = 'blog_newsletter' } = req.body || {};

  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      message:
        lang === 'en'
          ? 'Email address is required.'
          : 'Alamat email wajib diisi.',
    });
  }

  const trimmedEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({
      success: false,
      message:
        lang === 'en'
          ? 'Please enter a valid email address.'
          : 'Format alamat email tidak valid.',
    });
  }

  // Reload subscribers to prevent race conditions
  subscribers = loadSubscribers();

  // Check if subscriber already exists
  const existing = subscribers.find((s) => s.email === trimmedEmail);
  if (existing) {
    return res.status(200).json({
      success: true,
      alreadySubscribed: true,
      email: trimmedEmail,
      message:
        lang === 'en'
          ? 'You are already subscribed to our monthly maintenance tips!'
          : 'Email Anda sudah terdaftar sebelumnya di buletin tips bulanan kami!',
    });
  }

  // Create and save new subscriber
  const newSubscriber: Subscriber = {
    email: trimmedEmail,
    source: String(source),
    lang: String(lang),
    subscribedAt: new Date().toISOString(),
  };

  subscribers.push(newSubscriber);
  const saved = saveSubscribers(subscribers);

  if (!saved) {
    return res.status(500).json({
      success: false,
      message:
        lang === 'en'
          ? 'Server error saving subscription. Please try again.'
          : 'Terjadi kesalahan sistem saat menyimpan pendaftaran. Silakan coba lagi.',
    });
  }

  return res.status(201).json({
    success: true,
    alreadySubscribed: false,
    email: trimmedEmail,
    message:
      lang === 'en'
        ? 'Subscription successful! Tips will arrive in your inbox each month.'
        : 'Pendaftaran berhasil! Tips perawatan akan dikirimkan setiap bulan ke email Anda.',
  });
});

// GET endpoint: Check newsletter subscriber count or status
app.get('/api/newsletter/stats', (_req, res) => {
  const currentSubscribers = loadSubscribers();
  res.json({
    success: true,
    totalSubscribers: currentSubscribers.length,
    latestSubscribedAt: currentSubscribers[currentSubscribers.length - 1]?.subscribedAt || null,
  });
});

// Start server with Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Mitra Bersih server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
