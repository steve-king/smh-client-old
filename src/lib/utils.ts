import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const suToTiB = (su: number): number => su / 16

export const suToBytes = (su: number): number => {
  const TiB = suToTiB(su)
  const bytesPerTiB = 1024 * 1024 * 1024 * 1024
  const bytes = TiB * bytesPerTiB
  return bytes
}
