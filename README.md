# RSK Metrics Summarizer

## Summarizing Transactions

1. Transaction data structure in database

```ts
{
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
{
  _id: string // %Y-%m-%d
  gas: number
  transactions: {
    name: string
    total: number
  }
  ;[]
}
```

3. RESULT: Summarized Transaction Structure

```ts
{
  id: string // %Y-%m-%d
  gas: number
  contract_call?: { name: string; total: number; gas: number }
  contract_deploy?: { name: string; total: number; gas: number }
  bridge?: { name: string; total: number; gas: number }
  remasc?: { name: string; total: number; gas: number }
  normal?: { name: string; total: number; gas: number }
}
```

## Summarizing Stats

1. Stats Structure in database

```ts
{
  _id: string // %Y-%m-%d
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

2. RESULT: Grouped and Summarized Stats Structure

```ts
{
  id: string // %Y-%m-%d
  hashrate: number
  activeAccounts: number
  circulatingSupply: number
}
```
