import { Db, MongoClient } from 'mongodb'
import getTransactionsFromDb from '../functions/getTransactionsFromDb'

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

  test('should group transactions', async () => {
    const transactions = await getTransactionsFromDb(db)
    const firstRemascValue = transactions[0].transactions.find((tsx) => tsx.name === 'remasc')?.total
    const mockFirstRemascValue = mockTransactions[0].transactions.find((tsx) => tsx.name === 'remasc')?.total

    expect(firstRemascValue).toBe(mockFirstRemascValue)
  }, 200000)
})
