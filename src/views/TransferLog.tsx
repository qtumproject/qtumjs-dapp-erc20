import * as React from "react"

import { ITransferLog } from "../types"

export function TransferLog(props: { log: ITransferLog }) {
  const {
    from,
    to,
    value,
  } = props.log.event

  const {
    transactionHash,
  } = props.log

  return (
    <table className="table is-bordered"><tbody>
      <tr>
        <td>Tx ID</td>
        <td>{transactionHash}</td>
      </tr>

      <tr>
        <td>From</td>
        <td>{from}</td>
      </tr>

      <tr>
        <td>To</td>
        <td>{to}</td>
      </tr>

      <tr>
        <td>Value</td>
        <td>{value.toNumber()}</td>
      </tr>
    </tbody></table>
  )
}
