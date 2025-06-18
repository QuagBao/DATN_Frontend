'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Accordion, AccordionItem, type AccordionItemIndicatorProps, cn, Tooltip } from '@heroui/react'
import ChevronLeft from '@icons/chevron-left.svg'
import ChevronRight from '@icons/chevron-right.svg'
import Dot from '@icons/dot.svg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import CustomLoadingSidebarSkeleton from '~/components/shared/custom-loading-sidebar-skeleton'
import reactI18n from '~/config/i18n/react-i18n'
import { useAuth } from '~/config/providers/auth.provider'
import { MAIN_SIDEBAR_ITEMS, type SidebarItem } from '~/shared/constants/sidebar-items'

// Component hiển thị biểu tượng mũi tên cho Accordion (mở/đóng)
const Indicator = ({ isOpen = false }: AccordionItemIndicatorProps) => {
  return isOpen ? (
    <ChevronLeft className='size-3 text-foreground' />
  ) : (
    <ChevronRight className='size-3 text-foreground' />
  )
}

const MainSidebar = () => {
  const pathname = usePathname()
  const { isLoadingPermission } = useAuth()
  const { t } = useTranslation('main-sidebar', { i18n: reactI18n })
  // const accountType = userInfo?.account_type || ''

  const [isExpanded, setIsExpanded] = useState(true)

  if (isLoadingPermission) return <CustomLoadingSidebarSkeleton />

  const renderSidebarItem = (item: SidebarItem, index: number) => {
    const expandedKeys = MAIN_SIDEBAR_ITEMS.filter((sidebarItem) =>
      sidebarItem.items?.some((subItem) => subItem.path === pathname)
    ).map((sidebarItem) => sidebarItem.label)

    if (item.path) {
      const isActive = pathname === item.path

      return (
        <Tooltip
          key={item.label}
          closeDelay={250}
          color='foreground'
          content={t(`main-sidebar:${item.label}`)}
          className={cn(isExpanded && 'hidden')}
        >
          <Link
            href={item.path}
            passHref
            className={cn(
              'flex items-center whitespace-nowrap rounded p-2 transition hover:bg-default-200',
              isActive && 'bg-default-200',
              isExpanded ? 'justify-start gap-3' : 'justify-center'
            )}
          >
            {!item.icon && (
              <span className='shrink'>
                <Dot className={cn('size-2', isActive ? 'text-success' : 'text-ct-secondary')} />
              </span>
            )}
            {item.icon && <span className='shrink'>{item.icon}</span>}
            <div className={cn('text-sm font-medium', !isExpanded && 'hidden')}>{t(`main-sidebar:${item.label}`)}</div>
          </Link>
        </Tooltip>
      )
    }

    return (
      <Tooltip
        key={index}
        closeDelay={250}
        color='foreground'
        content={t(`main-sidebar:${item.label}`)}
        className={cn(isExpanded && 'hidden')}
      >
        {/* {isVisibleAccordion && ( */}
        <Accordion defaultExpandedKeys={expandedKeys} className='px-0'>
          <AccordionItem
            key={item.label}
            classNames={{
              title: cn('text-sm font-medium text-foreground whitespace-nowrap', !isExpanded && 'w-0 opacity-0'),
              trigger: 'py-0 gap-2',
              heading: 'p-2',
              content: cn('space-y-2', isExpanded ? 'ml-2' : 'py-0'),
              indicator: !isExpanded && 'hidden'
            }}
            title={t(`main-sidebar:${item.label}`)}
            startContent={item.icon}
            indicator={Indicator}
          >
            {isExpanded && item.items?.map((subItem, i) => renderSidebarItem(subItem, i))}
          </AccordionItem>
        </Accordion>
        {/* )} */}
      </Tooltip>
    )
  }

  return (
    <div
      className={cn(
        'relative flex h-full w-[250px] flex-col border-r bg-content1 px-2 pt-2 transition-all duration-400 light:border-gray-200 dark:border-gray-700',
        { 'w-[100px]': !isExpanded }
      )}
    >
      <div
        className='absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full border bg-content1 p-2 light:border-gray-200 dark:border-gray-700'
        role='button'
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronLeft className='size-4 text-foreground' />
        ) : (
          <ChevronRight className='size-4 text-foreground' />
        )}
      </div>
      <div className='mx-auto my-2 flex max-w-full flex-col items-center justify-center gap-1'>
        <div className='grid grid-cols-2 items-center justify-center gap-5'>
          <Image src='/assets/images/logo_dhbk.jpg' alt='logo' width={50} height={0} />
          <Image src='/assets/images/logo_50_nam.png' alt='logo' width={50} height={0} />
          <Image src='/assets/images/logo_doan.png' alt='logo' width={50} height={0} />
          <Image src='/assets/images/logo_hoi_sv.png' alt='logo' width={50} height={0} />
        </div>
        <div className={cn('text-center font-bold text-ct-blue md:text-xl', !isExpanded && 'text-base md:text-base')}>
          BK Hope
        </div>
      </div>
      <div className='my-2 flex flex-col space-y-2 overflow-x-hidden [&>p]:hidden'>
        {MAIN_SIDEBAR_ITEMS.map(renderSidebarItem)}
      </div>
    </div>
  )
}

export default MainSidebar
