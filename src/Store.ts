import { autorun, computed, observable, toJS } from "mobx"
import { QtumRPC, Contract, IDecodedLog, IContractLogEntry } from "qtumjs"
import { EventEmitter } from "eventemitter3"

// QTUM_RPC defined in config/[env].js
const rpc = new QtumRPC(QTUM_RPC)

// SOLAR_REPO is `solar.[env].json`. defined in config/*.js
const myToken = new Contract(rpc, SOLAR_REPO.contracts["zeppelin-solidity/contracts/token/CappedToken.sol"])

export class Store {
  @observable public totalSupply: number = 0

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
    // TODO: myToken.eventsEmitter({ minconf: 1 })
    // emitter.on("Mint", () => {})
    this.emitter = myToken.logEmitter({ minconf: 1 })

    this.emitter.on("Mint", () => {
      this.updateTotalSupply()
    })

    this.emitter.on("Transfer", (entry: IContractLogEntry) => {
      console.log("transfer", entry)
    })
  }
}