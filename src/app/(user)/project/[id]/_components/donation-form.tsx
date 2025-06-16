import { Card, CardBody } from '@heroui/react'
import { Crimson } from 'public/assets/fonts/crimson'

import { colorClassNames } from '~/shared/constants/nextui-style.constant'
import { formatCurrency } from '~/shared/utils'

interface DonationFormProps {
  currentAmount: number
}

const DonationForm = ({ currentAmount }: DonationFormProps) => {
  return (
    <div className='space-y-5'>
      <Card
        radius='none'
        classNames={{
          base: 'bg-ct-white',
          body: 'space-y-3'
        }}
      >
        <CardBody>
          <p className={`${Crimson.className} text-lg font-bold text-ct-primary md:text-2xl`}>Tổng tiền quyên góp</p>
          <div className='flex items-center justify-between'>
            <p className={`${Crimson.className} ${colorClassNames.textColor} text-xl font-bold md:text-3xl`}>
              {formatCurrency(currentAmount)}
            </p>
            <p className='text-ct-secondary'>VNĐ</p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default DonationForm
