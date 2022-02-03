import { build } from "esbuild"

await Promise.all([
  build({
    entryPoints: ["src/api/index.ts"],
    outfile: "dist/worker.js",
    bundle: true,
    minify: process.env.NODE_ENV === "production" ? true : false,
  }),
  build({
    entryPoints: ["src/view/index.tsx"],
    outfile: "public/main.js",
    format: "esm",
    bundle: true,
    minify: process.env.NODE_ENV === "production" ? true : false,
  }),
])

console.log("⚡ Done")
