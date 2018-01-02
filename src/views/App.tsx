import * as React from "react"

import { observer, inject } from "mobx-react"

import { Store } from "../Store"

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
      </div>
    )
  }
}
