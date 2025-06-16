import { isAfter, parse, setDay, setHours, setMinutes } from 'date-fns'
import { enGB as en, ja, vi } from 'date-fns/locale'
import { format } from 'date-fns-tz'

import { type TTimeObject } from '../validators/schemas/date/date.schema'

/**
 * Format a date string from ISO format to different formats based on the local time zone.
 * @param isoString - The ISO date string to format.
 * @param timeZone - The time zone identifier (e.g., 'Asia/Tokyo', 'America/New_York').
 * @returns The formatted date string.
 */
export const formatDateFromISO = (isoString: string): string => {
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) {
    return 'Invalid date'
  }
  return format(date, 'dd/MM/yyyy HH:mm:ss')
}

export const compareTime = (start: string | TTimeObject, end: string | TTimeObject): boolean => {
  const startDate =
    typeof start === 'string'
      ? parse(start, 'HH:mm', new Date())
      : setMinutes(setHours(new Date(), start.hour), start.minute)
  const endDate =
    typeof end === 'string' ? parse(end, 'HH:mm', new Date()) : setMinutes(setHours(new Date(), end.hour), end.minute)
  return isAfter(endDate, startDate)
}

/**
 * Chuyển đổi đối tượng thời gian thành chuỗi định dạng "HH:mm"
 * @param timeObj Đối tượng thời gian với thuộc tính hour và minute
 * @returns Chuỗi thời gian định dạng "HH:mm"
 */
export const formatObjTimeToTimeString = (timeObj: {
  hour: number
  minute: number
  second: number
  millisecond: number
}): string => {
  return format(setMinutes(setHours(new Date(), timeObj.hour), timeObj.minute), 'HH:mm')
}

/**
 * Phân tích chuỗi thời gian "HH:mm" thành đối tượng thời gian
 * @param timeStr Chuỗi thời gian định dạng "HH:mm"
 * @returns Đối tượng thời gian với thuộc tính hour và minute
 */
export const parseTimeStringToObjTime = (timeStr: string | TTimeObject | null): TTimeObject | null => {
  //! chưa check trường hợp !HH:mm
  if (!timeStr) return null

  if (typeof timeStr === 'object') {
    return timeStr
  }

  const [hour, minute] = timeStr.split(':').map(Number)
  return { hour, minute, second: 0, millisecond: 0 }
}

export const convertTimeObjectToDate = (time: TTimeObject | null): Date | null => {
  if (!time) return null
  return setMinutes(setHours(new Date(), time.hour), time.minute)
}

export function formatDayNameByLanguage(dayNumber: number, language: string): string {
  const baseDate = new Date()

  const adjustedDate = setDay(baseDate, dayNumber)

  switch (language) {
    case 'en':
      return format(adjustedDate, 'EEEE', { locale: en })
    case 'ja':
      return format(adjustedDate, 'EEEE', { locale: ja })
    default:
      return format(adjustedDate, 'EEEE', { locale: vi })
  }
}

export function formatDateByLanguage(isoString: string, language: string): string {
  switch (language) {
    case 'en':
      return format(new Date(isoString), 'EEEE, MMMM do, yyyy', {
        locale: en
      })
    case 'ja':
      return format(new Date(isoString), 'EEEE, yyyy年M月d日', {
        locale: ja
      })
    default:
      return format(new Date(isoString), 'EEEE, dd/M/yyyy', {
        locale: vi
      })
  }
}

export function formatDateTimeByLanguage(isoString: string, language: string): string {
  switch (language) {
    case 'en':
      return format(new Date(isoString), "EEEE, MMMM do, yyyy 'at' h:mm a", {
        locale: en
      })
    case 'ja':
      return format(new Date(isoString), 'EEEE, yyyy年M月d日 H時mm分', {
        locale: ja
      })
    default:
      return format(new Date(isoString), "EEEE, 'ngày' dd 'tháng' M, yyyy 'lúc' HH:mm", {
        locale: vi
      })
  }
}
