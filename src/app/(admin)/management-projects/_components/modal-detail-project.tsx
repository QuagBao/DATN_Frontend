import { useTranslation } from 'react-i18next'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import Calendar from '@icons/calendar.svg'
import FileText from '@icons/file-text.svg'
import HeartHandShake from '@icons/heart-handshake.svg'
import Users from '@icons/users.svg'
import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { Crimson } from 'public/assets/fonts/crimson'

import { projectApiRequest } from '~/api-requests'
import EmblaCarousel from '~/components/carousel/EmblaCarousel'
import CustomLoadingModal from '~/components/shared/custom-loading-modal'
import { API_URL } from '~/config/routes'
import { PROJECT_STATUS } from '~/shared/constants/project'
import { formatCurrency } from '~/shared/utils'
import { formatTextWithLineBreaks } from '~/shared/utils/format-text.util'
import { type TProjectBaseSchema } from '~/shared/validators'

interface IProjectDetailModalProps {
  isOpen: boolean
  projectDetail?: TProjectBaseSchema
  onClose: () => void
}

const ModalDetailProject = ({ isOpen, onClose, projectDetail }: IProjectDetailModalProps) => {
  const { t } = useTranslation('management-projects')

  const { data: projectDataResponse, isPending } = useQuery({
    queryKey: [API_URL.PROJECT.PROJECT_BY_ID, projectDetail?.id_project],
    queryFn: () => projectApiRequest.getProjectById(String(projectDetail?.id_project))
  })

  const renderDate = (date?: string) => {
    if (!date) return '-'
    return format(parseISO(date), 'dd/MM/yyyy')
  }

  const projectData = projectDataResponse?.data

  return isPending ? (
    <CustomLoadingModal isOpen={isPending} />
  ) : (
    <Modal
      classNames={{
        base: 'bg-ct-white',
        header: `text-ct-blue text-2xl justify-center font-semibold ${Crimson.className}`
      }}
      scrollBehavior='inside'
      isOpen={isOpen}
      onClose={onClose}
      size='2xl'
    >
      <ModalContent>
        <ModalHeader>{projectData?.name_project}</ModalHeader>
        <ModalBody>
          {/* <CardDetail
              description={projectData?.description}
            /> */}

          <div className='flex flex-col items-center justify-center gap-5 md:px-10'>
            <EmblaCarousel slides={projectData?.images ?? []} />
            <div className='flex w-full items-center justify-between'>
              <div className='flex items-center gap-1'>
                {/* <Mark className='size-5 text-ct-blue md:size-7' /> */}
                {PROJECT_STATUS[projectData?.status ?? 'IN_PROGRESS'].icon}
                <p className='text-sm font-semibold uppercase text-ct-primary md:text-base'>
                  {t(PROJECT_STATUS[projectData?.status ?? 'IN_PROGRESS'].label)}
                </p>
              </div>
              <div className='flex  items-center gap-1'>
                <Calendar className='size-5 text-ct-blue md:size-6' />
                <p className='uppercase-m-2 text-sm text-ct-secondary md:text-base'>
                  {renderDate(projectData?.start_date ?? '')} - {renderDate(projectData?.end_date ?? '')}
                </p>
              </div>
            </div>
            <div className='w-full'>
              <p>{formatTextWithLineBreaks(projectData?.description || '')}</p>
            </div>
            <div className='grid w-full grid-cols-2 gap-x-5 gap-y-2'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <HeartHandShake className='size-5 text-ct-blue md:size-6' />
                  <p className='text-sm text-ct-primary md:text-base'>Số lượt ủng hộ</p>
                </div>
                <p className={`${Crimson.className} text-xl font-semibold text-warning md:text-2xl`}>
                  {formatCurrency(projectData?.total_donors || 0)}
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <Users className='size-5 text-ct-blue md:size-6' />
                  <p className='text-ct-primary'>Cộng tác viên</p>
                </div>
                <p className={`${Crimson.className} text-xl font-semibold text-warning md:text-2xl`}>
                  {formatCurrency(Number(projectData?.total_collaborators) || 0)}
                </p>
              </div>
              <p className='flex items-center justify-between'>
                Mục tiêu: &nbsp;
                <span className='font-semibold text-warning'>
                  {formatCurrency(Number(projectData?.total_numeric))} VNĐ
                </span>
              </p>
              <p className='flex items-center justify-between'>
                Đã đạt: &nbsp;
                <span className='font-semibold text-warning'>
                  {formatCurrency(Number(projectData?.current_numeric))} VNĐ
                </span>
              </p>
            </div>
            <div className='flex w-full flex-col gap-2'>
              <div className='flex items-center gap-1'>
                <FileText className='size-5 text-ct-blue md:size-6' />
                <p>Nội dung:</p>
              </div>
              <p>{formatTextWithLineBreaks(projectData?.content || '')}</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default ModalDetailProject
