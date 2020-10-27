import getAverageValue from '../utils/getAverageValue'
import convertTimestampToString from '../utils/convertTimestampToString'
import { IMongoStats, IStastSummaryObject, ISummaryStats } from '../types/stats'

/**
 *
 * @param statsData - promised stats collection array
 *
 * @returns summarized stats array
 */
const groupAndSummarizeStats = (statsData: IMongoStats[]): ISummaryStats[] => {
  const statsSummary: IStastSummaryObject = statsData.reduce((obj: IStastSummaryObject, item, index) => {
    const date = convertTimestampToString(item.timestamp)
    const month = convertTimestampToString(item.timestamp, 'month')

    const prevActiveAccounts = obj[date]?.activeAccounts || 0
    const currentActiveAccounts = item.activeAccounts
    const maxActiveAccounts = Math.max(prevActiveAccounts, currentActiveAccounts)

    const prevCirculatingSupply = obj[date]?.circulatingSupply || 0
    const currentCirculatingSupply = Number(item.circulating?.circulatingSupply) || 0
    const maxCirculatingSupply = Math.max(currentCirculatingSupply, prevCirculatingSupply)

    const currentHashrate = item.hashrate
    const prevAvgHashrate = obj[date]?.hashrate || 0
    const avgHashrate = getAverageValue(prevAvgHashrate, currentHashrate, index)

    // Update existing summary object
    if (obj[date]) {
      obj[date].hashrate = avgHashrate
      obj[date].activeAccounts = maxActiveAccounts
      obj[date].circulatingSupply = maxCirculatingSupply
      obj[date].month = month
    } else {
      // Create new summary object
      obj[date] = {
        hashrate: avgHashrate,
        activeAccounts: maxActiveAccounts,
        circulatingSupply: maxCirculatingSupply,
        month,
      }
    }

    return obj
  }, {})

  return Object.entries(statsSummary).map(([key, { month, hashrate, activeAccounts, circulatingSupply }]) => ({
    id: key,
    month,
    hashrate,
    activeAccounts,
    circulatingSupply,
  }))
}

export default groupAndSummarizeStats
