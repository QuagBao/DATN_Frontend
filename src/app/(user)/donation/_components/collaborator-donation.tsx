'use client'

import { addToast, Button } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

import { collaboratorApiRequest } from '~/api-requests'

import ScrollSelect from './scroll-select'

type CollaboratorRes = { message: string }
type ErrorPayload = { detail?: string; message?: string }

const CollaboratorDonation = () => {
  const searchParams = useSearchParams()
  const idProject = searchParams.get('id') || ''

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
