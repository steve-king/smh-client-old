export interface Config {
  settings?: Settings
  nodes: Node[]
  services: Service[]
}

interface Settings {
  refreshInterval: number
}

export interface Node {
  name: string
  host: string
  port_public: string
  port_private: string
  port_post: string
  smeshing: boolean | undefined
  data?: any
}

export interface Service {
  name: string
  host: string
  port_operator: string
  data?: any
}
