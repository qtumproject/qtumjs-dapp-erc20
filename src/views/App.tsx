import * as React from "react"

import { getCount, increment } from "../api"

const css = {
  button: {
    marginRight: "5px",
  },
}

interface IAppState {
}

export class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props)

    this.state = {
    }
  }

  public render() {
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
            <h1> Total Supply </h1>
          </div>
        </section>
      </div>
    )
  }
}
