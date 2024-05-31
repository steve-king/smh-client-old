'use client'
import { useSocket } from '@/lib/socket'
import { useStore } from '@/lib/store'

import Nodes from '@/components/nodes'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Home() {
  useSocket()
  useStore()
  return (
    <main className="container py-4">
      <Card>
        <CardHeader>Nodes</CardHeader>
        <CardContent>
          <Nodes />
        </CardContent>
      </Card>
    </main>
  )
}
