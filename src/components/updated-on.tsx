import { useEffect, useState } from 'react'
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns'
import { useStoreContext } from '@/lib/store'
import { useSocketContext } from '@/lib/socket'

const seconds = 1 // update the UI every n seconds

const UpdatedOn = () => {
  const { isConnected } = useSocketContext()
  const { updatedOn } = useStoreContext()
  const [message, setMessage] = useState('')

  if (!updatedOn) {
    return null
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const when = formatDistanceToNowStrict(updatedOn, {
        addSuffix: true,
        // includeSeconds: true,
      })
      setMessage(when), seconds * 1000
    })
    return () => clearInterval(interval)
  }, [updatedOn, isConnected])

  return (
    <p className="mt-4 text-xs text-muted-foreground text-center">
      Server is {isConnected ? 'online' : 'offline'}. <br />
      Last update received: {message}
    </p>
  )
}

export default UpdatedOn
