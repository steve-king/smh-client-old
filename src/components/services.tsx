'use client'
import { ReactNode } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import StatusOnline from './status-online'
import { useStoreContext } from '@/lib/store'
import { Service as ServiceProps } from '@/types'

import { suToTiB, suToBytes } from '@/lib/utils'

const Services = () => {
  const { state } = useStoreContext()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>NAME</TableHead>
          <TableHead>HOST</TableHead>
          <TableHead>
            Size Units
            <br />
            (TiB)
          </TableHead>
          <TableHead className="text-center">ONLINE</TableHead>
          <TableHead className="text-right">STATUS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {state?.services.map((service: ServiceProps) => (
          <Service key={service.name} {...service} />
        ))}
      </TableBody>
    </Table>
  )
}

const Service = ({ name, host, port_operator, su, data }: ServiceProps) => {
  const isOnline: boolean = data && !data.error
  let status: string | ReactNode = '...'
  if (isOnline) {
    if (typeof data === 'string') {
      status = data
    } else if (typeof data === 'object') {
      status = <ProvingStatus {...data} su={su} />
    }
  }
  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>
        {host}
        <br />
        <small>:{port_operator}</small>
      </TableCell>
      <TableHead>
        {su}
        <br />({suToTiB(su)}TiB)
      </TableHead>
      <TableCell className="text-center">
        <StatusOnline isOnline={isOnline} />
      </TableCell>
      <TableCell className="text-right">{status}</TableCell>
    </TableRow>
  )
}

interface ProvingProps {
  Proving: {
    nonces: {
      start: number
      end: number
    }
    position: number
  }
  su: number
}

const ProvingStatus = (props: ProvingProps) => {
  if (props.Proving) {
    const { nonces, position } = props.Proving
    const TiB = suToTiB(props.su)
    const bytes = suToBytes(props.su)
    const percent = position / bytes
    const percentRounded = Math.round(percent * 100)
    return (
      <span>
        Proving
        <br />
        Nonces: {nonces.start}-{nonces.end}
        <br />
        Position: {position}
        <br />
        Size: {TiB}TiB
        <br />
        Progress: {percentRounded}%
      </span>
    )
  }
  return null
}

export default Services
