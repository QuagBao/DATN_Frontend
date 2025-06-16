import { Card, CardBody, CardFooter, CardHeader, Skeleton } from '@heroui/react'
import Image from 'next/image'

const LoginSkeleton = () => {
  return (
    <div className='fixed inset-0 flex w-full items-center justify-center bg-default-100 py-20'>
      <div className='container mx-auto flex justify-center px-4'>
        <Card className='w-[500px] max-w-full p-4'>
          <CardHeader className='flex flex-col items-center justify-center gap-3'>
            <div className='grid grid-cols-2 items-center justify-center gap-5'>
              <Image src='/assets/images/logo_dhbk.jpg' alt='logo' width={60} height={0} />
              <Image src='/assets/images/logo_50_nam.png' alt='logo' width={60} height={0} />
              <Image src='/assets/images/logo_doan.png' alt='logo' width={60} height={0} />
              <Image src='/assets/images/logo_hoi_sv.png' alt='logo' width={60} height={0} />
            </div>
            <div className='text-center text-base font-bold text-ct-blue md:text-xl'>BK Hope</div>
            <Skeleton className='flex justify-center rounded-lg'>
              <div className='h-[24px] w-[222px] rounded-lg bg-default-300 md:h-[28px]' />
            </Skeleton>
          </CardHeader>
          <CardBody>
            <Skeleton className='h-[48px] rounded-lg bg-default-300 md:h-[56px]' />
            <Skeleton className='mt-3 h-[48px] rounded-lg bg-default-300 md:h-[56px]' />
            <Skeleton className='ml-auto mt-3 h-[20px] w-[110px] rounded-lg bg-default-300 md:h-[24px]' />
            <Skeleton className='mt-3 h-[40px] rounded-lg bg-default-300 md:h-[48px]' />
          </CardBody>
          <CardFooter>
            <Skeleton className='mx-auto h-[20px] w-[200px] rounded-lg bg-default-300 md:h-[24px]' />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default LoginSkeleton
