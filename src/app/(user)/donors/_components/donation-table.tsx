'use client'

import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { format, parseISO } from 'date-fns'

import CustomTable from '~/components/shared/custom-table'
import TableSkeleton from '~/components/shared/table-skeleton'
import reactI18n from '~/config/i18n/react-i18n'
import { formatCurrency } from '~/shared/utils'
import { type TPaginationResponse } from '~/shared/validators'
import { type TDonorBaseSchema, type TDonorsSchema } from '~/shared/validators/schemas/donors/donor.schema'

interface DonationTableProps {
  data: TDonorsSchema
  paginationResponse?: TPaginationResponse | undefined
  isLoading?: boolean
}

const DonationTable: React.FC<DonationTableProps> = ({ data, paginationResponse, isLoading }) => {
  const { t, i18n } = useTranslation('donors', { i18n: reactI18n })

  const columns = [
    { name: t('fieldDonator'), uid: 'account_name' },
    { name: t('fieldNameProject'), uid: 'project_name' },
    { name: t('fieldDonateDate'), uid: 'paytime' },
    { name: t('fieldMoney'), uid: 'amount' }
  ]

  const renderCell = (item: TDonorBaseSchema, columnKey: string): React.ReactNode => {
    const cellValue = item[columnKey as keyof TDonorBaseSchema]

    const renderDate = (date?: string) => {
      if (!date) return '-'
      return format(parseISO(date), 'dd/MM/yyyy')
    }
    switch (columnKey) {
      case 'paytime':
        return renderDate(cellValue as string | undefined)
      case 'amount':
        return formatCurrency(Number(cellValue))
      default:
        return cellValue
    }
  }

  return (
    <div className='px-5 md:px-40'>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <CustomTable
          tableClassNames={{ th: 'text-ct-blue bg-ct-white min-w-[50px]', wrapper: 'h-[500px] pt-0 pb-4 px-0' }}
          selectionMode='none'
          hideSelectedItems
          hideTopContent
          tableKey={i18n.language}
          language={i18n.language}
          columns={columns}
          data={data.map((item) => ({
            ...item,
            id: item.id_donation
          }))}
          renderCell={renderCell}
          paginationResponse={paginationResponse}
        />
      )}
    </div>
  )
}

export default memo(DonationTable)
