'use client'

import { useTranslation } from 'react-i18next'
import { format, parseISO } from 'date-fns'

import CustomTable from '~/components/shared/custom-table'
import { useResourceContext } from '~/components/shared/resource-provider'
import reactI18n from '~/config/i18n/react-i18n'
import { formatCurrency } from '~/shared/utils'
import { type TPaginationResponse } from '~/shared/validators'
import { type TDonorBaseSchema, type TDonorsSchema } from '~/shared/validators/schemas/donors/donor.schema'

interface IManagementDonorsTableProps {
  data: TDonorsSchema
  paginationResponse: TPaginationResponse | undefined
}

const ManagementDonorsTable: React.FC<IManagementDonorsTableProps> = ({ data, paginationResponse }) => {
  const { t, i18n } = useTranslation('management-donors', { i18n: reactI18n })

  const { selectedKeys, setSelectedKeys } = useResourceContext<TDonorsSchema>()

  const columns = [
    { name: t('fieldName'), uid: 'account_name' },
    { name: t('fieldProject'), uid: 'project_name' },
    { name: t('fieldDonateDate'), uid: 'paytime' },
    { name: t('fieldAmount'), uid: 'amount' }
  ]

  const renderCell = (donor: TDonorBaseSchema, columnKey: string): React.ReactNode => {
    const cellValue = donor[columnKey as keyof TDonorBaseSchema]

    const renderDate = (date: string) => format(parseISO(date), 'dd/MM/yyyy')
    switch (columnKey) {
      case 'paytime':
        return renderDate(String(cellValue))
      case 'amount':
        return formatCurrency(Number(cellValue))
      default:
        return String(cellValue)
    }
  }

  return (
    <CustomTable
      hideSelectedItems
      selectionMode='single'
      tableKey={i18n.language}
      language={i18n.language}
      columns={columns}
      setSelectedKeysArray={setSelectedKeys}
      externalSelectedKeys={selectedKeys}
      data={data.map((donor) => ({ ...donor, id: donor.id_donation }))}
      renderCell={renderCell}
      paginationResponse={paginationResponse}
    />
  )
}

export default ManagementDonorsTable
