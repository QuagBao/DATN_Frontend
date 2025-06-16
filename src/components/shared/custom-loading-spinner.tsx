import { Spinner } from '@heroui/react'

import { cn } from '~/shared/utils'

interface ICustomLoadingSpinnerProps {
  fixed?: boolean
}

const CustomLoadingSpinner = ({ fixed = false }: ICustomLoadingSpinnerProps) => {
  return (
    <div className={cn(`inset-0 z-50 flex cursor-wait items-center justify-center`, fixed && 'fixed', 'bg-opacity-90')}>
      <div className='absolute inset-0 bg-opacity-20' />
      <div className='relative z-50'>
        <Spinner variant='spinner' size='lg' />
      </div>
    </div>
  )
}

export default CustomLoadingSpinner
