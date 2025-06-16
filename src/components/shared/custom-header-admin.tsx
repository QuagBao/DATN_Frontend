'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { addToast, Avatar, Divider, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import Logout from '@icons/logout-icon.svg'
import Profile from '@icons/profile.svg'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { authApiRequest } from '~/api-requests'
import { useAuth } from '~/config/providers/auth.provider'
import { APP_ROUTES } from '~/config/routes'

const CustomHeaderAdmin = () => {
  const router = useRouter()
  const { userInfo, logout } = useAuth()
  const { t } = useTranslation('custom-header-admin')
  const [isOpen, setIsOpen] = useState(false)
  const logoutNextServerMutation = useMutation({ mutationFn: () => authApiRequest.logoutNextServer() })

  const handleLogout = async (): Promise<void> => {
    setIsOpen(false)
    const res = await logoutNextServerMutation.mutateAsync()
    addToast({
      color: 'success',
      description: res.data.message
    })
    logout()
    router.push(APP_ROUTES.AUTH.LOGIN_ADMIN)
    router.refresh()
  }

  return (
    <div className='sticky top-0 z-50 flex items-center justify-end border-b bg-content1 px-4 py-2 light:border-gray-200 dark:border-gray-700'>
      <div className='flex items-center gap-4'>
        <Popover placement='bottom' isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <PopoverTrigger role='button'>
            <Avatar color='primary' className='cursor-pointer' />
          </PopoverTrigger>
          <PopoverContent className='min-w-[150px] rounded px-0'>
            <div className='flex gap-2 px-3 py-[10px]'>
              <Avatar color='primary' name={userInfo?.full_name ?? undefined} />
              <div>
                <p className='text-ct-blue'>{userInfo?.full_name}</p>
                <p className='text-xs text-ct-blue'>{userInfo?.email}</p>
              </div>
            </div>
            <Divider />
            <Listbox>
              <ListboxItem textValue='profile'>
                <Link
                  href={APP_ROUTES.COMMON_RESOURCES.SETTINGS.PROFILE}
                  passHref
                  className='flex gap-2'
                  onClick={() => setIsOpen(false)}
                >
                  <Profile className='size-5 text-ct-blue' />
                  <p className='text-ct-blue'>{t('profile')}</p>
                </Link>
              </ListboxItem>
              <ListboxItem textValue='logout'>
                <div role='button' className='flex gap-2' onClick={handleLogout}>
                  <Logout className='size-5 text-ct-blue' />
                  <p className='text-ct-blue'>{t('logout')}</p>
                </div>
              </ListboxItem>
            </Listbox>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default CustomHeaderAdmin
