/**
 *
 * @param timestamp - timestamp as number
 *
 * @returns id string represents day date
 */
export default function convertTimestampToString(timestamp: number, dateType?: 'day' | 'month'): string {
  const date = new Date(timestamp)
  const day = ('0' + date.getDate()).slice(-2)
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const year = date.getFullYear()

  if (dateType === 'month') {
    return `${year}-${month}`
  }

  return `${year}-${month}-${day}`
}
