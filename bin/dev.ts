import { ConsoleLog, Miniflare } from 'miniflare'

const run = async () => {
  const port = process.env.PORT || 3000
  const logger = new ConsoleLog(true)
  const miniflare = new Miniflare({
    log: logger,
    watch: true,
    kvPersist: true,
    host: 'localhost',
  })
  miniflare.createServer().listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`)
  })
}

run()
