'use client'

import { useSocketContext } from '@/lib/socket'
import { useStoreContext } from '@/lib/store'

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from '@/components/ui/collapsible'

const Data = () => {
  const { isConnected } = useSocketContext()
  const { state } = useStoreContext()

  return (
    <section className="mb-4">
      {/* <Card>
        <CardHeader> */}
      <pre className="text-xs">
        Socket: {isConnected ? 'Connected' : 'Disconnected'}
      </pre>
      <pre className="text-xs">{JSON.stringify(state, null, 2)}</pre>
      {/* <CardTitle>Data</CardTitle>
          <CardDescription>All smh-client data</CardDescription>
        </CardHeader>
        <CardContent>
          <Collapsible>
            <CollapsibleTrigger>
              <pre className="text-xs">Data</pre>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <pre className="text-xs">{JSON.stringify(state, null, 2)}</pre>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card> */}
    </section>
  )
}

export { Data }
