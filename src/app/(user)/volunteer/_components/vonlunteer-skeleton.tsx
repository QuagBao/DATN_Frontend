import { Skeleton } from '@heroui/react'

import TableSkeleton from '~/components/shared/table-skeleton'

const VolunteerSkeleton = () => {
  return (
    <div className='my-2 space-y-6 px-5 py-5 md:px-40'>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-2 xl:grid-cols-3'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-5 w-24 rounded-lg' />
            <Skeleton className='h-10 w-full rounded-lg' />
          </div>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-5 w-24 rounded-lg' />
            <Skeleton className='h-10 w-full rounded-lg' />
          </div>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-5 w-24 rounded-lg' />
            <Skeleton className='h-10 w-full rounded-lg' />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='ml-auto flex items-center justify-end gap-2'>
            <Skeleton className='h-10 w-20 rounded-lg' />
            <Skeleton className='h-10 w-20 rounded-lg' />
          </div>
        </div>
      </div>
      <TableSkeleton hasHeader={false} />
    </div>
  )
}

export default VolunteerSkeleton
