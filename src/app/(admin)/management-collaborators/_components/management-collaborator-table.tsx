'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { addToast, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import ApproveUser from '@icons/approve-user.svg'
import Ban from '@icons/ban.svg'
import Ellipsis from '@icons/ellipsis-vertical.svg'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'

import { collaboratorApiRequest } from '~/api-requests'
import ConfirmModal from '~/components/shared/confirm-modal'
import CustomTable from '~/components/shared/custom-table'
import { useResourceContext } from '~/components/shared/resource-provider'
import reactI18n from '~/config/i18n/react-i18n'
import { API_URL } from '~/config/routes'
import { COLLABORATOR_STATUS } from '~/shared/constants/collaborator.constant'
import { handleApiEntityError } from '~/shared/utils'
import { type TCollaboratorBaseSchema, type TCollaboratorsSchema, type TPaginationResponse } from '~/shared/validators'

interface ManagementCollaboratorTableProps {
  data: TCollaboratorsSchema
  paginationResponse: TPaginationResponse | undefined
}

const ManagementCollaboratorTable: React.FC<ManagementCollaboratorTableProps> = ({ data, paginationResponse }) => {
  const { t, i18n } = useTranslation('management-collaborators', { i18n: reactI18n })

  const { selectedKeys, setSelectedKeys } = useResourceContext<TCollaboratorBaseSchema>()

  const columns = [
    { name: t('fieldAccountName'), uid: 'account_name' },
    { name: t('fieldProject'), uid: 'project_name' },
    { name: t('fieldEmail'), uid: 'email' },
    { name: t('fieldPhone'), uid: 'phone' },
    { name: t('fieldAppliedAt'), uid: 'applied_at' },
    { name: t('fieldStatus'), uid: 'status' },
    { name: t('fieldActions'), uid: 'actions' }
  ]

  // Local state for modals and selected user
  const [selectedCollaborator, setSelectedCollaborator] = useState<TCollaboratorBaseSchema | null>(null)
  const [isApproveCollaborator, setIsApproveCollaborator] = useState(false)
  const [isDeleteCollaborator, setIsDeleteCollaborator] = useState(false)

  const queryClient = useQueryClient()

  const handleOpenApproveModal = (collaborator: TCollaboratorBaseSchema) => {
    setSelectedCollaborator(collaborator)
    setIsApproveCollaborator(true)
  }

  const handleCloseApproveModal = () => {
    setIsApproveCollaborator(false)
  }

  const handleOpenDeleteModal = (collaborator: TCollaboratorBaseSchema) => {
    setSelectedCollaborator(collaborator)
    setIsDeleteCollaborator(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteCollaborator(false)
  }

  const { mutate: approveCollaborator, isPending: isApproveLoading } = useMutation({
    mutationFn: async (userId: string) => collaboratorApiRequest.approveCollaborator(userId),
    onSuccess: (response: { data: { message?: string }; statusText: string }) => {
      addToast({
        color: 'success',
        title: t('success'),
        description: response.data.message || response.statusText
      })
      handleCloseApproveModal()
      queryClient.invalidateQueries({ queryKey: [API_URL.PROJECT.GET_COLLABORATORS], exact: false })
    },
    onError: (error) => {
      handleApiEntityError({ error })
    }
  })

  const { mutate: deleteCollaborator, isPending: isDeleteLoading } = useMutation({
    mutationFn: async (userId: string) => collaboratorApiRequest.deleteCollaborator(userId),
    onSuccess: (response: { data: { message?: string }; statusText: string }) => {
      addToast({
        color: 'success',
        title: t('success'),
        description: response.data.message || response.statusText
      })
      handleCloseApproveModal()
      queryClient.invalidateQueries({ queryKey: [API_URL.PROJECT.GET_COLLABORATORS], exact: false })
    },
    onError: (error) => {
      handleApiEntityError({ error })
    }
  })

  const renderCell = (collaborator: TCollaboratorBaseSchema, columnKey: string): React.ReactNode => {
    const cellValue = collaborator[columnKey as keyof TCollaboratorBaseSchema]

    const renderDate = (date: string) => format(parseISO(date), 'dd/MM/yyyy')
    switch (columnKey) {
      case 'applied_at':
        return typeof cellValue === 'string' ? renderDate(cellValue) : null
      case 'status':
        return typeof cellValue === 'string' && cellValue in COLLABORATOR_STATUS ? (
          <Chip
            color={
              (COLLABORATOR_STATUS[cellValue].color as
                | 'default'
                | 'primary'
                | 'secondary'
                | 'success'
                | 'warning'
                | 'danger'
                | undefined) || 'default'
            }
          >
            {t(COLLABORATOR_STATUS[cellValue].label)}
          </Chip>
        ) : null
      case 'actions':
        return (
          <Dropdown radius='sm' className='dark:bg-base-frame'>
            <DropdownTrigger>
              <Button isIconOnly radius='full' size='sm' variant='light'>
                <Ellipsis className='size-6 text-ct-primary' />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <>
                {collaborator.status === 'pending' ? (
                  <DropdownItem
                    classNames={{ title: 'text-ct-blue' }}
                    key={t('approveCollaborator')}
                    startContent={<ApproveUser className='size-4 text-ct-blue' />}
                    onPress={() => handleOpenApproveModal(collaborator)}
                  >
                    {t('approveCollaborator')}
                  </DropdownItem>
                ) : null}

                <DropdownItem
                  classNames={{ title: 'text-ct-blue' }}
                  key={t('deleteCollaborator')}
                  startContent={<Ban className='size-4 text-ct-blue' />}
                  onPress={() => handleOpenDeleteModal(collaborator)}
                >
                  {t('deleteCollaborator')}
                </DropdownItem>
              </>
            </DropdownMenu>
          </Dropdown>
        )
      default:
        return cellValue ?? null
    }
  }

  return (
    <>
      <CustomTable
        hideSelectedItems
        selectionMode='single'
        tableKey={i18n.language}
        language={i18n.language}
        columns={columns}
        setSelectedKeysArray={setSelectedKeys}
        externalSelectedKeys={selectedKeys}
        data={data}
        renderCell={renderCell}
        paginationResponse={paginationResponse}
      />
      {isApproveCollaborator && (
        <ConfirmModal
          modalHeader={t('modalApproveCollaborator')}
          modalBody={t('modalApproveCollaboratorMessage')}
          confirmButtonText={t('confirm')}
          cancelButtonText={t('cancel')}
          isOpen={isApproveCollaborator}
          onClose={handleCloseApproveModal}
          onConfirm={() => {
            if (!selectedCollaborator) return
            approveCollaborator(selectedCollaborator.id_collaborator)
          }}
          isLoading={isApproveLoading}
          isDisabled={isApproveLoading}
        />
      )}
      {isDeleteCollaborator && (
        <ConfirmModal
          modalHeader={t('modalDeleteCollaborator')}
          modalBody={t('modalDeleteCollaboratorMessage')}
          confirmButtonText={t('confirm')}
          cancelButtonText={t('cancel')}
          isOpen={isDeleteCollaborator}
          onClose={handleCloseDeleteModal}
          onConfirm={() => {
            if (!selectedCollaborator) return
            deleteCollaborator(selectedCollaborator.id_collaborator)
          }}
          isLoading={isDeleteLoading}
          isDisabled={isDeleteLoading}
        />
      )}
    </>
  )
}

export default ManagementCollaboratorTable
