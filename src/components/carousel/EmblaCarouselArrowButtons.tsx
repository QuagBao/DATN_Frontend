import type React from 'react'
import { type ComponentPropsWithRef } from 'react'
import { useCallback, useEffect, useState } from 'react'
import ChevronLeft from '@icons/chevron-left.svg'
import ChevornRight from '@icons/chevron-right.svg'
import { type EmblaCarouselType } from 'embla-carousel'

import { buttonClassNames } from '~/shared/constants/nextui-style.constant'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((embla: EmblaCarouselType) => {
    setPrevBtnDisabled(!embla.canScrollPrev())
    setNextBtnDisabled(!embla.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

type PropType = ComponentPropsWithRef<'button'>

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className={`embla__button embla__button--prev ${buttonClassNames.emblaCarouselButton}`}
      type='button'
      {...restProps}
    >
      <ChevronLeft className='size-5' />
      {children}
    </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className={`embla__button embla__button--next ${buttonClassNames.emblaCarouselButton}`}
      type='button'
      {...restProps}
    >
      <ChevornRight className='size-5' />
      {children}
    </button>
  )
}
