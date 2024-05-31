import SocketIO, { Socket } from 'socket.io'
import { throttle } from 'lodash'
import { Server } from 'http'

import { log } from '@/server/utils'

class SocketServer {
  io: SocketIO.Server | null
  throttleSeconds: number = 10

  constructor() {
    this.io = null
  }

  init = (server: Server) => {
    this.io = new SocketIO.Server(server)

    log('INFO', 'socket', 'initialised')

    this.io.on('connection', (socket: Socket) => {
      const ip = socket.handshake.address
      log('INFO', 'socket', `client connected: ${ip}`)

      socket.on('disconnect', () =>
        log('INFO', 'socket', `client disconnected: ${ip}`)
      )
    })

    this.io.engine.on('connection_error', (err: any) => {
      log('ERROR', 'socket', err.code + '|' + err.message + '|' + err.context)
    })

    return this
  }

  emit = throttle(
    (event: string, data?: any) => {
      this.io?.emit(event, data)
      log('INFO', 'socket', `emit ${event}`)
    },
    this.throttleSeconds * 1000,
    {
      leading: false,
      trailing: true,
    }
  )
}

const socket = new SocketServer()
export default socket
