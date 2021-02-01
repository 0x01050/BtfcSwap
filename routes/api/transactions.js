const express = require('express')
const axios = require('axios')
const router = express.Router()

const SecretKey = require('../../config/keys').secretKey
const TransactionUtils = require('../../utils/transaction')
const validateAddressInput = require('../../validation/address')
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
      case 'faucet':
        amount = 0.00025
        result = await TransactionUtils.makeTransactionAndSave(sender, recipient, type, amount)
        break
    }
    return res.status(200).json(result)
  } catch(e) {
    console.error(e)
    return res.status(500)
  }
})
router.post('/balance', async (req, res) => {
  try {
    const { errors, isValid } = validateAddressInput(req.body)
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
router.post('/faucet', async (req, res) => {
  try {
    const { errors, isValid } = validateAddressInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const {address} = req.body
    result = await TransactionUtils.getFaucetStatus(address)
    return res.status(200).json(result)
  } catch(e) {
    console.error(e)
    return res.status(500)
  }
})
const getSwapPrice = async () => {
  try {
    let resp = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin-flash-cash')
    const btfcPrice = resp.data.market_data.current_price.usd
    resp = await axios.get('https://api.coingecko.com/api/v3/coins/waves')
    const wavesPrice = resp.data.market_data.current_price.usd
    const rate = Math.floor(btfcPrice / wavesPrice * 100)
    return rate
  } catch(e) {
    console.error(e)
    return 200
  }
}
router.post('/getSwapPrice', async (req, res) => {
  try {
    let rate = await getSwapPrice()
    rate = Math.round(10000 / rate) / 100
    return res.status(200).json(rate)
  } catch(e) {
    console.error(e)
    return res.status(500)
  }
})
router.post('/updateSwapPrice', async (req, res) => {
  try {
    const rate = await getSwapPrice()
    await TransactionUtils.updatePrice(rate)
    return res.status(200).json(rate)
  } catch(e) {
    console.error(e)
    return res.status(500)
  }
})

module.exports = router
