/// <reference types="node" />

import { execSync } from 'child_process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const getGitCommit = (): string => {
  try {
    const commitHash = execSync('git rev-parse --short HEAD').toString().trim()
    const commitMessage = execSync('git log -1 --pretty=format:%s').toString().trim()
    return `${commitHash} - ${commitMessage}`
  } catch (error) {
    return 'Development Build'
  }
}

export default defineConfig({
  plugins: [react()],
  define: {
    __GIT_COMMIT__: JSON.stringify(getGitCommit())
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: true,
    hmr: {
      clientPort: 443
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 8081
  },
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/attached_assets'
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    coverage: {
      reporter: ['text', 'html'],
      provider: 'v8'
    }
  }
})
