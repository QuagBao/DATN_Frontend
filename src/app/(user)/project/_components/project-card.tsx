'use client'

import { useTranslation } from 'react-i18next'
import { Button, Card, CardBody, Divider, Progress } from '@heroui/react'
import Calendar from '@icons/calendar.svg'
import Explore from '@icons/explore.svg'
import HeartHandShake from '@icons/heart-handshake.svg'
import Users from '@icons/users.svg'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { Crimson } from 'public/assets/fonts/crimson'

import envConfig from '~/config/env'
import { PROJECT_BUTTONS, PROJECT_STATUS } from '~/shared/constants/project'
import { type IProjectItem } from '~/shared/types'
import { formatCurrency } from '~/shared/utils'

const ProjectCard = ({
  index,
  id_project,
  images,
  status,
  title,
  description,
  total_donors,
  total_collaborators,
  goal,
  achieved,
  startDate,
  endDate
}: IProjectItem) => {
  const { t } = useTranslation('project')
  const isReversed = Number(index) % 2 === 0
  return (
    <Card key={id_project} radius='none' classNames={{ base: 'w-full bg-ct-white', body: 'p-0  ' }}>
      <CardBody>
        <div className='grid lg:grid-cols-[3.5fr_2.5fr]'>
          <Image
            src={`${envConfig.NEXT_PUBLIC_IMAGE}${images[0]?.url}`}
            className={`w-full object-cover lg:h-full ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
            alt={images[0].id_image}
            width={800}
            height={800}
          />
          <div className={`flex flex-col justify-between gap-3 p-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
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
                    {format(parseISO(startDate), 'dd/MM/yyyy')} - {format(parseISO(endDate), 'dd/MM/yyyy')}
                  </p>
                </div>
              </div>

              <Link
                href={`/project/${id_project}`}
                className={`${Crimson.className} cursor-pointer text-xl font-bold text-ct-blue md:text-2xl`}
              >
                {title}
              </Link>
              <p className='line-clamp-3 truncate text-wrap text-sm text-ct-primary md:text-base'>{description}</p>

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

            <div className='flex items-center justify-between'>
              <Button
                as={Link}
                href={`/project/${id_project}`}
                className='bg-transparent p-2 text-ct-blue underline underline-offset-8'
              >
                Tìm hiểu chương trình
              </Button>

              <Button
                as={Link}
                href={`/project/${id_project}`}
                isIconOnly
                type='button'
                className='bg-transparent p-2 text-ct-blue'
              >
                <Explore className='size-5 text-ct-blue md:size-6' />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProjectCard
