import summarizeStats from '../functions/summarizeStats'
import mockStatsData from '../mock/stats.json'

const expectingResult = [
  {
    id: '2020-09-04',
    hashrate: 502.8,
    activeAccounts: 15,
    circulatingSupply: 200,
  },
]

describe('summarize stats', () => {
  it('should summary data', () => expect(summarizeStats(mockStatsData)).toStrictEqual(expectingResult))
})
