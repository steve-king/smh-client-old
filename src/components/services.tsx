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
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icons'
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
          <TableHead>Size</TableHead>
          <TableHead>Size (TiB)</TableHead>
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
      <TableCell>{su} SU</TableCell>
      <TableCell>{suToTiB(su)} TiB</TableCell>
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

    const Stage = () => {
      if (position === 0) {
        return (
          <span className="text-sm">
            <span className="text-yellow-500 animate-pulse-custom">
              <span className="mr-1 relative" style={{ top: '-1px' }}>
                <Icon.cpu />
              </span>
              k2PoW
            </span>
            <br />
            {/* Nonces: {nonces.start}-{nonces.end} */}
          </span>
        )
      }

      return (
        <span className="text-xs">
          <span className="text-yellow-500 animate-pulse-custom">
            <span className="mr-2 relative" style={{ top: '-1px' }}>
              <Icon.hardDrive />
            </span>
            Disk read
          </span>
          <br />
          <Progress value={percentRounded} className="my-1" />
          <span className="text-xs text-muted-foreground">
            Progress: {percentRounded}%
          </span>
        </span>
      )
    }

    return (
      <span className="text-xs">
        <span>Proving</span>
        <br />
        <Stage />
      </span>
    )
  }
  return null
}

export default Services
