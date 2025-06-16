'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'

import TableSkeleton from '~/components/shared/table-skeleton'
import { API_URL } from '~/config/routes'
import { donorService } from '~/shared/services/donor.service'

import FilterDonation from './filter-donation'

const DonorsTable = dynamic(() => import('./donation-table'), {
  ssr: false,
  loading: () => <TableSkeleton />
})

const Donation = () => {
  const searchParams = useSearchParams()
  const { data: donorsDataResponse, isLoading: donorsLoading } = useQuery({
    queryKey: [API_URL.PROJECT.GET_DONORS, String(searchParams)],
    queryFn: async () => {
      const res = await donorService.getDonors(searchParams)
      return res.data
    }
  })

  return (
    <section className='space-y-6'>
      <FilterDonation />
      <DonorsTable
        data={donorsDataResponse?.data ?? []}
        paginationResponse={{
          page: donorsDataResponse?.page || 1,
          limit: donorsDataResponse?.limit || 20,
          total_items: donorsDataResponse?.total_items || 1,
          total_pages: donorsDataResponse?.total_pages || 1
        }}
        isLoading={donorsLoading}
      />
    </section>
  )
}

export default Donation
