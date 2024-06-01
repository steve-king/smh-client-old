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
import { Service as ServiceProps } from '@/types'

const Service = ({ name, host, port_operator, data }: ServiceProps) => {
  const isOnline = !data.error

  let synced, peers, verified_layer, top_layer

  if (isOnline) {
    // synced = status.is_synced
    // peers = status.connected_peers
    // verified_layer = status.verified_layer.number
    // top_layer = status.top_layer.number
  }
  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>
        {host}
        <br />
        <small>:{port_operator}</small>
      </TableCell>
      <TableCell>{isOnline ? 'true' : 'false'}</TableCell>
      <TableCell>...</TableCell>
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
          <TableHead>ONLINE</TableHead>
          <TableHead>STATUS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {state.services.map((service: ServiceProps) => (
          <Service key={service.name} {...service} />
        ))}
      </TableBody>
    </Table>
  )
}

export default Nodes
