import { Skeleton } from '@heroui/skeleton'

const IntroduceSkeleton = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <Skeleton className='h-[560px] w-full md:h-[424px] xl:h-96' />
      <div className='flex flex-col items-center justify-center gap-5 px-5 py-10 md:px-40'>
        <Skeleton className='h-[72px] w-72 rounded-lg md:h-[36px] lg:h-9' />
        <Skeleton className='h-[72px] w-[280px] rounded-lg md:h-[48px] md:w-[448px] lg:h-12 lg:w-[717px] xl:h-6' />
        <div className='grid w-full max-w-[1440px] grid-cols-1 items-center justify-center justify-items-center gap-5 lg:grid-cols-3'>
          <Skeleton className='mt-4 h-[280px]  w-full max-w-[350px] rounded-lg md:h-[232px] lg:h-[388px] xl:h-[256px] ' />
          <Skeleton className='mt-4 h-[280px]  w-full max-w-[350px] rounded-lg md:h-[232px] lg:h-[388px] xl:h-[256px] ' />
          <Skeleton className='mt-4 h-[280px]  w-full max-w-[350px] rounded-lg md:h-[232px] lg:h-[388px] xl:h-[256px] ' />
        </div>
      </div>
    </div>
  )
}

export default IntroduceSkeleton
