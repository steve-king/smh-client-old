import { setProperty } from '../utils'

import { getNode } from './node'
import { getNodeStreams } from './node-streams'
import { getService } from './service'
import Stream from './Stream'
import { log } from '../utils'
import { Config } from '../../types'

class Store {
  state: Config | null
  onUpdateCallback: Function | null
  streams: Stream[] = []

  constructor() {
    this.state = null
    this.onUpdateCallback = null
  }

  init = (config: Config) => {
    this.streams.forEach((stream) => stream.cancel())
    this.state = config
    log('INFO', 'store', 'initialised')
    return this
  }

  fetch = () => {
    this.fetchNodes()
    this.fetchServices()
    this.fetchStreams()
  }

  fetchNodes = () => {
    this.state?.nodes.forEach((node) => {
      getNode(node, this.updateNode)
    })
  }

  fetchServices = () => {
    this.state?.services.forEach((service) =>
      getService(service, this.updateService)
    )
  }

  fetchStreams = () => {
    this.state?.nodes.forEach((node) => {
      const nodeStreams = getNodeStreams(node, this.updateNode)
      this.streams = this.streams.concat(nodeStreams)
    })
  }

  /**
   *
   */
  updateNode = (id: string, key: string, value: any) => {
    const node = this.state?.nodes.find((item) => item.name === id)
    if (node) {
      node.data = node.data ? node.data : {}
      setProperty(node.data, key, value)

      if (typeof this.onUpdateCallback === 'function') {
        this.onUpdateCallback()
      }
    }
  }

  updateService = (id: string, key: string, value: any) => {
    const service = this.state?.services.find((item) => item.name === id)
    if (service) {
      setProperty(service, key, value)

      if (typeof this.onUpdateCallback === 'function') {
        this.onUpdateCallback()
      }
    }
  }

  onUpdate = (callback: Function) => {
    this.onUpdateCallback = () => {
      log('INFO', 'store', 'updated', 'verbose')
      callback()
    }
  }
}

const store = new Store()
export default store
