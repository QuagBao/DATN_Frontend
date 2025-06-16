import { Skeleton } from '@heroui/react'

function ProjectSkeleton() {
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
      <div className='flex flex-col items-center gap-3 md:py-14'>
        <Skeleton className='h-[32px] w-[130px] rounded-lg' />
        <Skeleton className='h-[28px] w-[148px] rounded-lg' />
        <div className='flex w-full flex-col gap-10'>
          {Array.from({ length: 6 }).map(() => (
            <Skeleton className='h-[650px] w-[374px] md:h-[812px] md:w-[512px] lg:h-[577px] lg:w-[704px] xl:w-full' />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectSkeleton
