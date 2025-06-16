'use client'

import { useCallback, useState } from 'react'
import { Pagination, type SlotsToClasses } from '@heroui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { type TPaginationResponse } from '~/shared/validators'

export type PaginationProps = {
  paginationResponse: TPaginationResponse | undefined
  paginationClassNames?: SlotsToClasses<
    'wrapper' | 'base' | 'item' | 'prev' | 'next' | 'cursor' | 'forwardIcon' | 'ellipsis' | 'chevronNext'
  >
}

function PaginationComponent({ paginationResponse, paginationClassNames }: Readonly<PaginationProps>) {
  const pathName = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1)
  const rowsPerPage = Number(searchParams.get('limit')) || 10

  const pages = paginationResponse?.total_pages ?? 1

  const updateRouter = useCallback(
    (newPage: number, newLimit: number) => {
      const params = new URLSearchParams(window.location.search)
      params.set('page', String(newPage))
      params.set('limit', String(newLimit))
      router.push(`${pathName}?${params.toString()}`)
    },
    [pathName, router]
  )

  const handleChangePagination = useCallback(
    (selectedPage: number) => {
      setCurrentPage(selectedPage)
      updateRouter(selectedPage, rowsPerPage)
    },
    [rowsPerPage, updateRouter]
  )
  return (
    <Pagination
      isCompact
      showControls
      showShadow
      color='primary'
      page={currentPage}
      total={pages}
      onChange={handleChangePagination}
      classNames={paginationClassNames}
    />
  )
}

export default PaginationComponent
