export const AVATAR_MAX_SIZE = 2 * 1024 * 1024 // 2MB
export const MENU_BOTTOM_HEIGHT = 70
export const FALLBACK_LNG = 'vi'
export const NUMBER_REGEX = /^\d*$/
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/
export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
export const CONTROL_KEYS = [
  'Backspace',
  'Delete',
  'Tab',
  'Enter',
  'ArrowRight',
  'ArrowLeft',
  'ArrowUp',
  'ArrowDown'
] as const

export const ROLES: Record<
  string,
  {
    label: string
    color: string
  }
> = {
  user: { label: 'user', color: 'primary' },
  staff: { label: 'staff', color: 'primary' },
  admin: { label: 'admin', color: 'success' }
} as const
