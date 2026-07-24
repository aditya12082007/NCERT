import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { createServer as createViteServer } from 'vite';

import authRoutes from './server/routes/auth.js';
import albumRoutes from './server/routes/albums.js';
import galleryRoutes from './server/routes/gallery.js';
import uploadRoutes from './server/routes/upload.js';
import adminRoutes from './server/routes/admin.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Middleware
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  }));
  
  app.use(cors({
    origin: true,
    credentials: true,
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Serve static uploaded files
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  // API Endpoints
  app.use('/api/auth', authRoutes);
  app.use('/api/albums', albumRoutes);
  app.use('/api/gallery', galleryRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/admin', adminRoutes);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'NCERT Educational Portal & Private Vault', time: new Date().toISOString() });
  });

  // Vite middleware / Production fallback
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NCERT Portal Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
