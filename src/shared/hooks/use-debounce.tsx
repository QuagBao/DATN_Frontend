import { useEffect, useState } from 'react'

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(timeout)
  }, [delay, value])

  return debouncedValue
}

export default useDebounce
