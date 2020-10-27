import { summarizeTransactions } from '../functions'
import mockTransactionsData from '../mock/transactions.json'

const expectingResult = {
  id: '2020-09-04',
  month: '2020-09',
  contract_call: { total: 3076, gas: 1 },
  normal: { total: 44, gas: 2 },
  remasc: { total: 2559, gas: 0 },
  contract_deploy: { total: 5, gas: 3 },
  bridge: { total: 353, gas: 4 },
  gas: 10,
}

describe('summarize transactions', () => {
  it('should summary transactions', () =>
    expect(summarizeTransactions(mockTransactionsData)[0]).toStrictEqual(expectingResult))
})
