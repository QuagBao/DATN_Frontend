// import { useState } from 'react'
// import { keepPreviousData, useQuery } from '@tanstack/react-query'

// import { rolesApiRequest } from '~/api-requests'
// import CustomLoadingSpinner from '~/components/shared/custom-loading-spinner'
// import { API_URL } from '~/config/routes'
// import { type TUserManagementRes } from '~/shared/validators'

// import AssignUserToRoleTable from './assign-user-to-role-table'
// import FilterAssignRoleToUsers from './filter-assign-role'

// const AssignRoleToUserTab = ({ isOpen, roleId }: { isOpen: boolean; roleId: string }) => {
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
//     queryKey: [API_URL.ROLE.GET_USERS_NOT_IN_ROLE, roleId, formFilterAssignUser, currentPage, limit],
//     queryFn: () =>
//       rolesApiRequest.getUsersNotInRole(roleId, {
//         ...filterEmptyFields(formFilterAssignUser),
//         page: String(currentPage),
//         limit: String(limit)
//       }),
//     enabled: isOpen,
//     placeholderData: keepPreviousData
//   })

//   return (
//     <div>
//       <FilterAssignRoleToUsers setFormFilterAssignUser={setFormFilterAssignUser} roleId={String(roleId)} />
//       {isLoading ? (
//         <CustomLoadingSpinner />
//       ) : (
//         <AssignUserToRoleTable
//           paginationResponse={usersDataRes?.data.pagination}
//           data={usersDataRes?.data.data as TUserManagementRes[]}
//           setCurrentPage={setCurrentPage}
//           currentPage={currentPage}
//           limit={limit}
//           setLimit={setLimit}
//         />
//       )}
//     </div>
//   )
// }

// export default AssignRoleToUserTab
