'use client'

import { type UIEvent, useState } from 'react'
import { Button, Spinner } from '@heroui/react'
import ChevronDown from '@icons/chevron-down.svg'
import ChevronUp from '@icons/chevron-up.svg'
import { useInfiniteQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { projectApiRequest } from '~/api-requests'
import { API_URL } from '~/config/routes'
import { type TProjectsData } from '~/shared/validators/schemas/project/project.schema'

type Option = { id: string; name: string }
function ScrollSelect() {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()
  const selectedId = searchParams.get('id') ?? ''
  const router = useRouter()
  const pathName = usePathname()

  const handleSelectedId = (id: string, name_project: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('id', id.toString())
    params.set('project', name_project.toString())
    router.replace(`${pathName}?${params.toString()}`)
    setOpen(false)
  }

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<TProjectsData>({
    queryKey: [API_URL.PROJECT.PROJECT_IN_PROGRESS],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await projectApiRequest.projectInProgress({ page: String(pageParam), limit: '5' })
      return res.data
    },
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.total_pages ? (lastPage.page + 1).toString() : undefined),
    initialPageParam: 1
  })

  const handleScrollInfinity = async (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target as HTMLDivElement

    if (scrollTop + clientHeight <= scrollHeight && !isFetchingNextPage) {
      await fetchNextPage()
    }
  }

  const items: Option[] = data
    ? data.pages.flatMap((page) => page.data.map((p) => ({ id: p.id_project, name: p.name_project })))
    : []

  const selectedItem = items.find((it) => it.id === selectedId)
  let buttonLabel = 'Chọn dự án'
  if (isLoading) {
    buttonLabel = 'Đang tải dữ liệu'
  } else if (selectedItem) {
    buttonLabel = selectedItem.name
  }

  let endContent
  if (isLoading) {
    endContent = <Spinner size='sm' color='default' />
  } else if (open) {
    endContent = <ChevronUp className='size-4' />
  } else {
    endContent = <ChevronDown className='size-4' />
  }

  return (
    <div className='relative inline-block w-full '>
      <Button className='w-full border py-2' endContent={endContent} color='primary' onPress={() => setOpen((o) => !o)}>
        {buttonLabel}
      </Button>

      {open && (
        <div
          onScroll={handleScrollInfinity}
          className='absolute z-50 mt-1 max-h-40 w-full overflow-y-auto border bg-ct-white shadow'
          role='listbox'
          tabIndex={0}
          aria-activedescendant={selectedId ? `option-${selectedId}` : undefined}
        >
          {items.map((opt, idx) => (
            <div
              key={opt.id}
              id={`option-${idx}`}
              role='option'
              aria-selected={selectedId === opt.id}
              tabIndex={0}
              className={`flex cursor-pointer flex-col gap-1 px-3 py-2 hover:bg-white ${selectedId === opt.id ? 'bg-blue-100' : ''}`}
              onClick={() => handleSelectedId(opt.id, opt.name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleSelectedId(opt.id, opt.name)
                }
              }}
            >
              {opt.name}
            </div>
          ))}

          {isFetchingNextPage && <div className='px-3 py-2 text-center text-sm text-gray-500'>Đang tải thêm…</div>}
        </div>
      )}
    </div>
  )
}

export default ScrollSelect
