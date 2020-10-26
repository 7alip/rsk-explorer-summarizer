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
  txType: 'remasc' | 'contract call' | 'normal' | 'bridge'
  txId: string
}

export type IGroupedTransaction = {
  _id: string
  gas: number
  transactions: { name: string; total: number }[]
}

export type ISummarizeTransaction = {
  id: string
  gas: number
  contract_call?: number
  contract_deploy?: number
  bridge?: number
  remasc?: number
  normal?: number
}
