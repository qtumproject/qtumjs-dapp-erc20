import React from "react"
import { observer } from "mobx-react"
import cx from "classnames"

import { ITxRecord } from "../types"

interface IProps {
  txRecord: ITxRecord,
}

@observer
export class TxRecord extends React.Component<IProps, {}> {
  public render() {
    const {
      tx,
      method,
      params,
      error,
    } = this.props.txRecord

    const confirms = tx ? tx.confirmations : 0

    return (
      <div className="box content">
        <span className="tags has-addons">
          <span className="tag">Confirms</span>
          <span className={cx("tag", {
            "is-success": confirms > 0,
            "is-danger": confirms === 0,
          })}>
            {confirms}
          </span>
        </span>

        {error &&
          <div className="notification is-danger">
            {error.name}: {error.message}
          </div>
        }

        <table className="table is-bordered"><tbody>
          <tr>
            <td>txid</td>
            <td className={cx({ "has-text-danger": tx == null })}>
              {tx ? tx.txid : "pending authorization"}
            </td>
          </tr>

          <tr>
            <td>method</td>
            <td>{method}</td>
          </tr>

        </tbody></table>

        {Object.keys(params).length !== 0 &&
          <div>
            <h3> Params </h3>

            <table className="table is-bordered"><tbody>
              {
                Object.keys(params).map((key) => {
                  const val = params[key]

                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{val}</td>
                    </tr>
                  )
                })
              }
            </tbody></table>
          </div>
        }
      </div>
    )
  }
}
