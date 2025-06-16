import { Chip, type ChipProps, cn } from '@heroui/react'
import { cva, type VariantProps } from 'class-variance-authority'

const chipVariants = cva(
  'max-w-fit min-w-min inline-flex items-center border-transparent justify-between box-border whitespace-nowrap px-2 py-1.5 rounded text-sm',
  {
    variants: {
      color: {
        default: 'border-gray-20 border-2 border-dashed text-gray-40 bg-transparent',
        green: 'text-green-60 bg-green-20',
        turquoise: 'text-turquoise-60 bg-turquoise-20',
        sky: 'text-sky-60 bg-sky-20',
        blue: 'text-blue-60 bg-blue-20',
        purple: 'text-purple-60 bg-purple-20',
        pink: 'text-pink-60 bg-pink-20',
        red: 'text-red-60 bg-red-20',
        orange: 'text-orange-60 bg-orange-20',
        yellow: 'text-yellow-60 bg-yellow-20',
        gray: 'text-gray-60 bg-gray-20'
      }
    },
    defaultVariants: {
      color: 'default'
    }
  }
)

export type TCustomChipColor =
  | 'default'
  | 'green'
  | 'turquoise'
  | 'sky'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'gray'

type TOmitColor<T> = Omit<T, 'color'>

interface ICustomChipProps extends TOmitColor<ChipProps>, VariantProps<typeof chipVariants> {
  color?: TCustomChipColor
  bgColor?: string
  textColor?: string
}

const CustomChip = ({ className, color: customColor = 'default', bgColor, textColor, ...props }: ICustomChipProps) => {
  const customStyle = {
    color: textColor,
    backgroundColor: bgColor,
    border: 'none'
  }
  return (
    <Chip
      className={cn(chipVariants({ color: customColor }), className)}
      classNames={{
        content: 'font-semibold text-sm'
      }}
      style={customStyle}
      {...props}
    />
  )
}

export default CustomChip
