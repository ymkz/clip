import html from '@chialab/esbuild-plugin-html'
import paths from '@esbuild-plugins/tsconfig-paths'
import del from 'del'
import esbuild from 'esbuild'
import fs from 'fs/promises'

const run = async () => {
  await del(['./dist-backend', './dist-frontend'])
  await Promise.all([
    esbuild.build({
      plugins: [paths({})],
      bundle: true,
      outdir: './dist-backend',
      entryPoints: ['./src/backend/index.ts'],
    }),
    esbuild.build({
      plugins: [paths({}), html({})],
      bundle: true,
      outdir: './dist-frontend',
      entryPoints: ['./src/frontend/index.html'],
    }),
  ])
  await Promise.all([
    fs.cp('./src/frontend/robots.txt', './dist-frontend/robots.txt'),
    fs.cp('./src/frontend/assets', './dist-frontend/assets', {
      recursive: true,
    }),
  ])
}

run()
