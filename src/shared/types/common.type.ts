export type TModalProps = {
  isOpen: boolean
  onClose: () => void
}

export type TSidebarItem = {
  label: string
  icon: string
  path: string
}

export interface ISuccessResponse<T> {
  statusCode: number
  message: string
  data: T
  pagination?: {
    totalItems: number
    limit: number
    currentPage: number
    totalPages: number
  }
}
