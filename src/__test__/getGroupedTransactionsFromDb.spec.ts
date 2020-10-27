import { Db, MongoClient } from 'mongodb'
import { getGroupedTransactionsFromDb } from '../functions'

import mockTransactions from '../mock/transactions.json'

const URL = 'mongodb://localhost:27017'
const DB_NAME = 'blockDB_1_1_5'

describe('group transactions', () => {
  let client: MongoClient
  let db: Db

  beforeAll(async () => {
    client = await MongoClient.connect(URL, { useUnifiedTopology: true })
    db = client.db(DB_NAME)
  })

  afterAll(async () => {
    await client.close()
  })

  test('should match transaction remasc values', async () => {
    console.log('Aggregating all the transactions will take some time!')
    const transactions = await getGroupedTransactionsFromDb(db)
    const firstRemascValue = transactions[0].transactions.find((tsx) => tsx.name === 'remasc')?.total
    const mockFirstRemascValue = mockTransactions[0].transactions.find((tsx) => tsx.name === 'remasc')?.total

    expect(firstRemascValue).toBe(mockFirstRemascValue)
  }, 200000)
})
