import { credentials } from '@grpc/grpc-js'
import api from '@/server/spacemesh'
import { log } from '@/server/utils'
import { Service } from '@/types'

const creds = credentials.createInsecure()

export const getService = (service: Service, updateService: Function) => {
  const target = service.host + ':' + service.port_operator
  const request = {}

  let useHttp = true

  if (useHttp) {
    log('INFO', 'post.v1', 'Using http operator service')
    getStatusHTTP(target, {}, (result: any) => {
      updateService(service.name, 'data', result)
    })
  } else {
    log('INFO', 'post.v1', 'Using gRPC operator service')
    getStatusGRPC(target, {}, (result: any) => {
      updateService(service.name, 'data', result)
    })
  }
}

/**
 * GRPC - gives "read ECONNRESET" error
 */
const getStatusGRPC = (target: string, request: any, callback: Function) => {
  new api.post.v1.OperatorService(target, creds).Status(
    request,
    (error: any, data: any) => {
      let result = data?.status
      if (error) {
        result = { error: true, ...error }
      }
      log('INFO', 'post.v1', target)
      console.log(result)
      callback(result)
    }
  )
}

/**
 * HTTP
 * returns a status string e.g "IDLE"
 * OR a proving object in the format {"Proving":{"nonces":{"start":0,"end":128},"position":317708042240}}
 * We can use the proving data to calculate progress percentage (below line from sm-monitor.ps1):
 * $percent = [math]::round((($provingPosition / ($node.su * 68719476736)) * 100), 0)
 */
const getStatusHTTP = (target: string, request: any, callback: Function) => {
  const httpTarget = `http://${target}/status`
  fetch(httpTarget)
    .then((res) => res.json())
    .then((result) => {
      log('INFO', 'post.v1', httpTarget)
      console.log(result)
      callback(result)
    })
    .catch((error) => {
      log('INFO', 'post.v1', httpTarget)
      console.log(error)
      callback({ error: true, ...error.cause })
    })
}
