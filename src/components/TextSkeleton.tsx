import { type FC } from 'react'
import { Skeleton } from './ui/skeleton'

const TextSkeleton: FC = () => {
  return (
    <>
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-full h-4 mb-2" />
    </>
  )
}

export default TextSkeleton
