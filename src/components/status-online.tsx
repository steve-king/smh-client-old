import Icon from '@/components/ui/icons'

interface Props {
  isOnline: boolean
}
const StatusOnline = ({ isOnline }: Props) => {
  if (isOnline) {
    return (
      <span className="text-green-500">
        <Icon.check />
      </span>
    )
  } else {
    return (
      <span className="text-red-500">
        <Icon.alert />
      </span>
    )
  }
}

export default StatusOnline
