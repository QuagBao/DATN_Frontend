'use client'

import { Skeleton } from '@heroui/react'

interface TableSkeletonProps {
  hasHeader?: boolean
  hasFooter?: boolean
  className?: string
}

const TableSkeleton = ({ hasHeader = true, hasFooter = true, className = '' }: TableSkeletonProps) => {
  return (
    <div className={`w-full space-y-4 ${className}`} role='region' aria-label='Loading content'>
      <div className='sr-only'>Loading table data, please wait.</div>

      {hasHeader && (
        <div className='flex items-center justify-between'>
          <Skeleton className='h-10 w-44 rounded-lg' />
          <div className='flex gap-2'>
            <Skeleton className='h-10 w-32 rounded-lg' />
          </div>
        </div>
      )}

      {/* Table body with rows and columns */}
      <div className='space-y-2'>
        {/* Table */}
        <Skeleton key='body' className='body h-96 rounded-lg' />
      </div>

      {hasFooter && (
        <div className='mt-4 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-8 w-40 rounded-lg' />
          </div>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-8 w-32 rounded-lg' />
          </div>
        </div>
      )}
    </div>
  )
}

export default TableSkeleton
