'use client'

import { useTranslation } from 'react-i18next'
import { addToast, Button, Card, CardBody, Divider, Link, Progress, Snippet } from '@heroui/react'
import Calendar from '@icons/calendar.svg'
import DoubleCheck from '@icons/double-check.svg'
import HeartHandShake from '@icons/heart-handshake.svg'
import RegCopy from '@icons/reg-copy.svg'
import Users from '@icons/users.svg'
import { format, parseISO } from 'date-fns'
import { usePathname } from 'next/navigation'
import { Crimson } from 'public/assets/fonts/crimson'

import EmblaCarousel from '~/components/carousel/EmblaCarousel'
import { PROJECT_BUTTONS, PROJECT_STATUS } from '~/shared/constants/project'
import { type IProjectItem } from '~/shared/types'
import { formatCurrency } from '~/shared/utils'
import { formatTextWithLineBreaks } from '~/shared/utils/format-text.util'

const CardDetail = ({
  id_project,
  images,
  status,
  title,
  total_donors,
  total_collaborators,
  description,
  goal,
  achieved,
  startDate,
  endDate
}: IProjectItem) => {
  const { t } = useTranslation('project')

  const onCopy = () => {
    addToast({
      color: 'success',
      description: t('copyContent')
    })
  }
  const pathName = usePathname()
  const shareUrl = typeof window !== 'undefined' ? window.location.origin + pathName : ''
  const renderDate = (date?: string) => {
    if (!date) return '-'
    return format(parseISO(date), 'dd/MM/yyyy')
  }

  return (
    <div className=''>
      <Card key={id_project} radius='none' classNames={{ base: 'w-full bg-ct-white', body: 'p-0  ' }}>
        <CardBody>
          <div className='grid lg:grid-cols-[3.5fr_2.5fr]'>
            <EmblaCarousel slides={images} />
            <div className='flex flex-col justify-between gap-3 p-5'>
              <div className='flex flex-col gap-2 md:gap-5'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-1'>
                    {/* <Mark className='size-5 text-ct-blue md:size-7' /> */}
                    {PROJECT_STATUS[status].icon}
                    <p className='text-sm font-semibold uppercase text-ct-primary md:text-base'>
                      {t(PROJECT_STATUS[status].label)}
                    </p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Calendar className='size-5 text-ct-blue md:size-6' />
                    <p className='uppercase-m-2 text-sm text-ct-secondary md:text-base'>
                      {renderDate(startDate)} - {renderDate(endDate)}
                    </p>
                  </div>
                </div>

                <p className={`${Crimson.className} text-xl font-bold text-ct-blue md:text-2xl`}>{title}</p>
                <p className='line-clamp-3 truncate text-wrap text-sm text-ct-primary md:text-base'>
                  {formatTextWithLineBreaks(description || '')}
                </p>
                <div className='flex flex-col justify-center gap-1'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                      <HeartHandShake className='size-5 text-ct-blue md:size-6' />
                      <p className='text-sm text-ct-primary md:text-base'>Số lượt ủng hộ</p>
                    </div>
                    <p className={`${Crimson.className} text-xl font-semibold text-warning md:text-2xl`}>
                      {formatCurrency(total_donors || 0)}
                    </p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                      <Users className='size-5 text-ct-blue md:size-6' />
                      <p className='text-ct-primary'>Cộng tác viên</p>
                    </div>
                    <p className={`${Crimson.className} text-xl font-semibold text-warning md:text-2xl`}>
                      {formatCurrency(total_collaborators || 0)}
                    </p>
                  </div>
                  <Divider />
                </div>

                <div>
                  <div className='grid grid-cols-2 items-start justify-between gap-2 text-sm text-ct-primary md:text-base'>
                    <p>
                      Mục tiêu: &nbsp;
                      <span className='font-semibold text-warning'>{formatCurrency(goal || 0)} VNĐ</span>
                    </p>
                    <p>
                      Đã đạt: &nbsp;
                      <span className='font-semibold text-warning'>{formatCurrency(achieved || 0)} VNĐ</span>
                    </p>
                  </div>
                  <Progress color='primary' maxValue={goal} value={achieved} className='mt-2 h-2 rounded-full' />
                </div>
                {status !== 'done' && (
                  <div className='flex items-center gap-3'>
                    {PROJECT_BUTTONS.map((item) => (
                      <Button
                        as={Link}
                        href={`${item.path}?id=${id_project}&project=${title}`}
                        className='px-2 text-sm md:text-base'
                        color='primary'
                      >
                        {t(item.label)}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              <div className='flex items-center gap-1'>
                <p className='bg-transparent p-2 text-ct-blue'>Chia sẻ:</p>

                <Snippet
                  codeString={shareUrl}
                  onCopy={onCopy}
                  classNames={{
                    base: 'p-0 gap-1 bg-transparent',
                    content: 'text-sm',
                    copyButton: 'text-ct-blue',
                    checkIcon: 'text-ct-blue'
                  }}
                  tooltipProps={{
                    color: 'primary',
                    content: 'Sao chép đường dẫn'
                  }}
                  hideSymbol
                  copyIcon={<RegCopy className='size-4 text-ct-blue' />}
                  checkIcon={<DoubleCheck className='size-4 !text-ct-blue' />}
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default CardDetail
