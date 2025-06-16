import type React from 'react'
import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  addToast,
  Button,
  Chip,
  type ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@heroui/react'
import ApproveUser from '@icons/approve-user.svg'
import Ban from '@icons/ban.svg'
import Ellipsis from '@icons/ellipsis-vertical.svg'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import dynamic from 'next/dynamic'

import { userApiRequest } from '~/api-requests'
import ConfirmModal from '~/components/shared/confirm-modal'
import { useResourceContext } from '~/components/shared/resource-provider'
import reactI18n from '~/config/i18n/react-i18n'
import { API_URL } from '~/config/routes'
import { EUserStatus } from '~/shared/enums'
import { handleApiEntityError } from '~/shared/utils'
import type { TPaginationResponse, TUserManagementRes } from '~/shared/validators'

const CustomTable = dynamic(() => import('~/components/shared/custom-table'), { ssr: false })
interface UsersManagementTableProps {
  data: TUserManagementRes[]
  paginationResponse?: TPaginationResponse
}

const UsersManagementTable: React.FC<UsersManagementTableProps> = ({ data, paginationResponse }) => {
  const { t, i18n } = useTranslation('users', { i18n: reactI18n })
  const { selectedKeys, setSelectedKeys } = useResourceContext<TUserManagementRes>()

  const columns = [
    { name: t('fieldFullName'), uid: 'full_name' },
    { name: t('fieldEmail'), uid: 'email' },
    { name: t('fieldPhone'), uid: 'phone' },
    { name: t('fieldJoinDate'), uid: 'created_at' },
    { name: t('fieldStatus'), uid: 'status' },
    { name: t('fieldActions'), uid: 'actions' }
  ]

  const statusOptions: {
    uid: string
    name: string
    color: ChipProps['color']
  }[] = [
    { uid: 'pending', name: t(EUserStatus[EUserStatus.pending]), color: 'secondary' },
    { uid: 'active', name: t(EUserStatus[EUserStatus.active]), color: 'success' },
    { uid: 'blocked', name: t(EUserStatus[EUserStatus.blocked]), color: 'warning' }
  ]

  const [selectedUser, setSelectedUser] = useState<TUserManagementRes | null>(null)
  const [isBanModalOpen, setIsBanModalOpen] = useState(false)
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false)

  const queryClient = useQueryClient()

  const openBanModal = (user: TUserManagementRes) => {
    setSelectedUser(user)
    setIsBanModalOpen(true)
  }

  const closeBanModal = () => {
    setIsBanModalOpen(false)
  }

  const openUnlockModal = (user: TUserManagementRes) => {
    setSelectedUser(user)
    setIsUnlockModalOpen(true)
  }

  const closeUnlockModal = () => {
    setIsUnlockModalOpen(false)
  }

  const { mutate: mutateBanUser, isPending: isBanLoading } = useMutation({
    mutationFn: async (userId: string) => userApiRequest.banUser(userId),
    onSuccess: async (response: { data: { message: string } }) => {
      addToast({
        color: 'success',
        title: t('success'),
        description: response.data.message
      })
      closeBanModal()
      await queryClient.invalidateQueries({ queryKey: [API_URL.USER.GET_ALL], exact: false })
    },
    onError: (error: unknown) => {
      handleApiEntityError({ error })
    }
  })

  const { mutate: mutateUnlockUser, isPending: isUnlockedLoading } = useMutation({
    mutationFn: async (userId: string) => userApiRequest.unlockUser(userId),
    onSuccess: async (response: { data: { message: string } }) => {
      addToast({
        color: 'success',
        title: t('success'),
        description: response.data.message
      })
      closeUnlockModal()
      await queryClient.invalidateQueries({ queryKey: [API_URL.USER.GET_ALL], exact: false })
    },
    onError: (error: unknown) => {
      handleApiEntityError({ error })
    }
  })

  const renderCell = (item: { id: string | number }, columnKey: string): React.ReactNode => {
    const user = item as unknown as TUserManagementRes
    const cellValue = user[columnKey as keyof TUserManagementRes]

    const renderStatus = (status: EUserStatus) => {
      const statusOption = statusOptions.find((option) => option.uid === String(status))
      return (
        <Chip color={statusOption?.color || 'default'} className='uppercase' size='sm'>
          {statusOption?.name || 'Unknown'}
        </Chip>
      )
    }

    const renderDate = (date: string) => format(parseISO(date), 'dd/MM/yyyy')

    switch (columnKey) {
      case 'created_at':
        return renderDate(cellValue as string)
      case 'status':
        return renderStatus(user.status as EUserStatus)
      case 'actions':
        return (
          <Dropdown radius='sm'>
            <DropdownTrigger>
              <Button isIconOnly radius='full' variant='light'>
                <Ellipsis />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {user.status === EUserStatus[EUserStatus.active] ? (
                <DropdownItem
                  classNames={{ title: 'text-ct-blue' }}
                  key={t('banUser')}
                  startContent={<Ban className='size-4 text-ct-blue' />}
                  onPress={() => openBanModal(user)}
                >
                  {t('banUser')}
                </DropdownItem>
              ) : null}

              {user.status === EUserStatus[EUserStatus.blocked] ? (
                <DropdownItem
                  classNames={{ title: 'text-ct-blue' }}
                  key={t('approveUser')}
                  startContent={<ApproveUser className='size-4 text-ct-blue' />}
                  onPress={() => openUnlockModal(user)}
                >
                  {t('approveUser')}
                </DropdownItem>
              ) : null}
            </DropdownMenu>
          </Dropdown>
        )
      default:
        return cellValue as string
    }
  }

  return (
    <>
      <CustomTable
        hideTopContent
        hideSelectedItems
        selectionMode='none'
        tableKey={i18n.language}
        language={i18n.language}
        columns={columns}
        data={data.map((user) => ({ ...user, id: user.id_account }))}
        renderCell={renderCell}
        paginationResponse={paginationResponse}
        setSelectedKeysArray={setSelectedKeys}
        externalSelectedKeys={selectedKeys}
      />
      {isBanModalOpen && (
        <ConfirmModal
          modalHeader={t('modalBanUsers')}
          modalBody={t('modalBanSelectedMessage')}
          confirmButtonText={t('confirm')}
          cancelButtonText={t('cancel')}
          isOpen={isBanModalOpen}
          onClose={closeBanModal}
          onConfirm={() => {
            if (!selectedUser) return
            mutateBanUser(selectedUser.id_account)
          }}
          isLoading={isBanLoading}
          isDisabled={isBanLoading}
        />
      )}

      {isUnlockModalOpen && (
        <ConfirmModal
          modalHeader={t('modalUnlockUsers')}
          modalBody={t('modalUnlockSelectedMessage')}
          confirmButtonText={t('confirm')}
          cancelButtonText={t('cancel')}
          isOpen={isUnlockModalOpen}
          onClose={closeUnlockModal}
          onConfirm={() => {
            if (!selectedUser) return
            mutateUnlockUser(selectedUser.id_account)
          }}
          isLoading={isUnlockedLoading}
          isDisabled={isUnlockedLoading}
        />
      )}
    </>
  )
}

export default memo(UsersManagementTable)
