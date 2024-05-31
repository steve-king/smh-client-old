import path from 'path'
import { loadPackageDefinition } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
import { recursiveFileList } from '@/server/utils'

const cwd = process.cwd()
const protoDirs = {
  google: path.join(cwd, 'node_modules/google-proto-files'),
  spacemesh: path.join(cwd, 'src/server/spacemesh/api'),
}

const protoFiles = recursiveFileList(protoDirs.spacemesh, '.proto')

const packageDefinition = loadSync(protoFiles, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: [protoDirs.google, protoDirs.spacemesh],
})

const api = loadPackageDefinition(packageDefinition)

export default api as any
