'use client'

import { Config } from '@/types'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useSocket } from '@/lib/socket'

interface StoreContext {
  state: Config
  setState: React.Dispatch<React.SetStateAction<Config>>
  updatedOn: Date
  setUpdatedOn: React.Dispatch<React.SetStateAction<Date>>
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
  const [updatedOn, setUpdatedOn] = useState<any>(null)
  useSocket()

  return (
    <StoreContext.Provider value={{ state, setState, updatedOn, setUpdatedOn }}>
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
