import type React from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { format, parseISO } from 'date-fns'

import CustomTable from '~/components/shared/custom-table'
import TableSkeleton from '~/components/shared/table-skeleton'
import reactI18n from '~/config/i18n/react-i18n'
import { type TCollaboratorsSchema, type TPaginationResponse } from '~/shared/validators'
import { type TVolunteerRes } from '~/shared/validators/schemas/volunteer/volunteer.schema'

interface VolunteerTableProps {
  data: TCollaboratorsSchema
  paginationResponse?: TPaginationResponse | undefined
  isLoading?: boolean
}

const VolunteerTable: React.FC<VolunteerTableProps> = ({ data, paginationResponse, isLoading }) => {
  const { t, i18n } = useTranslation('volunteer', { i18n: reactI18n })
  const columns = [
    { name: t('fieldVolunteer'), uid: 'account_name' },
    { name: t('fieldProject'), uid: 'project_name' },
    { name: t('fieldApproveAt'), uid: 'approved_at' }
  ]

  const renderCell = (item: { id: string | number }, columnKey: string): React.ReactNode => {
    const volunteer = item as TVolunteerRes
    const cellValue = volunteer[columnKey as keyof TVolunteerRes]

    const renderDate = (date?: string) => {
      if (!date) return '-'
      return format(parseISO(date), 'dd/MM/yyyy')
    }
    switch (columnKey) {
      case 'approved_at':
        return renderDate(cellValue as string)
      default:
        return cellValue as string
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
          data={data}
          renderCell={renderCell}
          paginationResponse={paginationResponse}
        />
      )}
    </div>
  )
}

export default memo(VolunteerTable)
