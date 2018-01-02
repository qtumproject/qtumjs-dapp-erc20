import { autorun, computed, observable, toJS } from "mobx"
import { QtumRPC, Contract, IDecodedLog, IContractLog } from "qtumjs"
import { EventEmitter } from "eventemitter3"

import { ITransferLog } from "./types"

// QTUM_RPC defined in config/[env].js
const rpc = new QtumRPC(QTUM_RPC)

// SOLAR_REPO is `solar.[env].json`. defined in config/*.js
const myToken = new Contract(rpc, SOLAR_REPO.contracts["zeppelin-solidity/contracts/token/CappedToken.sol"])

export class Store {
  @observable public totalSupply: number = 0
  @observable.shallow public transferEvents: ITransferLog[] = []

  private emitter: EventEmitter

  public init() {
    this.updateTotalSupply()
    this.observeEvents()
  }

  public async updateTotalSupply() {
    const result = await myToken.call("totalSupply")
    const supply = result.outputs[0]
    this.totalSupply = supply.toNumber()
  }

  private async observeEvents() {
    this.emitter = myToken.logEmitter({ minconf: 0 })

    this.emitter.on("Mint", () => {
      this.updateTotalSupply()
    })

    // typing here is not very nice...
    this.emitter.on("Transfer", (log: ITransferLog) => {
      this.transferEvents.push(log)
      // console.log("transfer", entry)
    })
  }
}
