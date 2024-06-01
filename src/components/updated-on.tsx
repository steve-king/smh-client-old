import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { useStoreContext } from '@/lib/store'

const seconds = 1 // update the UI every n seconds

const UpdatedOn = () => {
  const { updatedOn } = useStoreContext()
  const [when, setWhen] = useState('')

  if (!updatedOn) {
    return null
  }

  useEffect(() => {
    const interval = setInterval(
      () =>
        setWhen(
          formatDistanceToNow(updatedOn, {
            addSuffix: true,
            includeSeconds: true,
          })
        ),
      seconds * 1000
    )
    return () => clearInterval(interval)
  }, [updatedOn])

  return (
    <p className="mt-4 text-xs text-muted-foreground text-center">
      updated {when}
    </p>
  )
}

export default UpdatedOn
