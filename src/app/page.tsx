'use client'
import { useStore } from '@/lib/store'

import Nodes from '@/components/nodes'
import Services from '@/components/services'
import UpdatedOn from '@/components/updated-on'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Home() {
  useStore()
  return (
    <main className="container">
      <Card className="mt-6">
        <CardHeader>NODES</CardHeader>
        <CardContent>
          <Nodes />
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>SERVICES</CardHeader>
        <CardContent>
          <Services />
        </CardContent>
      </Card>
      <UpdatedOn />
    </main>
  )
}
