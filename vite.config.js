import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

// Get git commit info at build time
const getGitCommit = () => {
  try {
    const commitHash = execSync('git rev-parse --short HEAD').toString().trim()
    const commitMessage = execSync('git log -1 --pretty=format:%s').toString().trim()
    const commitDate = execSync('git log -1 --pretty=format:%ai').toString().trim()
    return `${commitHash} - ${commitMessage}`
  } catch (error) {
    return 'Development Build'
  }
}

// https://vitejs.dev/config/
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
  }
})