import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useInitSearchParams = (defaultParams: Record<string, string>) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(defaultParams).forEach(([key, value]) => {
      if (!params.has(key)) {
        params.set(key, value)
      }
    })

    if (searchParams.toString() !== params.toString()) {
      router.replace(`${pathName}?${params.toString()}`)
    }
  }, [defaultParams, pathName, router, searchParams])
}
