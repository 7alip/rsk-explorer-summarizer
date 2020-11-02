import { Db, MongoClient } from 'mongodb'

import {
  getGroupedTransactionsFromDb,
  summarizeTransactions,
  groupAndSummarizeStats,
  getStatsCollectionFromDb,
} from './functions'
import writeFile from './utils/writeFile'
import { ISummaryStats } from 'types/stats'

const URL = 'mongodb://localhost:27017'
const DB_NAME = 'blockDB_1_1_5'

;(async function start() {
  const client = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  await client.connect()
  const db: Db = client.db(DB_NAME)

  const statsPromises = await getStatsCollectionFromDb(db)

  const statsResultArr: ISummaryStats[] = []

  console.log('Start resolving all stats promises and writing into individual files')
  await Promise.all(
    statsPromises.map(async (statsPromise, i) => {
      const stats = await statsPromise.toArray()
      const statsSummary = groupAndSummarizeStats(stats)

      if (statsSummary[0]) {
        console.log(`Writing ${i + 1}. stats`)
        const monthStr = statsSummary[0].id.substr(0, 7) // yyyy-MM-dd
        writeFile('stats/stats_' + monthStr, statsSummary)
        statsResultArr.push(...statsSummary)
      }
    }),
  )

  writeFile('result-stats', statsResultArr)

  console.log('All stats files has been written succesfully!')

  console.time('Grouping transactions took: ')
  const groupedTransactions = await getGroupedTransactionsFromDb(db)
  console.timeEnd('Grouping transactions took: ')

  const transactionsResult = summarizeTransactions(groupedTransactions)
  writeFile('result-transactions', transactionsResult)

  await client.close()
  process.exit(0)
})()
