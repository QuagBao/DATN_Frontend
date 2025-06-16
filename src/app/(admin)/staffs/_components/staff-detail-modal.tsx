import { useTranslation } from 'react-i18next'
import {
  Button,
  Chip,
  type ChipProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner
} from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { Crimson } from 'public/assets/fonts/crimson'

import staffApiRequest from '~/api-requests/staff.request'
import reactI18n from '~/config/i18n/react-i18n'
import { API_URL } from '~/config/routes'
import { EUserStatus } from '~/shared/enums'
import { type TUserManagementRes } from '~/shared/validators'

interface IUserDetailModalProps {
  isOpen: boolean
  staffEdit?: TUserManagementRes
  onClose: () => void
}

const StaffDetailModal = ({ isOpen, staffEdit, onClose }: IUserDetailModalProps) => {
  const { t } = useTranslation(['staffs'], { i18n: reactI18n })

  const { data: staffDetailDataResponse, isPending } = useQuery({
    queryKey: [API_URL.STAFF.GET_BY_ID, staffEdit?.id_account],
    queryFn: () => staffApiRequest.getStaffById(String(staffEdit?.id_account))
  })

  const staffDetailData = staffDetailDataResponse?.data as TUserManagementRes | undefined

  const getChipColor = (status: string): ChipProps['color'] => {
    switch (status) {
      case EUserStatus[EUserStatus.pending]:
        return 'warning'
      case EUserStatus[EUserStatus.active]:
        return 'success'
      case EUserStatus[EUserStatus.blocked]:
        return 'danger'
      default:
        return 'default'
    }
  }

  return (
    <Modal
      classNames={{
        header: `${Crimson.className} text-ct-blue text-2xl font-semibold justify-center`,
        base: 'bg-ct-white'
      }}
      isOpen={isOpen}
      onClose={onClose}
      isDismissable={false}
    >
      <ModalContent>
        <ModalHeader>{t('info')}</ModalHeader>
        <ModalBody>
          <div className='flex flex-col gap-3'>
            {isPending ? (
              <Spinner color='default' className='my-4' />
            ) : (
              staffDetailData && (
                <div className='space-y-5 text-foreground'>
                  {[
                    { label: 'fullName', value: staffDetailData.full_name },
                    { label: 'email', value: staffDetailData.email },
                    { label: 'phone', value: staffDetailData.phone },
                    { label: 'joinDate', value: format(parseISO(staffDetailData.created_at), 'dd/MM/yyyy') }
                  ].map((item) => (
                    <p key={item.label}>
                      <strong className='text-ct-blue'>{t(item.label)}:</strong> {item.value}
                    </p>
                  ))}

                  <div>
                    <strong className='text-ct-blue'>{t('status')}:</strong>
                    <Chip className='ml-2' color={getChipColor(String(staffDetailData.status))}>
                      {t(String(staffDetailData.status))}
                    </Chip>
                  </div>
                </div>
              )
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' type='button' onPress={onClose}>
            {t('buttonCancel')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default StaffDetailModal
