import { IContractLog, IRPCGetTransactionResult } from "qtumjs"
import BN from "bn.js"

export type ITransferLog = IContractLog<{
  type: "Transfer",
  from: string,
  to: string,
  value: BN,
}>

// ITxRecord tracks transactions made by the app
export interface ITxRecord {
  tx?: IRPCGetTransactionResult
  method: string
  params: { [key: string]: any }
  error?: Error
}
