import { Accordion, AccordionItem } from '@heroui/react'

import { formatTextWithLineBreaks } from '~/shared/utils/format-text.util'

interface InforFormProps {
  overview: string
}

const InforForm = ({ overview }: InforFormProps) => {
  return (
    <Accordion
      showDivider
      variant='splitted'
      itemClasses={{
        title: 'md:text-2xl text-lg font-bold text-ct-blue'
      }}
    >
      <AccordionItem key='1' aria-label='Giới thiệu' title='Giới thiệu'>
        <p className='py-2'>{formatTextWithLineBreaks(overview)}</p>
      </AccordionItem>
    </Accordion>
  )
}

export default InforForm
