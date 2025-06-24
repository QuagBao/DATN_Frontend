import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  addToast,
  Button,
  type DateRangePickerProps,
  type DateValue,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type RangeValue
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Close from '@icons/close.svg'
import { CalendarDate } from '@internationalized/date'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { Crimson } from 'public/assets/fonts/crimson'

import { projectApiRequest } from '~/api-requests'
import CustomDateRangePicker from '~/components/shared/custom-date-range-picker'
import CustomInput from '~/components/shared/custom-input'
import CustomTextArea from '~/components/shared/custom-textarea'
import { useResourceContext } from '~/components/shared/resource-provider'
import { API_URL } from '~/config/routes'
import { CONTROL_KEYS } from '~/shared/constants/common.constant'
import { PROJECT_FIELDS } from '~/shared/constants/project'
import { formatCurrency, handleApiEntityError } from '~/shared/utils'
import {
  CreateProjectReqSchema,
  EditProjectReqSchema,
  type TCreateProjectReq,
  type TEditProjectReq,
  type TProjectBaseSchema
} from '~/shared/validators'

interface ICreateEditProjectModalProps {
  isOpen: boolean
  onClose: () => void
  isCreateModal?: boolean
  projectEdit?: TProjectBaseSchema
}

const ModalCreateEditProject = ({ isOpen, onClose, isCreateModal, projectEdit }: ICreateEditProjectModalProps) => {
  const { t } = useTranslation('management-projects')

  const fields = useMemo(() => PROJECT_FIELDS(t), [t])

  const parseISODateToCanlendarDate = (isoDate: string): CalendarDate => {
    const date = new Date(isoDate)
    return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
  }

  const initialDateRange =
    projectEdit?.start_date && projectEdit.end_date
      ? {
          start: parseISODateToCanlendarDate(projectEdit.start_date),
          end: parseISODateToCanlendarDate(projectEdit.end_date)
        }
      : null

  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null | undefined>(initialDateRange)
  // Set existingImages && newImages
  const [existingImages, setExistingImages] = useState<TProjectBaseSchema['images']>([])
  const [newImages, setNewImages] = useState<File[]>([])

  const { setIsCreateProjectSuccessModalOpen, setCreateProjectSuccessModalRes } =
    useResourceContext<TProjectBaseSchema>()
  const queryClient = useQueryClient()
  const defaultValues = useMemo(
    () => ({
      name_project: projectEdit?.name_project ?? '',
      description: projectEdit?.description ?? '',
      content: projectEdit?.content ?? '',
      total_numeric: projectEdit?.total_numeric ?? 0,
      start_date: projectEdit?.start_date ?? '',
      end_date: projectEdit?.end_date ?? '',
      images: undefined
    }),
    [projectEdit]
  )

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(isCreateModal ? CreateProjectReqSchema : EditProjectReqSchema)
  })

  const handleKeyDown = (e: React.KeyboardEvent) =>
    !CONTROL_KEYS.includes(e.key as (typeof CONTROL_KEYS)[number]) && !/^[0-9]$/.test(e.key)
      ? e.preventDefault()
      : undefined

  const handleChangeDateRangePicker = (range: RangeValue<DateValue> | null) => {
    setDateRange(range)
    setValue('start_date', String(range?.start))
    setValue('end_date', String(range?.end))
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      data,
      newImgs,
      idImagesToKeep
    }: {
      data: Omit<TCreateProjectReq | TEditProjectReq, 'images'>
      newImgs: File[]
      idImagesToKeep?: string[]
    }) => {
      if (isCreateModal) {
        return projectApiRequest.createProject(data, newImgs)
      } else {
        return projectApiRequest.editProject(data, newImgs, idImagesToKeep)
      }
    },
    onSuccess: (data) => {
      reset()
      onClose()
      isCreateModal && setIsCreateProjectSuccessModalOpen(true)
      if (isCreateModal) {
        setCreateProjectSuccessModalRes(data.data as unknown as TProjectBaseSchema)
        addToast({
          color: 'success',
          title: t('success'),
          description: String((data.data as { message?: string }).message ?? ''),
          timeout: 20000
        })
        queryClient.invalidateQueries({ queryKey: [API_URL.PROJECT.CREATE_PROJECT, projectEdit?.id_project] })
      } else {
        addToast({
          color: 'success',
          title: t('success'),
          description: String((data.data as { message?: string }).message ?? '')
        })
        queryClient.invalidateQueries({ queryKey: [API_URL.PROJECT.PROJECT_BY_ID, projectEdit?.id_project] })
      }
      queryClient.invalidateQueries({ queryKey: [API_URL.PROJECT.ALL_PROJECT], exact: false })
    },
    onError: (error) => {
      handleApiEntityError({ error, setError })
    }
  })

  const handleCreateProjectSubmit = (data: TCreateProjectReq) => {
    const images = data.images ? Array.from(data.images) : []
    const { images: unusedImages, ...restData } = data
    return mutate({ data: restData, newImgs: images })
  }

  const handleEditProjectSubmit = (data: TEditProjectReq) => {
    const images = data.images ? Array.from(data.images) : []
    const { images: unusedImages, ...restData } = data
    const idImagesToKeep = existingImages.map((img) => img.id_image)
    return mutate({ data: restData, idImagesToKeep, newImgs: images })
  }

  useEffect(() => {
    if (projectEdit?.images.length) {
      setExistingImages(projectEdit.images)
    } else {
      setExistingImages([])
    }
    setNewImages([])
  }, [projectEdit])

  const handleAddNewImages = (files: FileList | null) => {
    if (!files) return
    setNewImages((prev) => [...prev, ...Array.from(files)])
  }

  const handleRemoveExistingImage = (id_image: string) => {
    if (existingImages.length <= 1 && newImages.length === 0) {
      addToast({
        color: 'warning',
        title: t('warning'),
        description: t('mustHaveAtLeastOneImage')
      })
      return
    }
    setExistingImages((prev) => prev.filter((img) => img.id_image !== id_image))
  }

  const handleRemoveNewImage = (index: number) => {
    if (existingImages.length <= 1 && newImages.length <= 1) {
      addToast({
        color: 'warning',
        title: t('warning'),
        description: t('mustHaveAtLeastOneImage')
      })
      return
    }
    setNewImages((prev) => prev.filter((_, i) => i !== index))
  }

  const renderField = (field: (typeof fields)[0]) => {
    switch (field.key) {
      case 'content':
      case 'description':
        return (
          <CustomTextArea
            key={field.key}
            className='col-span-full'
            label={field.label}
            placeholder={field.placeholder}
            {...register(field.key)}
          />
        )
      case 'rangeDate':
        return (
          <CustomDateRangePicker
            aria-label='created'
            hourCycle={24}
            key={`created-${field.key}`}
            label={field.label}
            hideTimeZone
            visibleMonths={2}
            value={dateRange as DateRangePickerProps['value']}
            onChange={handleChangeDateRangePicker}
          />
        )
      case 'images':
        return (
          <Controller
            name='images'
            control={control}
            defaultValue={undefined}
            key={field.key}
            render={({ field: fileField }) => (
              <input
                type='file'
                multiple
                onChange={(e) => {
                  fileField.onChange(e.target.files)
                  handleAddNewImages(e.target.files)
                }}
                onBlur={fileField.onBlur}
                ref={fileField.ref}
              />
            )}
          />
        )
      case 'total_numeric':
        return (
          <Controller
            key={field.key}
            name='total_numeric'
            control={control}
            render={({ field: { value, onChange, ref } }) => (
              <CustomInput
                type='text'
                label={field.label}
                placeholder={field.placeholder}
                onKeyDown={handleKeyDown}
                value={formatCurrency(Number(value))}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^\d]/g, '')
                  onChange(numericValue ? Number(numericValue) : 0)
                }}
                ref={ref}
                validationErrorMessage={errors.total_numeric?.message}
              />
            )}
          />
        )
      default:
        return (
          <CustomInput
            key={field.key}
            className={field.key === 'name_project' ? 'col-span-full' : 'col-span-1'}
            type={field.type as 'text'}
            label={field.label}
            placeholder={field.placeholder}
            {...register(field.key as 'name_project' | 'content')}
            validationErrorMessage={errors[field.key as 'name_project' | 'content']?.message}
          />
        )
    }
  }

  return (
    <Modal
      classNames={{ header: `text-ct-blue text-2xl justify-center font-semibold ${Crimson.className}` }}
      isOpen={isOpen}
      onClose={onClose}
      size='2xl'
      placement='center'
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              {isCreateModal ? (
                t('modalCreateTitle')
              ) : (
                <p className='flex flex-col items-center gap-2'>
                  {t('modalEditTitle')} <span className='text-xl'>{projectEdit?.name_project}</span>
                </p>
              )}
            </ModalHeader>
            <form
              className='h-[400px] overflow-y-auto'
              onSubmit={handleSubmit(isCreateModal ? handleCreateProjectSubmit : handleEditProjectSubmit)}
            >
              <ModalBody>
                <div className='grid grid-cols-2 gap-5'>
                  {fields.map(renderField)}{' '}
                  <div className='col-span-full flex flex-col items-center gap-5'>
                    {!isCreateModal && (
                      <>
                        <p className={`font-semibold ${Crimson.className} text-xl text-ct-blue`}>
                          {t('existingImages')}
                        </p>
                        <div className='flex flex-wrap gap-2'>
                          {existingImages.map((img) => (
                            <div key={img.id_image} className='relative h-24 w-24 overflow-hidden rounded border'>
                              <Image
                                src={`https://quagbao.id.vn/${img.url}`}
                                alt='existing'
                                className='h-full w-full object-cover'
                                width={100}
                                height={100}
                                unoptimized
                              />
                              <Button
                                isIconOnly
                                color='danger'
                                radius='full'
                                onPress={() => handleRemoveExistingImage(img.id_image)}
                                className='absolute right-1 top-1 h-4 w-4 min-w-2'
                              >
                                <Close className='size-3 text-ct-white' />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    <p className={`font-semibold ${Crimson.className} text-xl text-ct-blue`}>{t('newImages')}</p>
                    <div className='flex flex-wrap gap-2'>
                      {newImages.map((file) => {
                        const url = URL.createObjectURL(file)
                        const key = `${file.name}-${file.lastModified}`
                        return (
                          <div key={key} className='relative h-24 w-24 overflow-hidden rounded border'>
                            <Image
                              src={url}
                              alt='new'
                              className='h-full w-full object-cover'
                              width={500}
                              height={500}
                            />
                            <Button
                              onPress={() => handleRemoveNewImage(newImages.findIndex((f) => f === file))}
                              isIconOnly
                              color='danger'
                              radius='full'
                              className='absolute right-1 top-1 h-4 w-4 min-w-2'
                            >
                              <Close className='size-3 text-ct-white' />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' type='button' onPress={onClose}>
                  {t('cancel')}
                </Button>
                <Button color='primary' type='submit' isLoading={isPending} isDisabled={isPending}>
                  {t('save')}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalCreateEditProject
