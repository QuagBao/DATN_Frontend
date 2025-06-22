'use client'

import { Controller, useForm } from 'react-hook-form'
import { addToast, Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

import { collaboratorApiRequest } from '~/api-requests'
import CustomInput from '~/components/shared/custom-input'
import { useAuth } from '~/config/providers'
import { CONTROL_KEYS } from '~/shared/constants/common.constant'
import { handleApiEntityError } from '~/shared/utils'
import { CollaboratorReqSchema, type TCollaboratorReqSchema } from '~/shared/validators'

import ScrollSelect from './scroll-select'

type CollaboratorRes = { message: string }
type ErrorPayload = { detail?: string; message?: string }

export const PROJECT_DONATION_FORM = [
  {
    label: 'Tên cá nhân/ tổ chức ủng hộ',
    type: 'text',
    placeholder: 'Nhập tên cá nhân hoặc tổ chức',
    key: 'name'
  },
  { label: 'Email', type: 'text', placeholder: 'Nhập email', key: 'email' },
  { label: 'Số điện thoại', type: 'text', placeholder: 'Nhập số điện thoại', key: 'phone' }
]

const CollaboratorDonation = () => {
  const searchParams = useSearchParams()
  const idProject = searchParams.get('id') || ''
  const { userInfo } = useAuth()

  // Khởi tạo form với cả 5 trường
  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm<TCollaboratorReqSchema>({
    mode: 'onSubmit',
    defaultValues: {
      project_id: idProject,
      account_id: userInfo?.account_id || '',
      full_name: userInfo?.full_name || '',
      email: userInfo?.email || '',
      phone: userInfo?.phone || ''
    },
    resolver: zodResolver(CollaboratorReqSchema)
  })

  // Mutation để gọi API
  const { mutate, isPending } = useMutation<
    AxiosResponse<CollaboratorRes>,
    AxiosError<ErrorPayload>,
    TCollaboratorReqSchema
  >({
    mutationFn: collaboratorApiRequest.applyCollaborator,
    onSuccess: ({ data }) => {
      addToast({ color: 'success', description: data.message })
      reset()
    },
    onError: (error) => {
      handleApiEntityError({ error, setError })
    }
  })

  // Khi bấm nút, gọi handleSubmit để validate rồi mới mutate
  const onSubmit = handleSubmit((values) => {
    mutate(values)
  })

  const handlePress = () => {
    onSubmit()
  }

  // Giới hạn nhập số cho phone
  const handleKeyDown = (e: React.KeyboardEvent) =>
    !CONTROL_KEYS.includes(e.key as (typeof CONTROL_KEYS)[number]) && !/^[0-9]$/.test(e.key)
      ? e.preventDefault()
      : undefined

  return (
    <div className='space-y-5'>
      {/* Các input ẩn */}
      <input type='hidden' {...register('project_id')} />
      <input type='hidden' {...register('account_id')} />

      {/* Nếu chưa login mới hiển thị form */}
      {!userInfo && (
        <div className='flex flex-col gap-4'>
          <Controller
            name='full_name'
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                variant='bordered'
                color='primary'
                labelPlacement='inside'
                label='Họ và tên'
                placeholder='Nhập họ tên'
                {...field}
                validationErrorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                variant='bordered'
                color='primary'
                labelPlacement='inside'
                label='Email'
                placeholder='Nhập email'
                {...field}
                validationErrorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name='phone'
            control={control}
            render={({ field: { value, onChange, ref } }) => (
              <CustomInput
                variant='bordered'
                color='primary'
                labelPlacement='inside'
                label='Số điện thoại'
                placeholder='Nhập số điện thoại'
                onKeyDown={handleKeyDown}
                value={value}
                onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ''))}
                ref={ref}
                validationErrorMessage={errors.phone?.message}
              />
            )}
          />
        </div>
      )}

      {/* Component chọn hình thức ủng hộ */}
      <ScrollSelect />

      {/* Nút submit chỉ bật khi form valid */}
      <Button fullWidth color='primary' onPress={handlePress} isLoading={isPending} isDisabled={isPending}>
        Đăng ký làm tình nguyện viên
      </Button>
    </div>
  )
}

export default CollaboratorDonation
