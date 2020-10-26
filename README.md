# RSK Metrics Summarizer

## Summarizing Transactions

1. Transaction data structure in database

```ts
type IMongoTransaction = {
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
```

2. Grouped Transaction Structure

```ts
type IGroupedTransaction = {
  _id: string
  gas: number
  transactions: { name: string; total: number }[]
}
```

3. Summarized Transaction Structure

```ts
export type ISummarizeTransaction = {
  id: string
  gas: number
  contract_call?: number
  contract_deploy?: number
  bridge?: number
  remasc?: number
  normal?: number
}
```

## Summarizing Stats

1. Stats Structure in database

```ts
type IMongoStats = {
  _id: string
  circulating: {
    circulatingSupply: string
    totalSupply: number
    bridgeBalance: string
  } | null
  timestamp: number
  hashrate: number
  activeAccounts: number
}
```

2. Grouped and Summarized Stats Structure

```ts
export type ISummaryStats = {
  id: string // %Y-%m-%d
  hashrate: number
  activeAccounts: number
  circulatingSupply: number
}
;``
```
