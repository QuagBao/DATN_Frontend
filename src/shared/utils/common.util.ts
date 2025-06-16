import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import envConfig from '~/config/env'

export function interpolateMessage(template: string, replacements: Record<string, string>): string {
  const templateKeys = template.match(/:[a-zA-Z0-9_]+/g) || []
  return templateKeys.reduce((acc, key) => {
    const cleanKey = key.substring(1)
    const replacement = Object.prototype.hasOwnProperty.call(replacements, cleanKey) ? replacements[cleanKey] : ''
    return acc.replace(new RegExp(key, 'g'), replacement)
  }, template)
}

export const normalizePath = (path: string) => {
  if (path === '/') return path
  return path.startsWith('/') ? path : `/${path}`
}

export const normalizeRoutes = (routes: Record<string, unknown> | (string | Record<string, unknown>)[]): string[] => {
  if (Array.isArray(routes)) {
    // If an array is passed, filter only string values (or handle nested objects if needed)
    let extractedRoutes: string[] = []
    routes.forEach((route) => {
      if (typeof route === 'string') {
        extractedRoutes.push(route)
      } else if (typeof route === 'object') {
        extractedRoutes = extractedRoutes.concat(normalizeRoutes(route))
      }
    })
    return extractedRoutes
  }

  let extractedRoutes: string[] = []
  Object.keys(routes).forEach((key) => {
    const value = routes[key]
    if (typeof value === 'string') {
      extractedRoutes.push(value)
    } else if (typeof value === 'object' && value !== null) {
      extractedRoutes = extractedRoutes.concat(normalizeRoutes(value as Record<string, unknown>))
    }
  })
  return extractedRoutes
}

export function generateRef(length = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charsLength = chars.length
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength))
  }
  return result
}

export const isClient = (): boolean => typeof window !== 'undefined'

export const resolveBaseURL = (baseURL?: string): string => {
  let resolvedBaseURLValue = ''
  if (baseURL === undefined) {
    resolvedBaseURLValue = envConfig.NEXT_PUBLIC_API_ENDPOINT
  } else if (baseURL === '') {
    resolvedBaseURLValue = envConfig.NEXT_PUBLIC_URL
  } else {
    resolvedBaseURLValue = baseURL
  }
  return resolvedBaseURLValue
}

export const getFullUrl = (url = '', baseUrl?: string): string => {
  const baseURL = resolveBaseURL(baseUrl)
  const cleanedUrl = url.startsWith('/') ? url.slice(1) : url
  const cleanedBaseUrl = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL
  return `${cleanedBaseUrl}/${cleanedUrl}`
}

export const convertEnumToArray = (numberEnum: Record<string, string | number>, type: 'number' | 'string') => {
  return Object.values(numberEnum).filter((value) => typeof value === type)
}

export const convertEnumToObject = (enumObj: Record<string, string | number>) => {
  return Object.keys(enumObj)
    .filter((key) => !Number.isNaN(Number(key))) // Chỉ lấy các keys là số
    .map((numericKey) => {
      const stringKey = enumObj[numericKey] // Lấy chuỗi từ giá trị số
      return {
        key: numericKey, // Giữ giá trị số làm key
        value: stringKey // Giữ chuỗi làm value
      }
    })
}

export const isValidImageSrc = (src: string | undefined | null | File): boolean => {
  if (!src) return false

  let imageSrc = src

  if (typeof imageSrc === 'string') {
    imageSrc = imageSrc.trim()
    if (!imageSrc) return false
    try {
      const url = new URL(imageSrc, window.location.origin)
      return url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'data:'
    } catch (_) {
      return imageSrc.startsWith('/') || imageSrc.startsWith('./') || imageSrc.startsWith('../')
    }
  } else if (imageSrc instanceof File) {
    return imageSrc.type.startsWith('image/')
  }

  return false
}

export const convertUrlToFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
  const response = await fetch(url)
  const blob = await response.blob()
  return new File([blob], filename, { type: mimeType })
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isNotNullOrUndefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('vi-VN').format(currency)
}

export function formatNumberToCompactStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value)
}

export function timestampToDateTime(timestamp: number) {
  return new Date(timestamp).toLocaleString()
}

export function formatValueMoney(value: number) {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}b`
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}m`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value
}

export const debounce = <T extends unknown[]>(fn: (...args: T) => void, ms = 1000) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: unknown, ...args: T) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

export function throttle<T extends unknown[]>(fn: (...args: T) => void, ms = 1000) {
  let lastTime = 0
  return function (...args: unknown[]) {
    const now = Date.now()
    if (now - lastTime >= ms) {
      fn(...(args as T))
      lastTime = now
    }
  }
}
