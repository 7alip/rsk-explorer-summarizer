import { groupAndSummarizeStats } from '../functions'
import mockStatsData from '../mock/stats.json'

const expectingResult = [
  {
    id: '2020-09-04',
    month: '2020-09',
    hashrate: 502.8,
    activeAccounts: 15,
    circulatingSupply: 200,
    count: 5,
  },
]

describe('group and summarize stats', () => {
  it('should group stats data by day and summarize it', () =>
    expect(groupAndSummarizeStats(mockStatsData)).toStrictEqual(expectingResult))
})
