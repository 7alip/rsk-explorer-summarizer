export type ITransactionType = 'remasc' | 'contract call' | 'contract deploy' | 'normal' | 'bridge'

export type IMongoTransaction = {
  _id: string
  hash: string
  nonce: number
  blockHash: string
  blockNumber: number
  transactionIndex: number
  from: string
  to: string
  gas: number
  gasPrice: string
  value: string
  input: string
  v: string | null
  r: string | null
  s: string | null
  timestamp: number
  receipt: {
    transactionHash: string
    transactionIndex: number
    blockHash: string
    blockNumber: number
    cumulativeGasUsed: number
    gasUsed: number
    contractAddress: string | null
    from: string
    to: string
    root: string
    status: string
    logsBloom: string
  }
  txType: ITransactionType
  txId: string
}

type ITransactionTypeObj = { name: string; total: number; gas: number }

export type IGroupedTransaction = {
  _id: string
  gas: number
  transactions: ITransactionTypeObj[]
}

export interface ISummarizeTransaction {
  id: string
  gas: number
  [key: string]: string | number | { total: number; gas: number }
}
