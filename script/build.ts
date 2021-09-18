import { build } from 'vite'
import reactJsx from 'vite-react-jsx'
import tsconfigPaths from 'vite-tsconfig-paths'

const run = async () => {
  const root = process.cwd()
  await Promise.all([
    build({
      plugins: [tsconfigPaths({ root })],
      root: `${root}/src/backend`,
      clearScreen: false,
      build: {
        emptyOutDir: false,
        outDir: `${root}/dist-backend`,
        rollupOptions: {
          input: `${root}/src/backend/index.ts`,
          output: {
            format: 'iife',
            entryFileNames: `[name].js`,
            chunkFileNames: `[name].js`,
            assetFileNames: `[name].[ext]`,
          },
        },
      },
    }),
    build({
      plugins: [tsconfigPaths({ root }), reactJsx()],
      root: `${root}/src/frontend`,
      clearScreen: false,
      build: {
        emptyOutDir: false,
        manifest: true,
        assetsInlineLimit: 0,
        outDir: `${root}/dist-frontend`,
        rollupOptions: {
          input: `${root}/src/frontend/index.html`,
        },
      },
    }),
  ])
}

run()
