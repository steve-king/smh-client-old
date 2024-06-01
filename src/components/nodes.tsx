'use client'

import {
  Table,
  TableBody,
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
      <TableCell>{isOnline ? 'true' : 'false'}</TableCell>
      <TableCell>{isOnline ? (synced ? 'synced' : 'syncing') : ''}</TableCell>
      <TableCell>{isOnline ? peers : ''}</TableCell>
      <TableCell className="text-right">
        {isOnline ? `${verified_layer} / ${top_layer}` : ''}
      </TableCell>
    </TableRow>
  )
}

const Nodes = () => {
  const { state } = useStoreContext()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>NAME</TableHead>
          <TableHead>HOST</TableHead>
          <TableHead>VERSION</TableHead>
          <TableHead>ONLINE</TableHead>
          <TableHead>STATUS</TableHead>
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
