import React from "react"

import { ITransferLog } from "../types"

export function TransferLog(props: { log: ITransferLog }) {
  const {
    from,
    to,
    value,
  } = props.log.event

  const {
    blockNumber,
    blockHash,
    transactionHash,
  } = props.log

  return (
    <table className="table is-bordered"><tbody>
      <tr>
        <td>Block #</td>
        <td>{blockNumber}</td>
      </tr>

      <tr>
        <td>Block Hash</td>
        <td>{blockHash}</td>
      </tr>

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
