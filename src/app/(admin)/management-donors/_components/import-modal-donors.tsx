import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosResponse } from 'axios'
import { Crimson } from 'public/assets/fonts/crimson'

import donorApiRequest from '~/api-requests/donor.request'
import CustomInfiniteScrollSelect from '~/components/shared/custom-infinite-scroll-select'
import { API_URL } from '~/config/routes'
import { handleApiEntityError } from '~/shared/utils'

interface ImportModalDonorsProps {
  isOpen: boolean
  onClose: () => void
}

interface FormValues {
  projectId: string
  file: FileList | null
}

const ImportModalDonors = ({ isOpen, onClose }: ImportModalDonorsProps) => {
  const { t } = useTranslation('management-donors')
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError
  } = useForm<FormValues>({
    defaultValues: { projectId: '' }
  })

  const selectedProjectId = watch('projectId')
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ projectId, file }: { projectId: string; file: File }) =>
      donorApiRequest.importDonors(projectId, file),
    onSuccess: (response: AxiosResponse<{ message: string }>) => {
      addToast({
        color: 'success',
        title: t('success'),
        description: response.data.message
      })
      queryClient.invalidateQueries({ queryKey: [API_URL.PROJECT.GET_DONORS], exact: false })
      onClose()
    },
    onError: (error) => {
      handleApiEntityError({ error, setError })
    }
  })

  const onSubmit = (data: FormValues) => {
    const fileList = data.file
    if (!fileList || fileList.length === 0) {
      setError('file', { message: 'Vui lòng chọn tệp CSV' })
      return
    }
    const file = fileList[0]
    mutate({ projectId: data.projectId, file })
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
        <ModalHeader>Nhập danh sách ủng hộ</ModalHeader>
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

            <div className='mt-4 flex flex-col gap-1'>
              <p className={`${Crimson.className} text-ct-blue`}>File CSV:</p>
              <input
                type='file'
                accept='.csv'
                {...register('file', { required: 'Vui lòng chọn file CSV' })}
                className='mt-1'
              />
              {errors.file && <p className='text-red-600'>{errors.file.message}</p>}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant='bordered' color='danger' onPress={onClose}>
              Hủy
            </Button>
            <Button color='primary' type='submit' isLoading={isPending} isDisabled={isPending}>
              Nhập liệu
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ImportModalDonors
