import type React from 'react'
import Mark from '@icons/mark.svg'
import MarkCheck from '@icons/mark-check.svg'

import { APP_ROUTES } from '~/config/routes'

export const PROJECT_STATUS: Record<
  string,
  {
    label: string
    color: string
    icon: React.ReactElement
  }
> = {
  IN_PROGRESS: { label: 'inProgress', color: 'primary', icon: <Mark className='size-5 text-ct-blue md:size-7' /> },
  DONE: { label: 'done', color: 'success', icon: <MarkCheck className='size-5 text-success md:size-7 ' /> }
} as const

export const PROJECT_BUTTONS = [{ key: 'donors', label: 'donors', path: APP_ROUTES.COMMON.DONATION }] as const

export const PROJECT_FIELDS = (t: (key: string) => string) => [
  { label: t('fieldProject'), type: 'text', placeholder: t('placeholderNameProject'), key: 'name_project' },
  { label: t('fieldRangeDate'), type: 'text', key: 'rangeDate' },
  { label: t('fieldTotalNumeric'), type: 'number', placeholder: t('placeholderTotalNumeric'), key: 'total_numeric' },
  { label: t('fieldDescription'), type: 'text', placeholder: t('placeholderDescription'), key: 'description' },
  { label: t('fieldContent'), type: 'text', placeholder: t('placeholderContent'), key: 'content' },
  { label: t('fieldImages'), type: 'text', placeholder: t('placeholderImages'), key: 'images' }
]
