'use client'

import { Config } from '@/types'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useSocket } from '@/lib/socket'

interface StoreContext {
  state: Config
  setState: React.Dispatch<React.SetStateAction<Config>>
}

const StoreContext = createContext<StoreContext | undefined>(undefined)

interface Props {
  children: ReactNode
}

const defaultState = {
  nodes: [],
  services: [],
}

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<Config>(defaultState)
  useSocket()

  return (
    <StoreContext.Provider value={{ state, setState }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider')
  }
  return context
}
