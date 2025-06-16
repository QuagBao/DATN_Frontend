// client-i18n.utils.ts
import reactI18n from '~/config/i18n/react-i18n'

import { interpolateMessage } from './common.util'

export function i18nMessageInterpolation<T extends PropertyKey>(
  namespace: string,
  template: string,
  replacements?: Record<T, string | Record<string, string>>
): string {
  if (typeof window === 'undefined') return template

  const message = reactI18n.t(`${namespace}:message.${template}`) || template
  const languages = Object.keys(replacements || {}).reduce<string[]>((acc, key) => {
    let newAcc = { ...acc }
    const replacement = replacements && replacements[key as T]
    if (typeof replacement === 'object') {
      newAcc = Object.keys(replacement)
    }
    return newAcc
  }, [])
  const language = languages.includes(reactI18n.language) ? reactI18n.language : 'en'
  const translatedReplacements = Object.keys(replacements || {}).reduce<Record<string, string>>((acc, key) => {
    const replacement = replacements && replacements[key as T]
    const newAcc = { ...acc }
    if (typeof replacement === 'string') {
      newAcc[key] = replacement
    } else if (typeof replacement === 'object') {
      newAcc[key] = replacement[language] || (replacement as unknown as string)
    }
    return newAcc
  }, {})
  const result = interpolateMessage(message, translatedReplacements)
  return result
}
