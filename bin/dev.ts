import { ConsoleLog, Miniflare } from 'miniflare'

const log = new ConsoleLog(true)
const port = Number(process.env.PORT) || 3000
const miniflare = new Miniflare({
  kvPersist: true,
  watch: true,
  port,
  log,
})

miniflare.createServer().listen(port, () => {
  log.info(`Server is starting on http://localhost:${port}`)
})
