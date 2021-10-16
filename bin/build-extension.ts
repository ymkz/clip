import { build } from 'vite'
import { chromeExtension } from 'vite-plugin-chrome-extension'

const run = async () => {
  const root = process.cwd()
  await build({
    plugins: [chromeExtension()],
    root: `${root}/src/extension`,
    clearScreen: false,
    build: {
      emptyOutDir: false,
      outDir: `${root}/dist-extension`,
      rollupOptions: {
        input: `${root}/src/extension/manifest.json`,
      },
    },
  })
}

run()
