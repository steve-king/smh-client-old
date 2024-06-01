import { ChannelCredentials, ClientReadableStream } from '@grpc/grpc-js'
import { log } from '@/server/utils'

const reconnectIntervalSeconds = 60
const reconnectInterval = reconnectIntervalSeconds * 1000

interface StreamConfig {
  service: any
  target: string
  credentials: ChannelCredentials
  method: string
  request: any
  onUpdate: Function
  onStart?: Function
  onEnd?: Function
}

export default class Stream {
  stream: ClientReadableStream<any> | null = null
  config: StreamConfig
  cancelled: boolean = false

  constructor(config: StreamConfig) {
    this.config = config
    this.start()
  }

  start = () => {
    const { service, target, credentials, method, request } = this.config

    this.stream = new service(target, credentials)[method](request)

    if (this.stream?.readable) {
      log('INFO', 'grpc', `${this.config.target} ${this.config.method} started`)

      if (typeof this.config.onStart === 'function') {
        this.config.onStart()
      }

      this.registerHandlers()
    }
  }

  cancel = () => {
    this.cancelled = true
    this.stream?.cancel()
    this.stream = null
    log('INFO', 'grpc', `${this.config.target} ${this.config.method} cancelled`)
  }

  registerHandlers = () => {
    this.stream
      ?.on('status', this.onStatus)
      .on('data', this.onData)
      .on('error', this.onError)
      .on('end', this.onEnd)
  }

  onStatus = (status: any) => {
    // log('INFO', 'grpc', `${this.config.target} ${this.config.method} - status`)
  }

  onData = (data: any) => {
    // log('INFO', 'grpc', `${this.config.target} ${this.config.method} - data`)
    if (typeof this.config.onUpdate === 'function') {
      this.config.onUpdate(data)
    }
  }

  onError = (error: any) => {
    // log('error', 'grpc', `${this.config.target} ${this.config.method} - error`)
    if (typeof this.config.onUpdate === 'function') {
      this.config.onUpdate({ error: true, ...error })
    }
  }

  onEnd = () => {
    log(
      'INFO',
      'grpc',
      `${this.config.target} ${this.config.method} ended. Reconnecting in ${reconnectIntervalSeconds} seconds`
    )

    if (typeof this.config.onEnd === 'function') {
      this.config.onEnd()
    }

    if (!this.cancelled) {
      this.stream?.cancel()
      this.stream = null
      setTimeout(this.start, reconnectInterval)
    }
  }
}
