'use client'

import { addToast, Button } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

import { collaboratorApiRequest } from '~/api-requests'
import CustomInput from '~/components/shared/custom-input'
import { useAuth } from '~/config/providers'

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
  const applyCollaboratorMutation = useMutation<AxiosResponse<CollaboratorRes>, AxiosError<ErrorPayload>, string>({
    mutationFn: collaboratorApiRequest.applyCollaborator,
    onSuccess: (res) => {
      addToast({ color: 'success', description: res.data.message })
    }
  })

  const handleApply = async (projectId: string) => {
    if (!projectId) {
      addToast({
        color: 'warning',
        description: 'Bạn chưa chọn dự án'
      })
      return
    }
    applyCollaboratorMutation.mutate(idProject)
  }
  return (
    <div className='space-y-5'>
      {!userInfo && (
        <>
          {PROJECT_DONATION_FORM.map((item) => (
            <CustomInput
              key={item.key}
              variant='bordered'
              color='primary'
              placeholder={item.placeholder}
              labelPlacement='inside'
              type={item.type}
              label={item.label}
            />
          ))}
        </>
      )}

      <ScrollSelect />
      <Button
        fullWidth
        color='primary'
        onPress={() => {
          handleApply(idProject)
        }}
      >
        Đăng ký làm tình nguyện viên
      </Button>
    </div>
  )
}

export default CollaboratorDonation
