// 'use client'

// import type React from 'react'
// import { useTranslation } from 'react-i18next'

// import CustomTable from '~/components/shared/custom-table'
// import { useResourceContext } from '~/components/shared/resource-provider'
// import reactI18n from '~/config/i18n/react-i18n'
// import { type TPaginationResponse, type TUserManagementRes } from '~/shared/validators'

// const AssignUserToRoleTable: React.FC<{
//   data: TUserManagementRes[]
//   paginationResponse: TPaginationResponse | undefined
//   currentPage?: number
//   setCurrentPage?: (page: number) => void
//   limit?: number
//   setLimit?: (limit: number) => void
// }> = ({ data, paginationResponse, setCurrentPage, currentPage, limit, setLimit }) => {
//   const { t, i18n } = useTranslation(['roles'], { i18n: reactI18n })
//   const { selectedKeys, setSelectedKeys } = useResourceContext<TUserManagementRes>()

//   const columns = [
//     { name: t('roles:fullName'), uid: 'fullName', sortable: true },
//     { name: t('roles:email'), uid: 'email', sortable: true }
//   ]

//   const renderCell = (user: TUserManagementRes, columnKey: string): React.ReactNode => {
//     const cellValue = user[columnKey as keyof TUserManagementRes]
//     switch (columnKey) {
//       case 'email':
//         return user.email

//       default:
//         return cellValue as string
//     }
//   }

//   return (
//     <CustomTable
//       language={i18n.language}
//       columns={columns}
//       data={data}
//       renderCell={renderCell}
//       paginationResponse={paginationResponse}
//       isPushParams={false}
//       setPage={setCurrentPage}
//       page={currentPage}
//       limit={limit}
//       setLimit={setLimit}
//       tableClassNames={{ wrapper: 'max-h-[300px]' }}
//       // disabledKeys={disabledKeys}
//       setSelectedKeysArray={setSelectedKeys}
//       externalSelectedKeys={selectedKeys}
//     />
//   )
// }

// export default AssignUserToRoleTable
