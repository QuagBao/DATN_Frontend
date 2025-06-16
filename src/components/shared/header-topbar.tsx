import { useState } from 'react'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import ChevronDown from '@icons/chevron-down.svg'
import ChevronUp from '@icons/chevron-up.svg'
import Link from 'next/link'

import { DROP_ITEMS, type DropItem } from '~/shared/constants/drop-items'

const HeaderTopBar = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)

  const renderTopbarItem = (item: DropItem, index: number, style?: string) => {
    // Kiểm tra xem có ít nhất một mục con nào có đường dẫn mà người dùng có quyền truy cập không
    const isVisibleAccordion = item.items?.some((subItem) => subItem.path)
    const isOpen = openDropdownIndex === index
    if (item.path && !item.items) {
      return (
        <Button
          as={Link}
          href={item.path}
          className={`${style} min-w-20 rounded-lg bg-transparent px-4 py-6 text-ct-blue hover:bg-slate-200`}
        >
          <div className='text-sm font-medium'>{item.label}</div>
        </Button>
      )
    }

    return (
      isVisibleAccordion && (
        <div onMouseEnter={() => setOpenDropdownIndex(index)} onMouseLeave={() => setOpenDropdownIndex(null)}>
          <Popover isOpen={isOpen}>
            <PopoverTrigger>
              <Button
                className='min-w-20 gap-1 bg-transparent px-4 text-ct-blue hover:!bg-slate-200 hover:!opacity-100'
                radius='sm'
                size='lg'
                variant='light'
                as={Link}
                href={item.path}
                endContent={
                  isOpen ? (
                    <ChevronUp className='size-3 text-ct-blue' />
                  ) : (
                    <ChevronDown className='size-3 text-ct-blue' />
                  )
                }
              >
                <p className='text-sm font-medium'>{item.label}</p>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='flex flex-col justify-items-start gap-1 p-3'>
                {item.items ? item.items.map((subItem, i) => renderTopbarItem(subItem, i, 'justify-start')) : null}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )
    )
  }
  return (
    <div className='hidden items-center gap-1 lg:flex'>
      {DROP_ITEMS.map((item, idx) => renderTopbarItem(item, idx))}
    </div>
  )
}

export default HeaderTopBar
