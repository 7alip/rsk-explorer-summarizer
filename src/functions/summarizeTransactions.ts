import { IGroupedTransaction, ISummarizeTransaction } from '../types/transactions'

/**
 *
 * @param transactions - promised transactions array grouped by date
 *
 * @returns summarized transactions array
 */
const summarizeTransactions = (groupedTransactions: IGroupedTransaction[]): ISummarizeTransaction[] => {
  return groupedTransactions.map(({ _id, gas, transactions }) => {
    const transactionCounts = transactions.reduce(
      (obj: Record<string, { total: number; gas: number }>, { name, total, gas }) => {
        obj[name.replace(/\s/g, '_')] = { total, gas }
        return obj
      },
      {},
    )

    return { id: _id, month: _id.slice(0, 7), gas, ...transactionCounts }
  })
}

export default summarizeTransactions
