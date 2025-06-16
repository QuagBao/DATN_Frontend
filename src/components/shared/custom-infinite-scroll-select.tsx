// File: src/components/ScrollSelect.tsx

'use client'

import { forwardRef, type Ref, type UIEvent, useState } from 'react'
import { type FieldError, type FieldErrorsImpl, type Merge, type UseFormRegisterReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, cn, Spinner } from '@heroui/react'
import ChevronDown from '@icons/chevron-down.svg'
import ChevronUp from '@icons/chevron-up.svg'
import { useInfiniteQuery } from '@tanstack/react-query'

import { projectApiRequest } from '~/api-requests'
import { API_URL } from '~/config/routes'
import { type TProjectsData } from '~/shared/validators/schemas/project/project.schema'

function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): React.RefCallback<T> {
  return (instance: T) => {
    refs.forEach((ref) => {
      if (!ref) return
      if (typeof ref === 'function') {
        ref(instance)
      } else {
        const mutableRef = ref as React.MutableRefObject<T | null>
        mutableRef.current = instance
      }
    })
  }
}

export type Option = { id: string; name: string }

interface CustomScrollSelectProps {
  register?: UseFormRegisterReturn
  validationErrorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl>
  placeholder?: string
  selectedId?: string
  onSelect: (opt: Option) => void
  pageSize?: number
}

const CustomInfiniteScrollSelect = forwardRef<HTMLButtonElement, CustomScrollSelectProps>(
  ({ register, validationErrorMessage, placeholder = 'Chọn dự án', selectedId, onSelect, pageSize = 10 }, ref) => {
    const { t } = useTranslation('validations')

    const registerRef = register?.ref
    const combinedRef = mergeRefs(ref, registerRef)

    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
      TProjectsData,
      unknown
    >({
      queryKey: [API_URL.PROJECT.PROJECT_IN_PROGRESS, pageSize],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await projectApiRequest.projectInProgress({
          page: String(pageParam),
          limit: String(pageSize)
        })
        return res.data
      },
      getNextPageParam: (last) => (last.page < last.total_pages ? last.page + 1 : undefined),
      initialPageParam: 1
    })
    const items = data ? data.pages.flatMap((page) => page.data) : []

    const [open, setOpen] = useState(false)

    const handleScrollInfinity = async (e: UIEvent<HTMLDivElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget
      if (hasNextPage && scrollTop + clientHeight >= scrollHeight - 5 && !isFetchingNextPage) {
        await fetchNextPage()
      }
    }

    const selectedItem = items.find((p) => p.id_project === selectedId)
    let buttonLabel = placeholder
    if (isLoading) {
      buttonLabel = 'Đang tải…'
    } else if (selectedItem) {
      buttonLabel = selectedItem.name_project
    }

    let endContent: React.ReactNode
    if (isLoading) {
      endContent = <Spinner size='sm' color='default' />
    } else {
      endContent = open ? <ChevronUp className='size-4' /> : <ChevronDown className='size-4' />
    }

    return (
      <div className='relative inline-block w-full'>
        <Button
          color='primary'
          ref={combinedRef}
          className={cn(
            `flex w-full items-center ${isLoading ? 'justify-center' : 'justify-between'}  border py-2`,
            validationErrorMessage
          )}
          onPress={() => setOpen((o) => !o)}
        >
          {buttonLabel}
          {endContent}
        </Button>

        {validationErrorMessage && <p className='ml-1 mt-2 text-sm text-danger'>{t(String(validationErrorMessage))}</p>}

        {open && (
          <div
            onScroll={handleScrollInfinity}
            className='absolute z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border bg-ct-white shadow'
            role='listbox'
            tabIndex={0}
            aria-activedescendant={selectedId ? `option-${selectedId}` : undefined}
          >
            {isError && (
              <div className='px-3 py-2 text-sm text-red-500'>
                {(error && typeof error === 'object' && 'message' in error
                  ? (error as { message?: string }).message
                  : undefined) || 'Lỗi khi tải dữ liệu'}
              </div>
            )}

            {!isLoading &&
              !isError &&
              items.map((p) => {
                const id = p.id_project
                const name = p.name_project
                const isSelected = id === selectedId
                return (
                  <div
                    key={id}
                    id={`option-${id}`}
                    role='option'
                    aria-selected={isSelected}
                    tabIndex={0}
                    className={cn(
                      'flex cursor-pointer px-3 py-2 text-sm text-ct-blue hover:bg-slate-300',
                      isSelected && 'bg-blue-100'
                    )}
                    onClick={() => {
                      onSelect({ id, name })
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onSelect({ id, name })
                      }
                    }}
                  >
                    {name}
                  </div>
                )
              })}

            {isFetchingNextPage && <div className='px-3 py-2 text-center text-sm text-gray-500'>Đang tải thêm…</div>}
          </div>
        )}
      </div>
    )
  }
)

export default CustomInfiniteScrollSelect
