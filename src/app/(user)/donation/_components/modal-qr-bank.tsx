'use client'

import { useEffect, useState } from 'react'
import { addToast, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'

import donationApiRequest from '~/api-requests/donation.request'
import envConfig from '~/config/env'
import { useAuth } from '~/config/providers'
import { generateRef } from '~/shared/utils'
import { type TDonationReq } from '~/shared/validators/schemas/donation/donation.schema'

interface IModalQrBankProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  id_project: string
  name_project: string
}

interface SheetResponse {
  paid: boolean
  transaction: {
    id: string
    description: string
    amount: string | number
    date: string
  }
}

const ModalQrBank = ({ isOpen, onClose, amount, id_project, name_project }: IModalQrBankProps) => {
  const [ref, setRef] = useState<string>('')
  const { userInfo } = useAuth()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isOpen) setRef(generateRef().replace(/-/g, ''))
  }, [isOpen])

  const createDonation = useMutation({
    mutationFn: async (payload: TDonationReq) => {
      return donationApiRequest.createDonation(payload)
    },
    onSuccess: () => {
      addToast({
        color: 'success',
        description: 'Ghi nhận giao dịch thành công!'
      })
      queryClient.invalidateQueries({ queryKey: ['myDonations'] })
    }
  })

  const { data: sheet } = useQuery<SheetResponse>({
    queryKey: ['donationStatus', ref],
    queryFn: async () => {
      const res = await donationApiRequest.checkPaid(ref)
      return res.json()
    },
    enabled: Boolean(ref) && isOpen,
    refetchInterval: 3000
  })

  useEffect(() => {
    if (sheet?.paid) {
      createDonation.mutate({
        account_id: userInfo?.account_id || '',
        project_id: id_project,
        amount,
        paytime: sheet.transaction.date,
        transaction_id: String(sheet.transaction.id)
      })
      queryClient.removeQueries({ queryKey: ['donationStatus', ref] })
      onClose()
    }
  })

  const cleanName = name_project.replace(/\s+/g, '')
  const info = `${ref}${cleanName}`

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        header: 'text-ct-blue text-center',
        body: 'items-center'
      }}
    >
      <ModalContent>
        <ModalHeader>
          <p className='w-full md:text-xl'>QR Code</p>
        </ModalHeader>
        <ModalBody>
          <Image
            src={`https://img.vietqr.io/image/${envConfig.NEXT_PUBLIC_BANK_ID}-${envConfig.NEXT_PUBLIC_ACCOUNT_NO}-compact2.png?amount=${amount}&addInfo=${info}&accountName=${envConfig.NEXT_PUBLIC_ACCOUNT_NAME}`}
            alt='Mã QR'
            width={350}
            height={350}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalQrBank
