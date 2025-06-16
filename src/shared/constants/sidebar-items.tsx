import ProjectsManagement from '@icons/box.svg'
import DonorsManagement from '@icons/hand-coins.svg'
import StaffManagement from '@icons/staff.svg'
import CollaboratorsManagement from '@icons/staff-management.svg'
import UserManagement from '@icons/users.svg'

import { APP_ROUTES } from '~/config/routes'

export interface SidebarItem {
  label: string
  icon?: JSX.Element
  path?: string
  items?: { label: string; icon?: JSX.Element; path: string }[]
}

export const MAIN_SIDEBAR_ITEMS: SidebarItem[] = [
  // 1> Quản lý người dùng
  { label: 'usersManagement', icon: <UserManagement className='size-5' />, path: APP_ROUTES.RESOURCES.USERS },
  { label: 'staffsManagement', icon: <StaffManagement className='size-5' />, path: APP_ROUTES.RESOURCES.STAFFS },
  {
    label: 'projectsManagement',
    icon: <ProjectsManagement className='size-5' />,
    path: APP_ROUTES.RESOURCES.MANAGEMENT_PROJECTS
  },
  {
    label: 'donorsManagement',
    icon: <DonorsManagement className='size-5' />,
    path: APP_ROUTES.RESOURCES.MANAGEMENT_DONORS
  },
  {
    label: 'collaboratorsManagement',
    icon: <CollaboratorsManagement className='size-5' />,
    path: APP_ROUTES.RESOURCES.MANAGEMENT_COLLABORATORS
  }
  // {
  //   label: 'ideasManagement',
  //   icon: <UserManagement className='size-5' />,
  //   path: APP_ROUTES.RESOURCES.MANAGEMENT_IDEAS
  // },
  // {
  //   label: 'resourcesManagement',
  //   icon: <UserManagement className='size-5' />,
  //   path: APP_ROUTES.RESOURCES.MANAGEMENT_RESOURCES
  // }
]
