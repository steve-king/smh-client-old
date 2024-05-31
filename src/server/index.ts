import express, { Request, Response } from 'express'
import http from 'http'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextAppHandle = nextApp.getRequestHandler()

import { getConfig, log, cronTask } from '@/server/utils'
import Socket from './socket'
import Store from '@/server/store'

const config = getConfig()
const store = Store.init(config)

const startServer = () => {
  const app = express()

  // Custom routes
  app.get('/api', (req: Request, res: Response) => {
    log('INFO', 'http', '[GET] /api')
    res.json({ message: 'Welcome to smh-client' })
  })

  app.get('/api/state', (req: Request, res: Response) => {
    log('INFO', 'http', '[GET] /api/state')
    res.json(store.state)
  })

  // Default next.js handler
  app.all('*', (req: Request, res: Response) => {
    return nextAppHandle(req, res)
  })

  const port = process.env.PORT || 3131
  const server = http.createServer(app)
  server.listen(port, (err?: any) => {
    if (err) throw err
    log(
      'INFO',
      `${dev ? 'development' : process.env.NODE_ENV} server`,
      `listening at http://localhost:${port}`
    )
  })

  return server
}

nextApp.prepare().then(() => {
  const server = startServer()
  const socket = Socket.init(server)
  store.onUpdate(() => socket.emit('update'))
  store.fetch()
  cronTask(config.settings?.refreshInterval, store.fetch).start()
})

export const logLevel = '' // 'verbose'
