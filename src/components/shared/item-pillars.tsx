import { Card, CardBody, CardHeader } from '@heroui/react'

import { colorClassNames } from '~/shared/constants/nextui-style.constant'
import { cn } from '~/shared/utils'

interface IProps {
  title: string
  titleClassName?: string
  leftSection?: React.ReactNode
  description: string
}

const ItemPillar = (props: IProps) => {
  const { title, titleClassName, leftSection, description } = props

  return (
    <Card
      radius='lg'
      classNames={{
        base: `${colorClassNames.bgColor} w-full max-w-[350px] p-5 h-full text-ct-white`
      }}
    >
      <CardHeader>
        <div className='flex w-full items-center gap-5'>
          {leftSection && <div className='rounded-full bg-ct-white p-2 opacity-80'>{leftSection}</div>}
          <h1 className={cn('text-center text-base font-bold text-ct-white md:text-xl', titleClassName)}>{title}</h1>
        </div>
      </CardHeader>
      <CardBody>{description}</CardBody>
    </Card>
  )
}

export default ItemPillar
