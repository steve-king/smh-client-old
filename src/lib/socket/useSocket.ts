'use client'
import { useEffect } from 'react'
import io from 'socket.io-client'
import { useSocketContext } from './SocketContext'

const useSocket = (url: string = '') => {
  const { setSocket, setIsConnected } = useSocketContext()

  useEffect(() => {
    const socket = io(url, {
      // transports: ['websocket'],
      // timeout: 5000, // 5 seconds
      // reconnection: true,
      // reconnectionAttempts: 10,
      // reconnectionDelay: 1000, // 1 second
    })

    socket.on('connect', () => {
      console.log('Socket connected')
      setIsConnected(true)
    })

    socket.on('connect_error', (err: any) => {
      // the reason of the error, for example "xhr poll error"
      console.log(err.message)

      // some additional description, for example the status code of the initial HTTP response
      console.log(err.description)

      // some additional context, for example the XMLHttpRequest object
      console.log(err.context)
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
      setIsConnected(false)
    })

    setSocket(socket)

    return () => {
      socket.close()
    }
  }, [url, setIsConnected, setSocket])
}

export default useSocket
