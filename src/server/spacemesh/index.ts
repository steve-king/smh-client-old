var fs = require('fs')
var path = require('path')
var grpc = require('@grpc/grpc-js')
var protoLoader = require('@grpc/proto-loader')

const GOOGLE_PROTO_PATH = path.join(
  process.cwd(),
  'node_modules/google-proto-files'
)
const SPACEMESH_PROTO_PATH = path.join(
  process.cwd(),
  'src/server/spacemesh/api'
)

// Recursively get all .proto file paths in given directory
function getProtoFiles(dir: string): string[] {
  let protoFiles: string[] = []
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      protoFiles = protoFiles.concat(getProtoFiles(filePath))
    } else if (filePath.endsWith('.proto')) {
      protoFiles.push(filePath)
    }
  }
  return protoFiles
}

// Load proto files
const protoFiles = getProtoFiles(SPACEMESH_PROTO_PATH)

const packageDefinition = protoLoader.loadSync(protoFiles, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: [GOOGLE_PROTO_PATH, SPACEMESH_PROTO_PATH],
})

const api = grpc.loadPackageDefinition(packageDefinition)

export default api
