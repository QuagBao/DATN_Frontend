'use client'

import { useState } from 'react'
import { addToast, Avatar, Button, Divider, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
// import DocumentText from '@icons/document-text.svg'
import LockIcon from '@icons/lock-closed-outline.svg'
import Logout from '@icons/logout-icon.svg'
import Profile from '@icons/profile.svg'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { authApiRequest } from '~/api-requests'
import { useAuth } from '~/config/providers'
import { APP_ROUTES } from '~/config/routes'

const PopoverAvatar = () => {
  const { userInfo, logout } = useAuth()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const logoutNextServerMutation = useMutation({
    mutationFn: () => authApiRequest.logoutNextServer()
  })

  const handleLogout = async (): Promise<void> => {
    const res = await logoutNextServerMutation.mutateAsync()
    logout()
    queryClient.clear()
    addToast({
      color: 'success',
      description: res.data.message
    })
    router.push(APP_ROUTES.AUTH.LOGIN)
  }

  return (
    <Popover placement='bottom' radius='sm' isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger>
        <Avatar color='primary' name={userInfo?.full_name ?? undefined} className='cursor-pointer' />
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex gap-2 px-3 py-[10px]'>
          <Avatar color='primary' name={userInfo?.full_name ?? undefined} />
          <div>
            <p className='text-ct-blue'>{userInfo?.full_name}</p>
            <p className='text-xs text-ct-blue'>{userInfo?.email}</p>
          </div>
        </div>
        <Divider />
        <div className='my-2 flex w-full flex-col gap-1'>
          {/* <Button
            as={Link}
            href={APP_ROUTES.COMMON.PROFILE}
            className='flex justify-start bg-transparent text-ct-blue hover:!bg-slate-200 hover:!opacity-100'
            startContent={<Profile className='size-5' />}
          >
            <p className='ml-1 text-sm'>Hồ sơ cá nhân</p>
          </Button> */}
          <Button
            as={Link}
            href={APP_ROUTES.COMMON.CHANGE_PASSWORD}
            className='flex justify-start bg-transparent text-ct-blue hover:!bg-slate-200 hover:!opacity-100'
            startContent={<LockIcon className='size-6' />}
          >
            <p className='text-sm '>Đổi mật khẩu</p>
          </Button>
          {/* <Button
            as={Link}
            href={APP_ROUTES.COMMON_RESOURCES.SETTINGS.PROFILE}
            className='flex justify-start bg-transparent text-ct-blue hover:!bg-slate-200 hover:!opacity-100'
            startContent={<DocumentText className='size-5' />}
          >
            <p className='ml-1 text-sm'>Lịch sử hoạt động</p>
          </Button> */}
          <Button
            className='flex justify-start bg-transparent text-ct-blue hover:!bg-slate-200 hover:!opacity-100'
            onPress={handleLogout}
            startContent={<Logout className='ml-[3px] size-5' />}
          >
            <p className='text-sm '>Đăng xuất</p>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverAvatar
