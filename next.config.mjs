import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  turbopack: {
    // Force Next.js to treat this directory as the workspace root to avoid
    // accidentally walking up to a parent directory that also has a lockfile.
    root: __dirname,
  },
};

export default nextConfig;
