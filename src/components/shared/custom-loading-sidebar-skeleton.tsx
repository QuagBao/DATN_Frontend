import { Skeleton } from '@heroui/react'
import Image from 'next/image'

import { cn } from '~/shared/utils'

interface ICustomLoadingSidebarSkeletonProps {
  className?: string
}
const CustomLoadingSidebarSkeleton = ({ className }: ICustomLoadingSidebarSkeletonProps) => {
  return (
    <div
      className={cn('h-full w-[250px] border-r bg-content1 p-2 light:border-gray-200 dark:border-gray-700', className)}
    >
      <div className='mx-auto my-2 flex h-14 max-w-full items-center justify-center gap-1'>
        <Image src='/assets/images/logo.jpg' alt='logo' width={50} height={0} />
        <div className='text-center text-base font-bold text-ct-blue md:text-xl'>BK Hope</div>
      </div>

      <div className='mt-6 flex flex-col gap-2'>
        <Skeleton className='h-8 w-full rounded-lg' />
        <Skeleton className='h-8 w-full rounded-lg' />
        <Skeleton className='h-8 w-full rounded-lg' />
        <Skeleton className='h-8 w-full rounded-lg' />
      </div>
    </div>
  )
}

export default CustomLoadingSidebarSkeleton
