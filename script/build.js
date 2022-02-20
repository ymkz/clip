const { build } = require('esbuild')

Promise.all([
  build({
    entryPoints: ['src/worker.ts'],
    outfile: 'dist/worker.js',
    bundle: true,
    minify: process.env.NODE_ENV === 'production' ? true : false,
  }),
  build({
    entryPoints: ['src/render.tsx'],
    outfile: 'public/render.js',
    format: 'esm',
    bundle: true,
    minify: process.env.NODE_ENV === 'production' ? true : false,
  }),
])
