import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractId = (url: string): number => {
  const id = url.split('/').filter(Boolean).pop()
  return Number(id)
}

export const getStorageKey = (id: number) => `person-${id}`
