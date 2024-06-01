'use client'
import { useEffect } from 'react'
import { useStoreContext } from '@/lib/store'
import { useSocketContext } from '@/lib/socket'

const fetchStore = (setState: Function, setUpdatedOn: Function) => {
  fetch('/api/state')
    .then((res) => res.json())
    .then((json) => {
      setState(json)
      const updatedOn = new Date()
      setUpdatedOn(updatedOn)
      console.log(updatedOn.toISOString(), json)
    })
    .catch((e) => console.log('Error fetching state: ', e))
}

const useStore = () => {
  const { setState, setUpdatedOn } = useStoreContext()
  const { socket, isConnected } = useSocketContext()

  useEffect(() => fetchStore(setState, setUpdatedOn), [setState, setUpdatedOn])

  useEffect(() => {
    isConnected && socket.on('update', () => fetchStore(setState, setUpdatedOn))
  }, [isConnected, socket, setState, setUpdatedOn])
}

export default useStore
