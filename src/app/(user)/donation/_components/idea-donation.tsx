import { Textarea } from '@heroui/react'
import { Crimson } from 'public/assets/fonts/crimson'

import ScrollSelect from './scroll-select'

function IdeaDonation() {
  return (
    <form className='space-y-5'>
      <ScrollSelect />
      <Textarea
        classNames={{ label: `${Crimson.className} font-bold !text-ct-blue md:text-xl`, input: 'min-h-40' }}
        label='Nội dung ý tưởng'
        labelPlacement='outside'
        placeholder='Nhập nội dung...'
      />
    </form>
  )
}

export default IdeaDonation
