import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { type AxiosResponse } from 'axios'
import { Crimson } from 'public/assets/fonts/crimson'

import donorApiRequest from '~/api-requests/donor.request'
import CustomInfiniteScrollSelect from '~/components/shared/custom-infinite-scroll-select'
import { handleApiEntityError } from '~/shared/utils'

interface ExportModalDonorsProps {
  isOpen: boolean
  onClose: () => void
}

interface FormValues {
  projectId: string
  nameProject: string
}

const ExportModalDonors = ({ isOpen, onClose }: ExportModalDonorsProps) => {
  const { t } = useTranslation('management-donors')
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError
  } = useForm<FormValues>({
    defaultValues: { projectId: '', nameProject: '' }
  })

  const selectedProjectId = watch('projectId')
  const selectedProject = watch('nameProject')

  const { mutate, isPending } = useMutation({
    mutationFn: async (projectId: string) => donorApiRequest.exportDonors(projectId),
    onSuccess: (response: AxiosResponse<Blob>) => {
      const blob = new Blob([response.data], { type: 'text/csv; charset=utf-8' })

      const safeName = selectedProject ? selectedProject.replace(/\s+/g, '_') : 'download'
      const filename = `DS_Ủng_hộ_chương_trinh_${safeName}.csv`

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)

      addToast({
        color: 'success',
        title: t('success'),
        description: 'Xuất danh sách ủng hộ thành công'
      })
    },
    onError: (error) => {
      handleApiEntityError({ error, setError })
    }
  })

  const onSubmit = (data: FormValues) => {
    mutate(data.projectId)
  }

  return (
    <Modal
      placement='center'
      size='md'
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: 'bg-ct-white',
        header: `${Crimson.className} text-2xl font-semibold justify-center text-ct-blue`,
        body: 'h-[250px] gap-2'
      }}
    >
      <ModalContent>
        <ModalHeader>Xuất danh sách ủng hộ</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <p className={`${Crimson.className} text-ct-blue`}>Chương trình:</p>
            <CustomInfiniteScrollSelect
              register={register('projectId', { required: 'Vui lòng chọn dự án' })}
              validationErrorMessage={errors.projectId?.message}
              placeholder='Chọn dự án'
              selectedId={selectedProjectId}
              onSelect={(opt) => {
                setValue('projectId', opt.id, { shouldValidate: true })
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant='bordered' color='danger' onPress={onClose}>
              Hủy
            </Button>
            <Button color='primary' type='submit' isLoading={isPending} isDisabled={isPending}>
              Xuất
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ExportModalDonors
