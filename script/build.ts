import vite from 'vite'
import reactJsx from 'vite-react-jsx'
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
        rollupOptions: { input: `${root}/src/backend/index.ts` },
      },
    }),
    vite.build({
      plugins: [tsconfigPaths({ root }), reactJsx()],
      root: `${root}/src/frontend`,
      clearScreen: false,
      build: {
        emptyOutDir: false,
        outDir: `${root}/dist-frontend`,
        rollupOptions: { input: `${root}/src/frontend/index.html` },
      },
    }),
  ])
}

run()
