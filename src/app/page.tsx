'use client'
import Image from 'next/image'
import { useSocket } from '@/lib/socket'
import { useStore } from '@/lib/store'

export default function Home() {
  useSocket()
  useStore()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  )
}
