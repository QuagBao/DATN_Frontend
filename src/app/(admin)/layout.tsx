import { Card, CardBody, Skeleton } from '@heroui/react'
import dynamic from 'next/dynamic'

import CustomLoadingSidebarSkeleton from '~/components/shared/custom-loading-sidebar-skeleton'

const MainSidebar = dynamic(() => import('~/components/shared/main-sidebar'), {
  ssr: false,
  loading: () => <CustomLoadingSidebarSkeleton />
})

const CustomHeaderAdmin = dynamic(() => import('~/components/shared/custom-header-admin'), {
  ssr: false,
  loading: () => (
    <div className='flex items-center bg-content1 px-4 py-2'>
      <Skeleton className='h-10 w-full rounded-md' />
    </div>
  )
})
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex min-h-screen w-full'>
      <div className='sticky bottom-0 left-0 top-0 z-50 h-screen'>
        <MainSidebar />
      </div>
      <div className='w-[calc(100vw-250px)] grow bg-default-100'>
        <CustomHeaderAdmin />
        <div className='m-3 flex min-h-[calc(100vh-56px-32px)] flex-col'>
          <Card radius='sm' className='grow'>
            <CardBody className='px-7'>{children}</CardBody>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default Layout
