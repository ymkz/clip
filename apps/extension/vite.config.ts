import { crx, defineManifest } from '@crxjs/vite-plugin'
import { defineConfig } from 'vite'

const manifest = defineManifest(() => {
  return {
    manifest_version: 3,
    version: '0.2.0',
    name: 'Clip Web Clipper',
    description: 'Web Clipper for Clip',
    permissions: ['activeTab', 'notifications'],
    host_permissions: [
      process.env.TARGET_ENDPOINT ?? 'https://example.com/api/add',
    ],
    action: {
      default_title: 'Save to Clip',
      default_icon: {
        '128': 'assets/icon_x128.png',
      },
    },
    background: {
      type: 'module',
      service_worker: 'src/background.ts',
    },
    icons: {
      '128': 'assets/icon_x128.png',
    },
  }
})

const config = defineConfig(() => {
  return {
    clearScreen: false,
    plugins: [crx({ manifest })],
    server: {
      open: false,
      port: 3002,
    },
    define: {
      TARGET_ENDPOINT: JSON.stringify(
        process.env.TARGET_ENDPOINT ?? 'https://example.com/api/add'
      ),
    },
  }
})

export default config
