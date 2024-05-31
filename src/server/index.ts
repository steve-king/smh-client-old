import express, { Request, Response } from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

import { testFunc } from '@/test'

app.prepare().then(() => {
  const server = express()

  console.log('EXPRESS SERVER')
  testFunc()

  // Custom routes
  server.get('/api', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to smh-client' })
  })

  // Default next.js handler
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res)
  })

  const port = process.env.PORT || 3131
  server.listen(port, (err?: any) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
