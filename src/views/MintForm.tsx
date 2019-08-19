import React from "react"
import { inject, observer } from "mobx-react"
import cx from "classnames"

import { MintFormState } from "./MintFormState"
import { Store } from "../Store"

@inject("store") @observer
export class MintForm extends React.Component<{ store?: Store }, {}> {
  public data = new MintFormState(this.props.store!)

  public render() {
    const {
      amount,
      address,
      onSubmit,
    } = this.data

    const {
      hasError,
    } = this.data.form

    return (
      <div>
        <div className="field">
          <label className="label">To Address</label>
          <div className="control">
            <input className={cx("input", { "is-danger": address.hasError })} type="text" placeholder="0xabc...abc"
              onChange={(e) => address.onChange(e.target.value)}
            />
          </div>
          {address.hasError &&
            <p className="help is-danger">{address.error}</p>
          }
        </div>

        <div className="field">
          <label className="label">Amount</label>
          <div className="control">
            <input className={cx("input", { "is-danger": amount.hasError })} type="number" placeholder="0.0"
              onChange={(e) => amount.onChange(parseFloat(e.target.value))}
            />
          </div>
          {amount.hasError &&
            <p className="help is-danger">{amount.error}</p>
          }
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={onSubmit}>
              Mint Tokens
            </button>
          </div>
          {/* <div className="control">
            <button className="button is-text">Cancel</button>
          </div> */}
        </div>
      </div>
    )
  }
}
