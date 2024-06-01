'use client'
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
  useStore()
  return (
    <main className="container py-4">
      <Card>
        <CardHeader>nodes</CardHeader>
        <CardContent>
          <Nodes />
        </CardContent>
      </Card>
    </main>
  )
}
