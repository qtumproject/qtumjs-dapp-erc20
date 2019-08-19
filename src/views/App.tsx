import React from "react"
import { observer, inject } from "mobx-react"

import { Store } from "../Store"
import { TransferLog } from "./TransferLog"
import { MintForm } from "./MintForm"
import { TxRecord } from "./TxRecord"

const css = {
  button: {
    marginRight: "5px",
  },
}

@inject("store") @observer
export class App extends React.Component<{ store?: Store }, {}> {
  public render() {
    const {
      totalSupply,
      transferEvents,
      txRecords,
    } = this.props.store!

    return (
      <div>
        <section className="section">
          <div className="has-text-centered">
            <h1>
              <span className="is-size-2"> {totalSupply} </span>
              <br />
              Total Supply
            </h1>
          </div>

          <div className="container content">
            <MintForm />
          </div>
        </section>

        <section className="section">
          <div className="container content">
            <h1> Transaction Records </h1>
            {txRecords.length === 0 && "no transaction made"}
            {
              txRecords.map((txRecord, i) => {
                return <TxRecord key={i} txRecord={txRecord} />
              })
            }

            <h1> Transfers </h1>
            {transferEvents.length === 0 && "no transfer event observed yet"}
            {
              transferEvents.map((log) => <TransferLog key={log.transactionHash} log={log} />)
            }
          </div>
        </section>
      </div>
    )
  }
}
