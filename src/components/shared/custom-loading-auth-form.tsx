import { Card, Skeleton } from '@heroui/react'

const CustomLoadingAuthForm = () => {
  return (
    <div className='flex h-full w-[90%] flex-col items-center justify-center'>
      <Card className='flex w-full max-w-[500px] flex-col rounded-lg bg-transparent p-8'>
        <Skeleton className='mb-4 flex justify-center rounded-lg bg-gray-800'>
          <div className='h-[60px] w-[150px] rounded-lg bg-default-300' />
        </Skeleton>
        <Skeleton className='mb-4 flex justify-center rounded-lg bg-gray-800'>
          <div className='h-[60px] w-[150px] rounded-lg bg-default-300' />
        </Skeleton>
        <Skeleton className='mb-4 flex justify-center rounded-lg bg-gray-800'>
          <div className='h-[60px] w-[150px] rounded-lg bg-default-300' />
        </Skeleton>
        <Skeleton className='mb-4 flex justify-center rounded-lg bg-gray-800'>
          <div className='h-[60px] w-[150px] rounded-lg bg-default-300' />
        </Skeleton>
      </Card>
    </div>
  )
}

export default CustomLoadingAuthForm
