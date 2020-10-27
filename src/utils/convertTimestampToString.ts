/**
 *
 * @param timestamp - timestamp as number
 *
 * @returns id string represents day date
 */
export default function convertTimestampToString(timestamp: number): string {
  const date = new Date(timestamp)
  const day = ('0' + date.getDate()).slice(-2)
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}
