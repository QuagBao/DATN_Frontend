import { useSearchParams } from 'next/navigation'

const useFilteredSearchParams = () => {
  const searchParams = useSearchParams()
  return Object.fromEntries(Array.from(searchParams.entries()).filter(([, value]) => value !== ''))
}
export default useFilteredSearchParams
