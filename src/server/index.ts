import express, { Request, Response } from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

import { getConfig, log } from '@/server/utils'
import Store from '@/server/store'

const config = getConfig()
const store = Store.init(config)

const startServer = () => {
  const server = express()

  // Custom routes
  server.get('/api', (req: Request, res: Response) => {
    log('INFO', 'http', '[GET] /api')
    res.json({ message: 'Welcome to smh-client' })
  })

  server.get('/api/state', (req: Request, res: Response) => {
    log('INFO', 'http', '[GET] /api/state')
    res.json(store.state)
  })

  // Default next.js handler
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res)
  })

  const port = process.env.PORT || 3131
  server.listen(port, (err?: any) => {
    if (err) throw err
    // console.log(`> Ready on http://localhost:${port}`)
    log(
      'INFO',
      `${dev ? 'development' : process.env.NODE_ENV} server`,
      `listening at http://localhost:${port}`
    )
  })

  return server
}

app.prepare().then(() => {
  const server = startServer()
  // const socket = Socket.init(server)
  // store.onUpdate(() => socket.emit('update'))
  // cron(refreshInterval, store.fetch).start()
  store.fetch()
})

export const logLevel = 'verbose' // 'verbose'
