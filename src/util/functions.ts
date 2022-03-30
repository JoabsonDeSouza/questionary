export const dateToString = (date: Date): string => {
  if (!date) return ''

  const option: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    hour12: true,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }
  const locale = 'pt-br'
  return new Date(date).toLocaleDateString(locale, option)
}
