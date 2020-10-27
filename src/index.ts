import { Db, MongoClient } from 'mongodb'

import {
  getGroupedTransactionsFromDb,
  summarizeTransactions,
  groupAndSummarizeStats,
  getStatsCollectionFromDb,
} from './functions'
import writeFile from './utils/writeFile'

const URL = 'mongodb://localhost:27017'
const DB_NAME = 'blockDB_1_1_5'

;(async function start() {
  const client = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  await client.connect()
  const db: Db = client.db(DB_NAME)

  console.time('Getting all stats took: ')
  const allStats = await getStatsCollectionFromDb(db)
  console.timeEnd('Getting all stats took: ')

  const statsResult = groupAndSummarizeStats(allStats)
  writeFile('result-stats', statsResult)

  console.time('Grouping transactions took: ')
  const groupedTransactions = await getGroupedTransactionsFromDb(db)
  console.timeEnd('Grouping transactions took: ')

  const transactionsResult = summarizeTransactions(groupedTransactions)
  writeFile('result-transactions', transactionsResult)

  await client.close()
  process.exit(0)
})()
