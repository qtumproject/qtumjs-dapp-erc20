import { IContractLog } from "qtumjs"
import BN from "bn.js"

export type ITransferLog = IContractLog<{
  type: "Transfer",
  from: string,
  to: string,
  value: BN,
}>
