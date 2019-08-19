import { FormState, FieldState } from "formstate"

import { Store } from "../Store"

function ishex160(s: string): boolean {
  // FIXME: verify is hexadecimal...
  return s.slice(0, 2) === "0x" && s.length === 42
}

export class MintFormState {
  public amount = new FieldState(0).validators((val) => {
    return (isNaN(val) || val <= 0) && "amount must be greater than 0"
  })

  public address = new FieldState("").validators((val) => {
    return (val === "" && "address must not be empty") || (!ishex160(val) && "address invalid")
  })

  public form = new FormState({
    amount: this.amount,
    address: this.address,
  })

  constructor(private store: Store) {
  }

  public onSubmit = async () => {
    const res = await this.form.validate()

    if (res.hasError) {
      console.log("mint form errors", this.form.error)
      return
    }

    // kinda ugly...
    const amount = this.amount.$
    const address = this.address.$

    console.log("mint", [address, amount])
    this.store.mintTokens(address, amount)
  }
}
