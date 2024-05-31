'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface SocketContextType {
  socket: any
  setSocket: React.Dispatch<React.SetStateAction<any>>
  isConnected: boolean
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

interface SocketProviderProps {
  children: ReactNode
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  return (
    <SocketContext.Provider
      value={{ socket, setSocket, isConnected, setIsConnected }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider')
  }
  return context
}
