import { getUnixTime } from 'date-fns'
import { Cursor, Db } from 'mongodb'
import pMap from 'p-map'

import { IMongoStats } from '../types/stats'

/**
 *
 * @param db - database instance
 *
 * @returns promised stats collection array
 *
 */
const getStatsCollectionFromDb = async (db: Db): Promise<Cursor<IMongoStats>[]> => {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  const filter = (month: number) => ({
    timestamp: {
      $gte: getUnixTime(new Date(2020, month, 1)) * 1000,
      $lt: getUnixTime(new Date(2020, month + 1, 1)) * 1000,
    },
  })

  const mapper = async (month: number) => {
    console.log(`Getting ${month + 1}. month from the collection`)
    const collectionChunkPromise = db.collection('statsCollection').find(filter(month))

    return collectionChunkPromise
  }

  return pMap(months, mapper, { concurrency: 1 })
}

export default getStatsCollectionFromDb
