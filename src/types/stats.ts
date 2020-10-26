export type IMongoStats = {
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

export type ISummaryStats = {
  id: string
  hashrate: number
  activeAccounts: number
  circulatingSupply: number
}

export type IStastSummaryObject = Record<
  string,
  { hashrate: number; activeAccounts: number; circulatingSupply: number }
>
