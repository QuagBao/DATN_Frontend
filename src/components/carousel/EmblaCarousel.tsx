'use client'

import type React from 'react'
import { type EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

import envConfig from '~/config/env'

import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'

export type ListObject = {
  id_image: string
  url: string
}

export type PropType = {
  slides: ListObject[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [])

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

  return (
    <div className='relative flex h-full w-full flex-col items-center gap-5'>
      <div className='pinch-zoom touch-pan-y overflow-hidden' ref={emblaRef}>
        <div className='embla__container flex'>
          {slides.map((item) => (
            <div key={item.id_image} className='w-full flex-none transform' style={{ height: '480px' }}>
              <div>
                <Image
                  src={`${envConfig.NEXT_PUBLIC_IMAGE}${item.url}`}
                  alt={item.id_image}
                  className='w-screen object-cover lg:h-[480px]'
                  width={800}
                  height={800}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='embla__controls absolute inset-0 flex items-center justify-between p-4'>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  )
}

export default EmblaCarousel
