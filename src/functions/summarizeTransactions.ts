import { IGroupedTransaction, ISummarizeTransaction } from '../types/transactions'

/**
 *
 * @param transactions - promised transactions array grouped by date
 *
 * @returns summarized transactions array
 */
const summarizeTransactions = (transactions: IGroupedTransaction[]): ISummarizeTransaction[] => {
  return transactions.map(({ _id, gas, transactions }) => {
    const transactionCounts = transactions.reduce((obj: Record<string, number>, item) => {
      obj[item.name.replace(/\s/g, '_')] = item.total
      return obj
    }, {})

    return { id: _id, gas, ...transactionCounts }
  })
}

export default summarizeTransactions
