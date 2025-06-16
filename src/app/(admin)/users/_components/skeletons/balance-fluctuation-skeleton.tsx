import { Skeleton } from '@heroui/react'

const BalanceFluctuationSkeleton = () => {
  return (
    <div className='space-y-4'>
      {/* Table rows */}
      <div className='space-y-2'>
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className='grid grid-cols-8 gap-2'>
            {Array.from({ length: 8 }, (__, colIndex) => (
              <Skeleton key={colIndex} className='h-12 rounded-lg' />
            ))}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='mt-4 flex justify-center'>
        <Skeleton className='h-10 w-48 rounded-lg' />
      </div>
    </div>
  )
}

export default BalanceFluctuationSkeleton
