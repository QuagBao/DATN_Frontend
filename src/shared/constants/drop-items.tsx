import { APP_ROUTES } from '~/config/routes'

export interface DropItem {
  label: string
  path?: string
  items?: { label: string; path: string }[]
}

export const DROP_ITEMS: DropItem[] = [
  {
    label: 'Giới thiệu',
    path: APP_ROUTES.COMMON.INTRODUCE
  },
  {
    label: 'Chương trình',
    path: APP_ROUTES.COMMON.PROJECT
  },
  {
    label: 'Danh sách đóng góp',
    path: APP_ROUTES.COMMON.DONORS
  },
  {
    label: 'Danh sách cộng tác viên',
    path: APP_ROUTES.COMMON.VOLUNTEER
  }
]
