'use client'

import { Divider } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { projectApiRequest } from '~/api-requests'
import { API_URL } from '~/config/routes'

import CardDetail from './card-detail'
import DetailSkeleton from './detail-skeleton'
import DonationForm from './donation-form'
import InforForm from './infor-form'

function DetailForm() {
  const { id } = useParams<{ id: string }>()

  const { data, isPending } = useQuery({
    queryKey: [API_URL.PROJECT.PROJECT_BY_ID, id],
    queryFn: () => projectApiRequest.getProjectById(id)
  })

  if (isPending) return <DetailSkeleton />
  return (
    <div className='space-y-10 px-5 py-10 md:px-40'>
      <CardDetail
        images={data?.data.images ?? []}
        id_project={data?.data.id_project ?? ''}
        status={data?.data.status ?? 'IN_PROGRESS'}
        title={data?.data.name_project ?? ''}
        description={data?.data.description ?? ''}
        total_donors={data?.data.total_donors ?? 0}
        total_collaborators={data?.data.total_collaborator ?? 0}
        goal={Number(data?.data.total_numeric) || 0}
        achieved={data?.data.current_numeric ?? 0}
        startDate={data?.data.start_date ?? '01/01/2005'}
        endDate={data?.data.end_date ?? '01/01/2005'}
      />
      <div className='space-y-6'>
        <Divider />
        <div className='grid gap-2 lg:grid-cols-[3.5fr_2.5fr]'>
          <InforForm overview={data?.data.content ?? ''} />
          <DonationForm currentAmount={data?.data.current_numeric ?? 0} />
        </div>
        <Divider />
      </div>
    </div>
  )
}

export default DetailForm
