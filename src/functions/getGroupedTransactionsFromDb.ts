import { Db } from 'mongodb'
import { IGroupedTransaction } from '../types/transactions'

/**
 *
 * @param db - database instance
 *
 * @returns promised transactions collection array grouped by date
 */
const getGroupedTransactionsFromDb = async (db: Db): Promise<IGroupedTransaction[]> => {
  return await db
    .collection('transactions')
    .aggregate([
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: {
                  $convert: {
                    input: {
                      $multiply: [1000, '$timestamp'],
                    },
                    to: 'date',
                  },
                },
              },
            },
            type: '$txType',
          },
          count: { $sum: 1 },
          // Cumulative gasUsed value of each type of transaction per day
          gas: { $sum: '$receipt.gasUsed' },
        },
      },
      {
        $group: {
          _id: '$_id.date',
          transactions: {
            $push: {
              name: '$_id.type',
              total: '$count',
              gas: '$gas',
            },
          },
          gas: {
            // Total gas used for all transaction types per day
            $sum: '$gas',
          },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ])
    .toArray()
}

export default getGroupedTransactionsFromDb
