export function formatDate(dateInput?: string | number | Date): string {
  const date = dateInput ? new Date(dateInput) : new Date()

  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })

  const parts = formatter.formatToParts(date)

  const formattedDate = `${parts[0].value}-${parts[2].value}-${parts[4].value} ${parts[6].value}:${parts[8].value}${parts[10].value.toLowerCase()}`

  return formattedDate
}
