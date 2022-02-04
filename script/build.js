const esbuild = require("esbuild")

esbuild.build({
  entryPoints: ["src/worker.ts"],
  outfile: "dist/worker.js",
  bundle: true,
  minify: process.env.NODE_ENV === "production" ? true : false,
})
