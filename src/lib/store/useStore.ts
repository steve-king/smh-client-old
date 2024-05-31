'use client'
import { useEffect } from 'react'
import { useSocketContext } from '@/lib/socket'
import { useStoreContext } from '@/lib/store'

const fetchStore = (setState: Function) => {
  fetch('/api/state')
    .then((res) => res.json())
    .then((data) => {
      setState(data)
      console.log('state', data)
    })
    .catch((e) => console.log('Error fetching state: ', e))
}

const useStore = () => {
  const { setState } = useStoreContext()
  const { socket, isConnected } = useSocketContext()

  useEffect(() => {
    fetchStore(setState)
  }, [setState])

  useEffect(() => {
    if (isConnected) {
      socket.on('update', () => fetchStore(setState))
    }
  }, [isConnected, socket, setState])
}

export default useStore
