import esbuildTsconfigPaths from '@esbuild-plugins/tsconfig-paths'
import viteReactRefresh from '@vitejs/plugin-react-refresh'
import { build as buildByEsbuild } from 'esbuild'
import { build as buildByVite } from 'vite'
import viteReactJsx from 'vite-react-jsx'
import viteTsconfigPaths from 'vite-tsconfig-paths'

const run = async () => {
  await Promise.all([
    buildByEsbuild({
      plugins: [esbuildTsconfigPaths({})],
      bundle: true,
      outdir: './dist-api',
      entryPoints: ['./src/api/index.ts'],
    }),
    buildByVite({
      plugins: [viteTsconfigPaths(), viteReactJsx(), viteReactRefresh()],
      build: { outDir: './dist-view' },
      clearScreen: false,
    }),
  ])
}

run()
