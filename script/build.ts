import html from '@chialab/esbuild-plugin-html'
import paths from '@esbuild-plugins/tsconfig-paths'
import esbuild from 'esbuild'
import fs from 'fs-extra'

const run = async () => {
  await Promise.all([fs.remove('./dist-backend'), fs.remove('./dist-frontend')])
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
    fs.copy('./src/frontend/robots.txt', './dist-frontend/robots.txt'),
    fs.copy('./src/frontend/assets', './dist-frontend/assets'),
  ])
}

run()
