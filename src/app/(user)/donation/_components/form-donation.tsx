'use client'

import { Divider } from '@heroui/react'
import { Tab, Tabs } from '@heroui/tabs'
import { type Key } from '@react-types/shared'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Crimson } from 'public/assets/fonts/crimson'

import { tabsDonation } from '~/shared/constants/donation'
import { tabsClassNames } from '~/shared/constants/nextui-style.constant'

function FormDonation() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()
  const selectedTab = searchParams.get('tab') ?? 'money'

  const handleChangeTab = (key: Key) => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', key.toString())
    router.replace(`${pathName}?${params.toString()}`)
  }

  return (
    <div className='space-y-5 '>
      <p className={`${Crimson.className} text-lg font-bold text-ct-blue md:text-2xl `}>Cách thức ủng hộ</p>
      <Divider />
      <Tabs
        selectedKey={selectedTab}
        defaultSelectedKey='money'
        onSelectionChange={handleChangeTab}
        classNames={{
          base: tabsClassNames.base,
          tabList: tabsClassNames.tabList,
          tab: tabsClassNames.tab,
          tabContent: tabsClassNames.tabContent,
          cursor: tabsClassNames.cursor
        }}
      >
        {tabsDonation.map((item) => (
          <Tab
            key={item.titleValue}
            title={
              <div className='items-center gap-2 sm:grid sm:grid-cols-[1fr_.25fr]'>
                <p className='text-wrap'>{item.label}</p>
                {item.icon}
              </div>
            }
            titleValue={item.titleValue}
          >
            {item.component}
          </Tab>
        ))}
      </Tabs>
    </div>
  )
}

export default FormDonation
