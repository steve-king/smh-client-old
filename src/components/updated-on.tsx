import { useEffect, useState } from 'react'
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns'
import { useStoreContext } from '@/lib/store'
import { useSocketContext } from '@/lib/socket'

const seconds = 1 // update the UI every n seconds

const UpdatedOn = () => {
  const { isConnected } = useSocketContext()
  const { updatedOn } = useStoreContext()
  const [message, setMessage] = useState('')

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

  if (!updatedOn) {
    return null
  }

  return (
    <p className="mt-4 text-xs text-muted-foreground text-center">
      {isConnected ? 'Connected to server' : 'Disconnected from server'}. <br />
      Last update received: {message}
    </p>
  )
}

export default UpdatedOn
