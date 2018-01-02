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
    <p>
      {transactionHash}
      <br/>
      {from} => {to} ({value.toNumber()})
    </p>
  )
}
