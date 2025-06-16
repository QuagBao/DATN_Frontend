import { Card, Skeleton } from '@heroui/react'

export const CustomLoadingSkeletonResources = () => (
  <>
    <div className='grid grid-cols-3 gap-5 py-5'>
      <Skeleton className='rounded-lg'>
        <div className='h-8 rounded-lg bg-default-300' />
      </Skeleton>
      <Skeleton className='rounded-lg'>
        <div className='h-8 rounded-lg bg-default-300' />
      </Skeleton>
      <Skeleton className='rounded-lg'>
        <div className='h-8 rounded-lg bg-default-300' />
      </Skeleton>
      <Skeleton className='rounded-lg'>
        <div className='h-8 rounded-lg bg-default-300' />
      </Skeleton>
      <Skeleton className='rounded-lg'>
        <div className='h-8 rounded-lg bg-default-300' />
      </Skeleton>
      <Skeleton className='rounded-lg'>
        <div className='h-8 rounded-lg bg-default-300' />
      </Skeleton>
    </div>
    <div className='relative flex w-full flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <Skeleton className='rounded-lg'>
          <div className='h-5 w-24 rounded-lg bg-default-300' />
        </Skeleton>
        <Skeleton className='rounded-lg'>
          <div className='h-5 w-24 rounded-lg bg-default-300' />
        </Skeleton>
      </div>
      <Card className='h-full w-full p-4' radius='sm'>
        <Skeleton className='mb-5 rounded-lg'>
          <div className='h-10 w-full rounded-lg bg-default-300' />
        </Skeleton>
        <Skeleton className='mb-5 rounded-lg'>
          <div className='h-[400px] w-full rounded-lg bg-default-300' />
        </Skeleton>
      </Card>
    </div>
  </>
)
