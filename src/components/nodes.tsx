'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useStoreContext } from '@/lib/store'
import { Node as NodeProps } from '@/types'

const Node = ({
  name,
  host,
  port_public,
  port_private,
  port_post,
  data,
}: NodeProps) => {
  const { status } = data
  const isOnline = !status.error

  let synced, peers, verified_layer, top_layer

  if (isOnline) {
    synced = status.is_synced
    peers = status.connected_peers
    verified_layer = status.verified_layer.number
    top_layer = status.top_layer.number
  }
  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>
        {host}
        <br />
        <small>
          :{port_public} :{port_private} :{port_post}
        </small>
      </TableCell>
      <TableCell>v1.5.6</TableCell>
      <TableCell>{isOnline ? 'online' : 'offline'}</TableCell>
      <TableCell>{synced ? 'true' : 'false'}</TableCell>
      <TableCell>{isOnline ? peers : 0}</TableCell>
      <TableCell className="text-right">
        {isOnline ? `${verified_layer} / ${top_layer}` : 'N/A'}
      </TableCell>
    </TableRow>
  )
}

const Nodes = () => {
  const { state } = useStoreContext()
  return (
    <Table>
      <TableCaption>Updated a few seconds ago</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>NAME</TableHead>
          <TableHead>HOST</TableHead>
          <TableHead>VERSION</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead>SYNCED</TableHead>
          <TableHead>PEERS</TableHead>
          <TableHead className="text-right">LAYER</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {state.nodes.map((node: NodeProps) => (
          <Node key={node.name} {...node} />
        ))}
      </TableBody>
    </Table>
  )
}

export default Nodes
