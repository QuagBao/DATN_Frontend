'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import MailOutline from '@icons/mail-outline.svg'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { Crimson } from 'public/assets/fonts/crimson'

import staffApiRequest from '~/api-requests/staff.request'
import CustomInput from '~/components/shared/custom-input'
import { API_URL } from '~/config/routes'
import { handleApiEntityError } from '~/shared/utils'
import { CreateStaffReqSchema, type TUserManagementRes } from '~/shared/validators'

interface ICreateUserModalProps {
  isOpen: boolean
  userEdit?: TUserManagementRes
  onClose: () => void
}

const CreateStaffModal = ({ isOpen, onClose, userEdit }: ICreateUserModalProps) => {
  const { t } = useTranslation('staffs')
  const userFields = [
    {
      label: t('fieldEmail'),
      type: 'email',
      placeholder: t('placeholderEmail'),
      key: 'email'
    }
  ]

  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const defaultValues = useMemo(
    () => ({
      email: userEdit?.email ?? ''
    }),
    [userEdit]
  )

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(CreateStaffReqSchema)
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: { email: string }) => {
      return staffApiRequest.createStaff(payload)
    },
    onSuccess: (data) => {
      addToast({
        color: 'success',
        title: t('success'),
        description: (data.data as { message?: string }).message ?? t('success')
      })
      reset()
      onClose()
      queryClient.invalidateQueries({ queryKey: [API_URL.ADMIN.GET_STAFFS, String(searchParams)] })
    },
    onError: (error) => {
      handleApiEntityError({ error, setError })
    }
  })

  const handleCreateUserSubmit = (data: { email: string }) => {
    return mutate({ ...data })
  }
  return (
    <Modal
      classNames={{
        base: 'bg-ct-white',
        header: `${Crimson.className} text-ct-blue text-2xl justify-center font-semibold`
      }}
      isOpen={isOpen}
      onClose={onClose}
      radius='sm'
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>{t('modalCreateTitle')}</ModalHeader>

            <form onSubmit={handleSubmit(handleCreateUserSubmit)}>
              <ModalBody>
                <div className='grid grid-cols-1 gap-4'>
                  {userFields.map((field) => {
                    switch (field.key) {
                      default:
                        return (
                          <CustomInput
                            classNames={{ label: '!text-ct-blue', inputWrapper: 'bg-white', input: '!text-ct-blue' }}
                            key={field.key}
                            type={field.type as 'text' | 'email'}
                            label={field.label}
                            labelPlacement='outside'
                            startContent={<MailOutline className='size-4 text-ct-blue' />}
                            placeholder={field.placeholder}
                            register={register(field.key as 'email')}
                            validationErrorMessage={errors[field.key as 'email']?.message}
                          />
                        )
                    }
                  })}
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
export default CreateStaffModal
