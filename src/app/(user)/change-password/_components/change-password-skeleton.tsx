import { Skeleton } from '@heroui/skeleton'

const ChangePasswordSkeleton = () => {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-[48px] rounded-lg' />
      <Skeleton className='h-[48px] rounded-lg' />
      <Skeleton className='h-[48px] rounded-lg' />
    </div>
  )
}

export default ChangePasswordSkeleton
