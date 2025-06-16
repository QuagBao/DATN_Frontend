// import { useEffect, useState } from 'react'
// import { keepPreviousData, useQuery } from '@tanstack/react-query'

// import { rolesApiRequest } from '~/api-requests'
// import CustomLoadingSpinner from '~/components/shared/custom-loading-spinner'
// import { API_URL } from '~/config/routes'
// import { type TUserManagementRes } from '~/shared/validators'

// import FilterManageUsers from './filter-manage-role-user'
// import ManageUserOfRoleTable from './manage-user-of-role-table'

// const ManageUserOfRoleForm = ({ roleId, isOpen }: { roleId: string; isOpen: boolean }) => {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [limit, setLimit] = useState(10)

//   const [formFilterAssignUser, setFormFilterAssignUser] = useState({
//     universalSearch: ''
//   })

//   const filterEmptyFields = <T extends object>(params: T): Partial<T> => {
//     return Object.keys(params).reduce<Partial<T>>((acc, key) => {
//       const k = key as keyof T
//       if (params[k] !== '') {
//         return { ...acc, [k]: params[k] }
//       }
//       return acc
//     }, {})
//   }

//   const { data: usersDataRes, isLoading } = useQuery({
//     queryKey: [API_URL.ROLE.GET_USERS_BY_ROLE, roleId, currentPage, limit, formFilterAssignUser],
//     queryFn: () =>
//       rolesApiRequest.getUsersByRole(roleId, {
//         ...filterEmptyFields(formFilterAssignUser),
//         page: String(currentPage),
//         limit: String(limit)
//       }),
//     enabled: isOpen,
//     placeholderData: keepPreviousData
//   })

//   useEffect(() => {
//     if (!isOpen) {
//       setFormFilterAssignUser({
//         universalSearch: ''
//       })
//     }
//   }, [isOpen])

//   return (
//     <div>
//       <FilterManageUsers setFormFilterAssignUser={setFormFilterAssignUser} roleId={roleId} />

//       {isLoading ? (
//         <CustomLoadingSpinner />
//       ) : (
//         <ManageUserOfRoleTable
//           paginationResponse={usersDataRes?.data.pagination}
//           data={usersDataRes?.data.data as TUserManagementRes[]}
//           // roleId={Number(roleId)}
//           setCurrentPage={setCurrentPage}
//           currentPage={currentPage}
//           limit={limit}
//           setLimit={setLimit}
//         />
//       )}
//     </div>
//   )
// }

// export default ManageUserOfRoleForm
