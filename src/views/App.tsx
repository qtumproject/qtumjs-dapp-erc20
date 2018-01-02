import * as React from "react"
import { observer, inject } from "mobx-react"

import { Store } from "../Store"
import { TransferLog } from "./TransferLog"

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
    } = this.props.store!

    return (
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <span className="navbar-item">
              My Token
            </span>
          </div>
        </nav>

        <section className="section">
          <div className="container content">
            <h1> Total Supply: {totalSupply} </h1>
          </div>
        </section>

        <section className="section">
          <div className="container content">
            <h1> Transfers </h1>
            {
              transferEvents.map((log) => <TransferLog key={log.transactionHash} log={log}/>)
            }
          </div>
        </section>
      </div>
    )
  }
}
