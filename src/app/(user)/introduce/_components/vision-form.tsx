'use client'

import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { Crimson } from 'public/assets/fonts/crimson'

import reactI18n from '~/config/i18n/react-i18n'

const VisionForm = () => {
  const { t } = useTranslation('introduce', { i18n: reactI18n })
  return (
    <div className='grid h-full grid-cols-1 items-center gap-5 bg-ct-white px-5 py-10 md:grid-cols-2 md:px-40'>
      <div className='flex flex-col justify-center gap-5'>
        <div className={`text-3xl font-bold text-ct-blue ${Crimson.className}`}>{t('visionTitle')}</div>
        <div>{t('visionContent')}</div>
      </div>
      <div className='flex items-center justify-center md:justify-end'>
        <Image src='/assets/images/DHBK-Danang.jpg' alt='vision' width={450} height={450} className='rounded-md' />
      </div>
    </div>
  )
}

export default VisionForm
