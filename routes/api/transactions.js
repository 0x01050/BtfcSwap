const express = require('express')
const router = express.Router()

const POOL_ADDRESS = require('../../config/keys').poolAddr
const SecretKey = require('../../config/keys').secretKey
const TransactionUtils = require('../../utils/transaction')
const validateBalanceInput = require('../../validation/balance')
const validateTransactionInput = require('../../validation/transaction')

router.post('/post', async (req, res) => {
  try {
    const { errors, isValid } = validateTransactionInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    let {sender, recipient, type, amount, transactionID} = req.body
    amount = parseFloat(amount)
    let result
    switch(type) {
      case 'deposit':
        result = await TransactionUtils.checkTransactionAndSave(sender, recipient, type, amount, transactionID)
        break
      case 'withdraw':
        result = await TransactionUtils.makeTransactionAndSave(sender, recipient, type, amount, 'deposit')
        break
      case 'settle':
        result = await TransactionUtils.makeTransactionAndSave(sender, recipient, type, amount, 'earn')
        break
      case 'earn':
        if(transactionID === SecretKey) {
          result = await TransactionUtils.save(sender, recipient, type, amount, transactionID)
        } else {
          return res.status(403)
        }
        break
    }
    return res.status(200).json(result)
  } catch(e) {
    console.error(e)
    res.status(500)
  }
})
router.post('/balance', async (req, res) => {
  try {
    const { errors, isValid } = validateBalanceInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const {address} = req.body
    result = await TransactionUtils.getBalance(address)
    return res.status(200).json(result)
  } catch(e) {
    console.error(e)
    return res.status(500)
  }
})

module.exports = router
