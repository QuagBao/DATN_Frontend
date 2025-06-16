'use client'

import { useTranslation } from 'react-i18next'
import { Crimson } from 'public/assets/fonts/crimson'

import ItemPillar from '~/components/shared/item-pillars'

import { ListPillars } from './data'

const CorePillars = () => {
  const { t } = useTranslation('introduce')
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-5 px-5 py-10 md:px-40'>
      <div className={`text-center text-3xl font-bold text-ct-blue ${Crimson.className}`}>{t('pillarsTitle')}</div>
      <div className='text-center'>{t('pillarsPurpose')}</div>

      <div className='grid w-full grid-cols-1 items-center justify-center justify-items-center gap-5 lg:grid-cols-3'>
        {ListPillars.map((item) => (
          <ItemPillar title={item.title} leftSection={item.icon} description={item.description} />
        ))}
      </div>
    </div>
  )
}

export default CorePillars
