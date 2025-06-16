import { Skeleton } from '@heroui/react'

const DonationSkeleton = () => {
  return (
    <div className='grid grid-cols-1 gap-5 px-5 py-10 md:px-40 lg:grid-cols-[2fr_1fr]'>
      <Skeleton className='h-[481px] w-[280px] md:h-[509px] md:w-[448px] lg:h-[1072px] lg:w-[456px] xl:h-[632px] xl:w-[733px]' />
      <Skeleton className='h-[824px] w-[280px] md:h-[509px] md:w-[448px] lg:h-[1072px] lg:w-[456px] xl:h-[632px] xl:w-[733px]' />
    </div>
  )
}

export default DonationSkeleton
