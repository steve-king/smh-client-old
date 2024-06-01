'use client'

import { Config } from '@/types'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useSocket } from '@/lib/socket'

interface StoreContext {
  state: Config | null
  setState: React.Dispatch<React.SetStateAction<Config | null>>
  updatedOn: Date
  setUpdatedOn: React.Dispatch<React.SetStateAction<Date>>
}

const StoreContext = createContext<StoreContext | undefined>(undefined)

interface Props {
  children: ReactNode
}

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<Config | null>(null)
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
