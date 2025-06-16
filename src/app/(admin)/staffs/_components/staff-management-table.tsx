'use client'

import type React from 'react'
import { useState } from 'react'
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
import Ellipsis from '@icons/ellipsis-vertical.svg'
import Eye from '@icons/eye.svg'
import Trash from '@icons/trash.svg'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'

import staffApiRequest from '~/api-requests/staff.request'
import ConfirmModal from '~/components/shared/confirm-modal'
import CustomTable from '~/components/shared/custom-table'
import { useResourceContext } from '~/components/shared/resource-provider'
import reactI18n from '~/config/i18n/react-i18n'
import { useAuth } from '~/config/providers/auth.provider'
import { API_URL } from '~/config/routes'
import { EUserStatus } from '~/shared/enums'
import { handleApiEntityError } from '~/shared/utils'
import { type TPaginationResponse, type TUserManagementRes, type TUsersManagementRes } from '~/shared/validators'

import StaffDetailModal from './staff-detail-modal'

interface StaffsManagementTableProps {
  data: TUsersManagementRes
  paginationResponse: TPaginationResponse | undefined
}

const StaffsManagementTable: React.FC<StaffsManagementTableProps> = ({ data, paginationResponse }) => {
  const { t, i18n } = useTranslation('staffs', { i18n: reactI18n })

  const { selectedKeys, setSelectedKeys } = useResourceContext<TUserManagementRes>()

  // Auth context and permission checking
  const { actionPermissions } = useAuth()

  // const canUpdate = hasPermission(EResources[EResources.staffs], EPermissions.UPDATE, actionPermissions)
  // const canDelete = hasPermission(EResources[EResources.staffs], EPermissions.DELETE, actionPermissions)

  const columns = [
    { name: t('fieldFullName'), uid: 'full_name' },
    { name: t('fieldEmail'), uid: 'email' },
    { name: t('fieldPhone'), uid: 'phone' },
    { name: t('fieldJoinDate'), uid: 'created_at' },
    { name: t('fieldStatus'), uid: 'status' },
    { name: t('fieldActions'), uid: 'actions' }
  ]

  // Status options mapping for display
  const statusOptions: {
    uid: string
    name: string
    color: ChipProps['color']
  }[] = [
    { uid: 'pending', name: t(EUserStatus[EUserStatus.pending]), color: 'secondary' },
    { uid: 'active', name: t(EUserStatus[EUserStatus.active]), color: 'success' },
    { uid: 'warning', name: t(EUserStatus[EUserStatus.blocked]), color: 'warning' }
  ]

  // Local state for modals and selected user
  const [selectedStaff, setSelectedStaff] = useState<TUserManagementRes | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isStaffDetailModalOpen, setIsStaffDetailModalOpen] = useState(false)

  const queryClient = useQueryClient()

  // Handlers for opening/closing modals
  const openDeleteModal = (user: TUserManagementRes) => {
    setSelectedStaff(user)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const openStaffDetailModal = (user: TUserManagementRes) => {
    setSelectedStaff(user)
    setIsStaffDetailModalOpen(true)
  }

  const closeStaffDetailModal = () => {
    setIsStaffDetailModalOpen(false)
  }

  // API mutation for deleting a user
  const { mutate, isPending } = useMutation({
    mutationFn: async (userId: string) => staffApiRequest.deleteStaff(userId),
    onSuccess: (response: { data: { message?: string }; statusText: string }) => {
      addToast({
        color: 'success',
        title: t('success'),
        description: response.data.message || response.statusText
      })
      closeDeleteModal()
      queryClient.invalidateQueries({ queryKey: [API_URL.ADMIN.GET_STAFFS], exact: false })
    },
    onError: (error) => {
      handleApiEntityError({ error })
    }
  })

  // Render cell based on column key
  const renderCell = (user: TUserManagementRes, columnKey: string): React.ReactNode => {
    const cellValue = user[columnKey as keyof TUserManagementRes]
    switch (columnKey) {
      case 'created_at': {
        return format(parseISO(cellValue as string), 'dd/MM/yyyy')
      }
      case 'status': {
        const statusOption = statusOptions.find((status) => status.uid === String(user.status))
        const statusName = statusOption?.name ?? 'Unknown'
        const statusColor = statusOption?.color ?? 'default'

        return (
          <Chip color={statusColor} className='uppercase' size='sm'>
            {statusName}
          </Chip>
        )
      }
      case 'actions': {
        return (
          <Dropdown radius='sm' className='dark:bg-base-frame'>
            <DropdownTrigger>
              <Button isIconOnly radius='full' size='sm' variant='light'>
                <Ellipsis className='size-6 text-ct-primary' />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                classNames={{ title: 'text-ct-blue' }}
                key={t('detailStaff')}
                startContent={<Eye className='size-4 text-ct-blue' />}
                onPress={() => openStaffDetailModal(user)}
              >
                {t('detailStaff')}
              </DropdownItem>
              <DropdownItem
                classNames={{ title: 'text-ct-blue' }}
                key={t('deleteStaff')}
                startContent={<Trash className='size-4 text-ct-blue' />}
                onPress={() => openDeleteModal(user)}
              >
                {t('deleteStaff')}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )
      }
      default:
        return cellValue as string
    }
  }

  return (
    <>
      <CustomTable
        tableKey={JSON.stringify(actionPermissions).concat(i18n.language)}
        language={i18n.language}
        columns={columns}
        data={data.map((item) => ({ ...item, id: item.id_account }))}
        renderCell={renderCell}
        paginationResponse={
          paginationResponse
            ? {
                page: Number(paginationResponse.page),
                limit: Number(paginationResponse.limit),
                total_items: Number(paginationResponse.total_items),
                total_pages: Number(paginationResponse.total_pages)
              }
            : undefined
        }
        setSelectedKeysArray={setSelectedKeys}
        externalSelectedKeys={selectedKeys}
      />

      {isDeleteModalOpen && (
        <ConfirmModal
          modalHeader={t('modalDeleteUsers')}
          modalBody={t('modalDeleteSelectedMessage', { count: 1 })}
          confirmButtonText={t('confirm')}
          cancelButtonText={t('cancel')}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={() => {
            if (!selectedStaff) return
            mutate(selectedStaff.id_account)
          }}
          isLoading={isPending}
          isDisabled={isPending}
        />
      )}

      {selectedStaff && isStaffDetailModalOpen && (
        <StaffDetailModal isOpen={isStaffDetailModalOpen} onClose={closeStaffDetailModal} staffEdit={selectedStaff} />
      )}
    </>
  )
}

export default StaffsManagementTable
