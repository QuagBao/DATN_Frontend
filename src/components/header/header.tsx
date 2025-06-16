'use client'

import { Button } from '@heroui/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import { APP_ROUTES } from '~/config/routes'

import PopoverAvatar from '../shared/popover'

const HeaderTopBar = dynamic(() => import('~/components/shared/header-topbar'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function Header() {
  return (
    <div className='sticky left-0 right-0 top-0 z-40 mx-auto flex items-center justify-between bg-layout px-5 py-2 shadow-md md:px-20'>
      <div className='flex items-center gap-5'>
        <Button
          className='flex h-fit cursor-pointer items-center gap-2 bg-transparent p-2'
          as={Link}
          href={APP_ROUTES.COMMON.ROOT}
        >
          <div className='flex items-center justify-center gap-3'>
            <Image
              src='/assets/images/logo_dhbk.jpg'
              alt='logo'
              className='h-5 w-5 rounded-sm md:h-12 md:w-12'
              width={60}
              height={0}
            />
            <Image
              src='/assets/images/logo_50_nam.png'
              alt='logo'
              className='h-5 w-5 rounded-sm md:h-12 md:w-12'
              width={60}
              height={0}
            />
            <Image
              src='/assets/images/logo_doan.png'
              alt='logo'
              className='h-5 w-5 rounded-sm md:h-12 md:w-12'
              width={60}
              height={0}
            />
            <Image
              src='/assets/images/logo_hoi_sv.png'
              alt='logo'
              className='h-5 w-5 rounded-sm md:h-12 md:w-12'
              width={60}
              height={0}
            />
          </div>
          <span className='text-sm font-bold text-ct-blue md:text-base '>BK Hope</span>
        </Button>
        <HeaderTopBar />
      </div>
      <div className='flex items-center gap-3'>
        <Button as={Link} href={APP_ROUTES.COMMON.DONATION} color='primary'>
          Ủng hộ
        </Button>
        <PopoverAvatar />
      </div>
    </div>
  )
}
