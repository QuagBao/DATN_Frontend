import { Skeleton } from '@heroui/react'

const DonationSkeleton = () => {
  return (
    <div className='grid grid-cols-1 gap-5 px-5 py-10 md:px-40 lg:grid-cols-[2fr_1fr]'>
      <Skeleton className='h-full w-full' />
      <Skeleton className='h-full w-full' />
    </div>
  )
}

export default DonationSkeleton
