import { format, parseISO, differenceInDays, isAfter, isBefore } from 'date-fns'
import { id as localeId, enUS } from 'date-fns/locale'

type Lang = 'id' | 'en'

function getLocale(lang: Lang) {
  return lang === 'en' ? enUS : localeId
}

export function formatDate(dateStr: string, lang: Lang = 'id', pattern = 'd MMMM yyyy'): string {
  try {
    return format(parseISO(dateStr), pattern, { locale: getLocale(lang) })
  } catch {
    return dateStr
  }
}

export function formatDateRange(start: string, end: string, lang: Lang = 'id'): string {
  try {
    const s = parseISO(start)
    const e = parseISO(end)
    const locale = getLocale(lang)
    if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
      return `${format(s, 'd', { locale })} - ${format(e, 'd MMMM yyyy', { locale })}`
    }
    return `${format(s, 'd MMM', { locale })} - ${format(e, 'd MMM yyyy', { locale })}`
  } catch {
    return `${start} - ${end}`
  }
}

export function getDaysUntil(dateStr: string): number {
  return differenceInDays(parseISO(dateStr), new Date())
}

export function isUpcoming(dateStr: string): boolean {
  return isAfter(parseISO(dateStr), new Date())
}

export function isPast(dateStr: string): boolean {
  return isBefore(parseISO(dateStr), new Date())
}

export function formatTimestamp(ts: number, lang: Lang = 'id', pattern = 'd MMMM yyyy'): string {
  try {
    return format(new Date(ts), pattern, { locale: getLocale(lang) })
  } catch {
    return String(ts)
  }
}
