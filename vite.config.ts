import react from "@vitejs/plugin-react"
import vite from "vite"
import windicss from "vite-plugin-windicss"
import tsconfigPaths from "vite-tsconfig-paths"

export default vite.defineConfig({
  clearScreen: false,
  server: { port: 3001 },
  plugins: [react(), windicss(), tsconfigPaths()],
})
