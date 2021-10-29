import vite from 'vite'
import react from 'vite-preset-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const run = async () => {
  const root = process.cwd()
  await Promise.all([
    vite.build({
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
    vite.build({
      plugins: [tsconfigPaths({ root }), react({ removeDevtoolsInProd: true })],
      root: `${root}/src/frontend`,
      clearScreen: false,
      build: {
        emptyOutDir: false,
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
