import { credentials } from '@grpc/grpc-js'
import api from '../spacemesh'
import { Node } from '../../types'

const creds = credentials.createInsecure()

export const getNode = (node: Node, updateNode: Function) => {
  const publicTarget = node.host + ':' + node.port_public
  const privateTarget = node.host + ':' + node.port_private
  const postTarget = node.host + ':' + node.port_post

  getStatus(publicTarget, {}, (result: any) => {
    updateNode(node.name, 'status', result)
  })

  getVersion(publicTarget, {}, (result: any) => {
    updateNode(node.name, 'version', result)
  })

  getBuild(publicTarget, {}, (result: any) => {
    updateNode(node.name, 'build', result)
  })

  getNodeInfo(publicTarget, {}, (result: any) => {
    updateNode(node.name, 'nodeInfo', result)
  })

  getPostInfo(postTarget, {}, (result: any) => {
    updateNode(node.name, 'postInfo', result)
  })

  getCoinbase(privateTarget, {}, (result: any) => {
    updateNode(node.name, 'coinbase', result)
  })

  // getHighestAtx(publicTarget, {}, (result: any) => {
  //   updateNode(node.name, 'highestAtx', result)
  // })

  if (node.smeshing) {
    getIsSmeshing(privateTarget, {}, (result: any) => {
      updateNode(node.name, 'smeshing.isSmeshing', result)
    })

    getPostSetupStatus(privateTarget, {}, (result: any) => {
      updateNode(node.name, 'smeshing.postSetupStatus', result)
    })

    getPostSetupProviders(privateTarget, {}, (result: any) => {
      updateNode(node.name, 'smeshing.providers', result)
    })

    getPostConfig(privateTarget, {}, (result: any) => {
      updateNode(node.name, 'smeshing.postConfig', result)
    })

    getSmesherIDs(privateTarget, {}, (result: any) => {
      updateNode(node.name, 'smeshing.smesherIDs', result)
    })
  }
}

/**
 * UNARY API CALLS
 * ----------------------------------------------------------------------
 */
const getStatus = (target: string, request: any, callback: Function) => {
  new api.spacemesh.v1.NodeService(target, creds).Status(
    request,
    (error: any, data: any) => {
      let result = data?.status
      if (error) {
        result = { error: true, ...error }
      }
      callback(result)
    }
  )
}

const getVersion = (target: string, request: any, callback: Function) => {
  new api.spacemesh.v1.NodeService(target, creds).Version(
    request,
    (error: any, data: any) => {
      let result
      if (error) {
        result = { error: true, ...error }
      } else {
        result = data.version_string.value
      }
      callback(result)
    }
  )
}

const getBuild = (target: string, request: any, callback: Function) => {
  new api.spacemesh.v1.NodeService(target, creds).Build(
    request,
    (error: any, data: any) => {
      let result = data
      if (error) {
        result = { error: true, ...error }
      }
      callback(result)
    }
  )
}

const getNodeInfo = (target: string, request: any, callback: Function) => {
  new api.spacemesh.v1.NodeService(target, creds).NodeInfo(
    request,
    (error: any, data: any) => {
      let result = data
      if (error) {
        result = { error: true, ...error }
      }
      callback(result)
    }
  )
}

const getPostInfo = (target: string, request: any, callback: Function) => {
  new api.spacemesh.v1.PostInfoService(target, creds).PostStates(
    request,
    (error: any, data: any) => {
      let result = data
      if (error) {
        result = { error: true, ...error }
      }
      callback(result)
    }
  )
}

const getCoinbase = (target: string, request: any, callback: Function) => {
  new api.spacemesh.v1.SmesherService(target, creds).Coinbase(
    request,
    (error: any, data: any) => {
      let result = data
      if (error) {
        result = { error: true, ...error }
      }
      callback(result)
    }
  )
}

/**
 * Takes a long time.
 */
const getHighestAtx = (target: string, request: any, callback: Function) => {
  new api.spacemesh.v1.ActivationService(target, creds).Highest(
    request,
    (error: any, data: any) => {
      let result = data
      if (error) {
        result = { error: true, ...error }
      }
      callback(result)
    }
  )
}

/**
 * IsSmeshing
 * Will always log an error to the go-spacemesh console if "node is not configured for supervised smeshing"
 */
const getIsSmeshing = (target: string, request: any, callback: Function) => {
  new api.spacemesh.v1.SmesherService(target, creds).IsSmeshing(
    request,
    (error: any, data: any) => {
      let result = data
      if (error) {
        result = { error: true, ...error }
      }
      callback(result)
    }
  )
}

/**
 * Presumably gets current progress of post data initialisation
 */
const getPostSetupStatus = (
  target: string,
  request: any,
  callback: Function
) => {
  new api.spacemesh.v1.SmesherService(target, creds).PostSetupStatus(
    request,
    (error: any, data: any) => {
      let result = data
      if (error) {
        result = { error: true, ...error }
      }
      callback(result)
    }
  )
}

/**
 * Presumably a list of GPUs available for smeshing
 */
const getPostSetupProviders = (
  target: string,
  request: any,
  callback: Function
) => {
  new api.spacemesh.v1.SmesherService(target, creds).PostSetupProviders(
    request,
    (error: any, data: any) => {
      let result = data
      if (error) {
        result = { error: true, ...error }
      }
      callback(result)
    }
  )
}

/**
 * ???
 */
const getPostConfig = (target: string, request: any, callback: Function) => {
  new api.spacemesh.v1.SmesherService(target, creds).PostConfig(
    request,
    (error: any, data: any) => {
      let result = data
      if (error) {
        result = { error: true, ...error }
      }
      callback(result)
    }
  )
}

/**
 * Redundant - PostInfo already returns the IDs plus additional data
 */
const getSmesherIDs = (target: string, request: any, callback: Function) => {
  new api.spacemesh.v1.SmesherService(target, creds).SmesherIDs(
    request,
    (error: any, data: any) => {
      let result = data
      if (error) {
        result = { error: true, ...error }
      }
      callback(result)
    }
  )
}
