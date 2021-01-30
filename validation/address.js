const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validateAddressInput(data) {
  let errors = {}
  data.address = !isEmpty(data.address) ? data.address : ''
  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address field is required'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
