import { useSocketContext } from '@/lib/socket'

const SocketStatus = () => {
  const { isConnected } = useSocketContext()

  const colourClass = isConnected ? 'bg-green-500' : 'bg-red-500'
  return (
    <div
      className={`absolute ${colourClass}`}
      style={{
        width: '10px',
        height: '10px',
        borderRadius: '100%',
        top: '33%',
        right: 0,
        marginTop: '-5px',
        marginRight: '-0.7em',
      }}
    />
  )
}
export default SocketStatus
