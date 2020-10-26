import { Db } from 'mongodb'
import { IMongoStats } from '../types/stats'

/**
 *
 * @param db - database instance
 *
 * @returns promised stats collection array
 *
 */
const getStatsFromDb = async (db: Db): Promise<IMongoStats[]> => {
  const stats = await db.collection('statsCollection').find().toArray()
  return stats
}

export default getStatsFromDb
