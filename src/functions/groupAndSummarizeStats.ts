import { IMongoStats, IStastSummaryObject, ISummaryStats } from '../types/stats'
import { format } from 'date-fns'

/**
 *
 * @param statsData - promised stats collection array
 *
 * @returns summarized stats array
 */
const groupAndSummarizeStats = (statsData: IMongoStats[]): ISummaryStats[] => {
  const statsSummary: IStastSummaryObject = statsData.reduce((obj: IStastSummaryObject, item) => {
    const date = format(item.timestamp, 'yyyy-MM-dd')
    const month = format(item.timestamp, 'yyyy-MM')
    const numberOfEntries = obj[date]?.numberOfEntries || 0

    const prevActiveAccounts = obj[date]?.activeAccounts || 0
    const currentActiveAccounts = item.activeAccounts
    const maxActiveAccounts = Math.max(prevActiveAccounts, currentActiveAccounts)

    const prevCirculatingSupply = obj[date]?.circulatingSupply || 0
    const currentCirculatingSupply = Number(item.circulating?.circulatingSupply) || 0
    const maxCirculatingSupply = Math.max(currentCirculatingSupply, prevCirculatingSupply)

    const currentHashrate = item.hashrate
    const prevAvgHashrate = obj[date]?.hashrate || 0
    const avgHashrate = (prevAvgHashrate * numberOfEntries + currentHashrate) / (numberOfEntries + 1)

    // Update existing summary object
    if (obj[date]) {
      obj[date].hashrate = avgHashrate
      obj[date].activeAccounts = maxActiveAccounts
      obj[date].circulatingSupply = maxCirculatingSupply
      obj[date].month = month
      obj[date].numberOfEntries = numberOfEntries + 1
    } else {
      // Create new summary object
      obj[date] = {
        hashrate: avgHashrate,
        activeAccounts: maxActiveAccounts,
        circulatingSupply: maxCirculatingSupply,
        month,
        numberOfEntries: 1,
      }
    }

    return obj
  }, {})

  return Object.entries(statsSummary).map(
    ([key, { month, hashrate, activeAccounts, circulatingSupply, numberOfEntries }]) => ({
      id: key,
      month,
      hashrate,
      activeAccounts,
      circulatingSupply,
      numberOfEntries,
    }),
  )
}

export default groupAndSummarizeStats
