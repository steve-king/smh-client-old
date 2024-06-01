import { useStoreContext } from '@/lib/store'

const UpdatedOn = () => {
  const { updatedOn } = useStoreContext()

  if (!updatedOn) {
    return null
  }
  return (
    <p className="mt-4 text-sm text-muted-foreground text-center">
      Last update: {updatedOn.toISOString()}
    </p>
  )
}

export default UpdatedOn
