'use client'
import { useEffect } from 'react'
import { useStore, useStoreContext } from '@/lib/store'

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
  const { state } = useStoreContext()

  // useEffect(() => {
  //   console.log('State:', state)
  // }, [state])

  if (!state) {
    return <div>Loading...</div>
  }

  return (
    <main className="container">
      <Card className="mt-6">
        <CardHeader className="text-center">NODES</CardHeader>
        <CardContent>
          <Nodes />
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader className="text-center">SERVICES</CardHeader>
        <CardContent>
          <Services />
        </CardContent>
      </Card>
      <UpdatedOn />
    </main>
  )
}
