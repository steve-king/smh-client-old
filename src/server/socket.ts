import SocketIO, { Socket } from 'socket.io'
import { throttle } from 'lodash'
import { Server } from 'http'
import { log } from './utils'

class SocketServer {
  io: SocketIO.Server | null
  throttleSeconds: number = 10

  constructor() {
    this.io = null
  }

  init = (server: Server) => {
    this.io = new SocketIO.Server(server, {
      cors: {
        origin: '*',
      },
    })

    this.io.on('connection', (socket: Socket) => {
      const ip = socket.handshake.address

      log('INFO', 'socket', `client connected: ${ip}`)

      socket.on('disconnect', () => {
        log('INFO', 'socket', `client disconnected: ${ip}`)
      })
    })

    log('INFO', 'socket', 'initialised')

    this.io.engine.on('connection_error', (err: any) => {
      // console.log(err.req) // the request object
      // console.log(err.code) // the error code, for example 1
      console.log(err.message) // the error message, for example "Session ID unknown"

      log('ERROR', 'socket', err.code + ' ' + err.message + ' ' + err.context)
      // console.log(err.context) // some additional error context
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
