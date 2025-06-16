import Check from '@icons/check.svg'
import { Crimson } from 'public/assets/fonts/crimson'

import { GUIDANCE_DONATION } from '~/shared/constants/donation'

function Guidance() {
  return (
    <div className='h-fit space-y-6 bg-ct-white px-5 py-3'>
      <p className={`${Crimson.className} text-2xl font-bold text-ct-primary`}>Việc bạn có thể làm</p>
      {GUIDANCE_DONATION.map((item) => (
        <div className='grid grid-cols-[0.25fr_auto] gap-2'>
          <Check className='size-5 text-ct-blue' />
          <p className='font-semibold'>
            {item.label}&nbsp;
            <span className='font-normal'>{item.description}</span>
          </p>
        </div>
      ))}
    </div>
  )
}

export default Guidance
