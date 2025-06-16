'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { addToast, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import Ellipsis from '@icons/ellipsis-vertical.svg'
import Eye from '@icons/eye.svg'
import Pencil from '@icons/pencil.svg'
import Trash from '@icons/trash.svg'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'

import { projectApiRequest } from '~/api-requests'
import ConfirmModal from '~/components/shared/confirm-modal'
import CustomTable from '~/components/shared/custom-table'
import { useResourceContext } from '~/components/shared/resource-provider'
import reactI18n from '~/config/i18n/react-i18n'
import { API_URL } from '~/config/routes'
import { PROJECT_STATUS } from '~/shared/constants/project'
import { formatCurrency, handleApiEntityError } from '~/shared/utils'
import { type TPaginationResponse, type TProjectBaseSchema, type TProjectsManagementRes } from '~/shared/validators'

import ModalCreateEditProject from './modal-create-edit-project'
import ModalDetailProject from './modal-detail-project'

interface ProjectManagementTableProps {
  data: TProjectsManagementRes
  paginationResponse: TPaginationResponse | undefined
}

const ProjectManagementTable: React.FC<ProjectManagementTableProps> = ({ data, paginationResponse }) => {
  const { t, i18n } = useTranslation('management-projects', { i18n: reactI18n })

  const { selectedKeys, setSelectedKeys } = useResourceContext<TProjectBaseSchema>()

  const columns = [
    { name: t('fieldProject'), uid: 'name_project' },
    { name: t('fieldStartDate'), uid: 'start_date' },
    { name: t('fieldEndDate'), uid: 'end_date' },
    { name: t('fieldTotalNumeric'), uid: 'total_numeric' },
    { name: t('fieldCurrentNumeric'), uid: 'current_numeric' },
    { name: t('fieldStatus'), uid: 'status' },
    { name: t('fieldAction'), uid: 'actions' }
  ]

  // Local state for modals and selected project
  const [isProjectDetailModalOpen, setIsProjectDetailModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<TProjectBaseSchema | null>(null)

  const openProjectDetailModal = (project: TProjectBaseSchema) => {
    setSelectedProject(project)
    setIsProjectDetailModalOpen(true)
  }

  const openProjectEditModal = (project: TProjectBaseSchema) => {
    setSelectedProject(project)
    setIsEditModalOpen(true)
  }

  const openProjectDeleteModal = (project: TProjectBaseSchema) => {
    setSelectedProject(project)
    setIsDeleteModalOpen(true)
  }

  const closeProjectEditModal = () => {
    setIsEditModalOpen(false)
    setSelectedProject(null)
  }

  const closeProjectDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setSelectedProject(null)
  }

  const closeProjectDetailModal = () => {
    setIsProjectDetailModalOpen(false)
  }

  const renderCell = (project: TProjectBaseSchema, columnKey: string): React.ReactNode => {
    const cellValue = project[columnKey as keyof TProjectBaseSchema]

    const renderDate = (date: string) => format(parseISO(date), 'dd/MM/yyyy')
    switch (columnKey) {
      case 'start_date':
        return renderDate(cellValue as string)
      case 'end_date':
        return renderDate(cellValue as string)
      case 'total_numeric':
        return formatCurrency(cellValue as number)
      case 'current_numeric':
        return formatCurrency(cellValue as number)
      case 'status':
        return (
          <Chip
            color={
              PROJECT_STATUS[cellValue as string].color as
                | 'default'
                | 'primary'
                | 'secondary'
                | 'success'
                | 'warning'
                | 'danger'
                | undefined
            }
          >
            {t(PROJECT_STATUS[cellValue as string].label)}
          </Chip>
        )
      case 'actions':
        return (
          <Dropdown radius='sm'>
            <DropdownTrigger>
              <Button isIconOnly radius='full' variant='light'>
                <Ellipsis />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                classNames={{ title: 'text-ct-blue' }}
                key={t('detailProject')}
                startContent={<Eye className='size-4 text-ct-blue' />}
                onPress={() => openProjectDetailModal(project)}
              >
                {t('detailProject')}
              </DropdownItem>
              <DropdownItem
                classNames={{ title: 'text-ct-blue' }}
                key={t('editProject')}
                startContent={<Pencil className='size-4 text-ct-blue' />}
                onPress={() => openProjectEditModal(project)}
              >
                {t('editProject')}
              </DropdownItem>
              <DropdownItem
                classNames={{ title: 'text-ct-blue' }}
                key={t('deleteProject')}
                startContent={<Trash className='size-4 text-ct-blue' />}
                onPress={() => openProjectDeleteModal(project)}
              >
                {t('deleteProject')}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )
      default:
        return cellValue as string
    }
  }

  const queryClient = useQueryClient()
  // API mutation for delete project
  const { mutate } = useMutation({
    mutationFn: async (nameProject: string) => projectApiRequest.deleteProject(nameProject),
    onSuccess: (response: { data: { message: string } }) => {
      addToast({
        color: 'success',
        title: t('success'),
        description: response.data.message
      })
      closeProjectDeleteModal()
      queryClient.invalidateQueries({ queryKey: [API_URL.PROJECT.ALL_PROJECT], exact: false })
    },
    onError: (error) => {
      handleApiEntityError({ error })
    }
  })

  return (
    <>
      <CustomTable
        hideTopContent
        hideSelectedItems
        selectionMode='single'
        tableKey={i18n.language}
        language={i18n.language}
        columns={columns}
        setSelectedKeysArray={setSelectedKeys}
        externalSelectedKeys={selectedKeys}
        data={data.map((item) => ({ ...item, id: item.id_project }))}
        renderCell={renderCell}
        paginationResponse={paginationResponse}
      />
      {selectedProject && isProjectDetailModalOpen && (
        <ModalDetailProject
          isOpen={isProjectDetailModalOpen}
          onClose={closeProjectDetailModal}
          projectDetail={selectedProject}
        />
      )}
      {selectedProject && isEditModalOpen && (
        <ModalCreateEditProject
          isOpen={isEditModalOpen}
          onClose={closeProjectEditModal}
          projectEdit={selectedProject}
          isCreateModal={false}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmModal
          modalHeader={t('deleteProject')}
          modalBody={t('modalDeleteSelectedMessage')}
          confirmButtonText={t('confirm')}
          cancelButtonText={t('cancel')}
          isOpen={isDeleteModalOpen}
          onClose={closeProjectDeleteModal}
          onConfirm={() => {
            if (!selectedProject) return
            mutate(selectedProject.name_project)
          }}
        />
      )}
    </>
  )
}

export default ProjectManagementTable
