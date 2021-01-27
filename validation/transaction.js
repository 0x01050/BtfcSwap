const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateTransactionInput(data) {
  let errors = {}

  data.sender     = !isEmpty(data.sender)     ? data.sender     : ""
  data.recipient  = !isEmpty(data.recipient)  ? data.recipient  : ""
  data.type       = !isEmpty(data.type)       ? data.type       : ""
  data.amount     = !isEmpty(data.amount)     ? data.amount     : ""

  if (Validator.isEmpty(data.sender)) {
    errors.sender = "Sender field is required"
  }
  if (Validator.isEmpty(data.recipient)) {
    errors.recipient = "Recipient field is required"
  }
  if (Validator.isEmpty(data.type)) {
    errors.type = "Type field is required"
  } else if (type != 'deposit' && type != 'withdraw' && type != 'earn' && type != 'settle') {
    errors.type = "Type is invalid"
  }
  if (Validator.isEmpty(data.amount)) {
    errors.amount = "Amount field is required"
  } else if (!Validator.isFloat(data.amount)) {
    error.amount = "Amount field is invalid"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
