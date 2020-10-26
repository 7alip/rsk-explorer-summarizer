import summarizeTransactions from '../functions/summarizeTransactions'
import mockTransactionsData from '../mock/transactions.json'

const expectingResult = {
  id: '2020-09-04',
  contract_call: 3076,
  normal: 44,
  remasc: 2559,
  contract_deploy: 5,
  bridge: 353,
  gas: 288689465,
}

describe('summarize transactions', () => {
  it('should summary transactions', () =>
    expect(summarizeTransactions(mockTransactionsData)[0]).toStrictEqual(expectingResult))
})
