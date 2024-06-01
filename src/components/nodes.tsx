'use client'

import { useEffect } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Icon from '@/components/ui/icons'
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

  console.log(name, data.status)

  if (isOnline) {
    synced = status.is_synced
    peers = status.connected_peers
    verified_layer = status.verified_layer?.number
    top_layer = status.top_layer?.number
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
      <TableCell className="text-center">
        {isOnline ? (
          <span className="text-green-500">
            <Icon.check />
          </span>
        ) : (
          <span className="text-red-500">
            <Icon.alert />
          </span>
        )}
      </TableCell>
      <TableCell className="text-center">
        {isOnline ? (
          synced ? (
            <span className="text-green-500">synced</span>
          ) : (
            <span className="text-yellow-500">syncing</span>
          )
        ) : (
          ''
        )}
      </TableCell>
      <TableCell className="text-center">
        {isOnline ? `${verified_layer} / ${top_layer}` : ''}
      </TableCell>
      <TableCell className="text-right">{isOnline ? peers : ''}</TableCell>
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
          <TableHead className="text-center">ONLINE</TableHead>
          <TableHead className="text-center">STATUS</TableHead>
          <TableHead className="text-center">LAYER</TableHead>
          <TableHead className="text-right">PEERS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {state?.nodes.map((node: NodeProps) => (
          <Node key={node.name} {...node} />
        ))}
      </TableBody>
    </Table>
  )
}

export default Nodes
