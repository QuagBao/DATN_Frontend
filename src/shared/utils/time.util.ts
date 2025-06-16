import { format, parse } from 'date-fns'

export const formatTime = (time: string) => {
  return format(parse(time, 'HH:mm:ssX', new Date()), 'HH:mm')
}
