import { observable } from "mobx"
import { Qtum, QtumRPC, Contract } from "qtumjs"

import { ITransferLog, ITxRecord } from "./types"
import { TxRecord } from "./views/TxRecord"

// QTUM_RPC defined in config/[env].js
// SOLAR_REPO is `solar.[env].json`. defined in config/*.js
const QTUM_RPC = "http://localhost:9888"
import * as repo from "../solar.json"

const qtum = new Qtum(QTUM_RPC, repo as any)
const myToken = qtum.contract("zeppelin-solidity/contracts/token/ERC20/CappedToken.sol")

export class Store {
  @observable public totalSupply: number = 0
  @observable.shallow public transferEvents: ITransferLog[] = []

  @observable public txRecords: ITxRecord[] = []

  private emitter = myToken.logEmitter({ minconf: 0 })

  public init() {
    this.updateTotalSupply()
    this.observeEvents()
  }

  public async updateTotalSupply() {
    const result = await myToken.call("totalSupply")
    const supply = result.outputs[0]
    this.totalSupply = supply.toNumber()
  }

  public async mintTokens(toAddress: string, amount: number) {
    // txRecords is an observable array. Adding an object into the array
    // will recursively convert the object into an observable.
    this.txRecords.unshift({
      method: "mint",
      params: {
        toAddress,
        amount,
      },
      tx: undefined,
      error: undefined,
    })

    // getting the observable txRecords back, so when we update `tx`, it will
    // trigger observers.
    const txRecord = this.txRecords[0]

    try {
      const tx = await myToken.send("mint", [toAddress, amount])
      txRecord.tx = tx

      await tx.confirm(3, (tx2) => {
        // update transaction info
        txRecord.tx = tx2
      })
    } catch (err) {
      txRecord.error = err
    }
  }

  private async observeEvents() {
    this.emitter.on("Mint", () => {
      this.updateTotalSupply()
    })

    this.emitter.on("Transfer", (log: ITransferLog) => {
      this.transferEvents.unshift(log)
    })
  }
}
