import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import { useSearchParams } from 'next/navigation'

export type QueryConfig = Record<string, string> & {
  page?: string
  limit?: string
  sort_by?: string
  order?: string
  [key: string]: string | undefined
}

const useQueryConfig = (): QueryConfig => {
  const searchParams = useSearchParams()
  const queryParams: QueryConfig = Object.fromEntries(searchParams.entries()) as QueryConfig

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '10',
      sort_by: queryParams.sort_by,
      order: queryParams.order
    },
    isUndefined
  ) as QueryConfig

  return queryConfig
}

export default useQueryConfig
