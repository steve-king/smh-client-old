'use client'
import { useEffect } from 'react'
import { useStoreContext } from '@/lib/store'
import { useSocketContext } from '@/lib/socket'

const fetchStore = (setState: Function) => {
  fetch('/api/state')
    .then((res) => res.json())
    .then((json) => {
      setState(json)
      console.log('state', json)
    })
    .catch((e) => console.log('Error fetching state: ', e))
}

const useStore = () => {
  const { setState } = useStoreContext()
  const { socket, isConnected } = useSocketContext()

  useEffect(() => fetchStore(setState), [setState])

  useEffect(() => {
    isConnected && socket.on('update', () => fetchStore(setState))
  }, [isConnected, socket, setState])
}

export default useStore
