import { credentials } from '@grpc/grpc-js'
import api from '../spacemesh'
import Stream from './Stream'
import { log } from '../utils'
import { Node } from '../../types'

const creds = credentials.createInsecure()

/**
 * STREAMS
 */
export const getNodeStreams = (node: Node, updateNode: Function) => {
  const publicTarget = node.host + ':' + node.port_public
  const privateTarget = node.host + ':' + node.port_private

  const streams = []

  /**
   * Status stream
   * Mirror of the NodeService.Status unary call
   * Update the node.status object in place
   */
  streams.push(
    new Stream({
      service: api.spacemesh.v1.NodeService,
      target: publicTarget,
      credentials: creds,
      method: 'StatusStream',
      request: {},
      onUpdate: (response: any) => {
        log(
          'INFO',
          'grpc',
          `${publicTarget} NodeService.StatusStream event received`,
          'verbose'
        )

        const data = response.error ? response : response.status
        updateNode(node.name, 'status', data)
      },
    })
  )
  /**
   * Error stream
   * Push new errors into array
   * Ensure no more than 10 errors stored at any one time?
   */
  let errors: any[]
  let errorsMax = 5
  streams.push(
    new Stream({
      service: api.spacemesh.v1.NodeService,
      target: publicTarget,
      credentials: creds,
      method: 'ErrorStream',
      request: {},
      onStart: () => (errors = []),
      onUpdate: (response: any) => {
        log(
          'ERROR',
          'grpc',
          `${publicTarget} NodeService.ErrorStream event received`
        )

        if (errors.length === errorsMax) {
          errors.shift()
        }
        errors.push(response)
        updateNode(node.name, 'ErrorStream', errors)
      },
    })
  )

  /**
   * Events Stream
   * Returns the complete history of events for the node
   * The stream should persist and return new events as they occur
   * If the stream disconnects, clear the array and start fresh
   */
  let events: any[]
  streams.push(
    new Stream({
      service: api.spacemesh.v1.AdminService,
      target: privateTarget,
      credentials: creds,
      method: 'EventsStream',
      request: {},
      onStart: () => (events = []),
      onUpdate: (response: any) => {
        log(
          'INFO',
          'grpc',
          `${privateTarget} AdminService.EventsStream event received`,
          'verbose'
        )
        events.push(response)
        updateNode(node.name, 'EventsStream', events)
      },
    })
  )

  /**
   * PeerInfo Stream
   * Returns all currently connected peers
   * The stream ends once all peers have been reported
   * Discard old peers and start with an empty array each time
   */
  let peers: any[]
  streams.push(
    new Stream({
      service: api.spacemesh.v1.AdminService,
      target: privateTarget,
      credentials: creds,
      method: 'PeerInfoStream',
      request: {},
      onStart: () => (peers = []),
      onUpdate: (response: any) => {
        log(
          'INFO',
          'grpc',
          `${privateTarget} PeerInfoStream response received`,
          'verbose'
        )
        peers.push(response)
      },
      onEnd: () => updateNode(node.name, 'PeerInfoStream', peers),
    })
  )

  return streams
}
