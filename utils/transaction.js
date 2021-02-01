const { broadcast, data, transfer } = require('@waves/waves-transactions')
const axios = require('axios')
const Transaction = require('../models/Transaction')
const AssetID = require('../config/keys').assetID
const ChainID = require('../config/keys').chainID
const DECIMALS = require('../config/keys').decimals
const NodeURL = require('../config/keys').nodeUrl
const POOL_ADDRESS = require('../config/keys').poolAddr
const SEED = require('../config/keys').seed

const checkTransaction = (sender, recipient, amount, tx) => {
  try {
    return (sender === tx.sender && recipient === tx.recipient && amount * (10 ** DECIMALS) === tx.amount)
  } catch(e) {
    console.error(e)
  }
  return false
}
const checkBalance = async (address, neg_type, pos_type, amount) => {
  const pos = await getSum([{sender: address}, {recipient: POOL_ADDRESS}, {type: pos_type}])
  const neg = await getSum([{sender: POOL_ADDRESS}, {recipient: address}, {type: neg_type}])
  return pos - neg >= amount
}
const checkTransactionAndSave = async (sender, recipient, type, amount, transactionID) => {
  if(recipient !== POOL_ADDRESS) {
    return {
      msg: 'error',
      err: 'Recipient is invalid'
    }
  }
  setTimeout(async () => {
    const resp = await axios.get(NodeURL + '/transactions/info/' + transactionID)
    if(checkTransaction(sender, recipient, amount, resp.data)) {
      return await save(sender, recipient, type, amount, transactionID)
    }
  }, 10 * 1000)
  return {
    msg: 'success'
  }
}
const makeTransactionAndSave = async (sender, recipient, type, amount, charge = '') => {
  if(sender !== POOL_ADDRESS) {
    return {
      msg: 'error',
      err: 'Sender is invalid'
    }
  }
  if(!charge || await checkBalance(recipient, type, charge, amount)) {
    const signedTranserTx = transfer({ 
      amount: amount * (10 ** DECIMALS),
      recipient: recipient,
      assetId: AssetID,
      chainId: ChainID,
      version: 2,
      fee: 500000,
    }, SEED)
    
    broadcast(signedTranserTx, NodeURL)
      .catch(e => {
        console.error(e)
        Transaction.remove({transactionID: signedTranserTx.id}).exec()
      })
    signedTranserTx.sender = POOL_ADDRESS
    if(!checkTransaction(sender, recipient, amount, signedTranserTx)) {
      return {
        msg: 'error',
        err: 'Invalid transaction'
      }
    }
    return await save(sender, recipient, type, amount, signedTranserTx.id)
  } else {
    return {
      msg: 'error',
      err: 'Insufficient balance'
    }
  }
}
const getSum = async (where) => {
  try {
    const sum = await Transaction.aggregate([
      {
        $match: { $and: where}
      },
      {
        $group: {_id: null, total: {$sum: '$amount'}}
      }
    ])
    if(sum.length > 0)
      return sum[0].total
  } catch(e) {
    console.error(e)
  }
  return 0
}
const save = async (sender, recipient, type, amount, transactionID = '') => {
  const newTransaction = new Transaction({
    sender, recipient, type, amount, transactionID
  })
  await newTransaction.save()
  return {
    msg: 'success'
  }
}
const getBalance = async (address) => {
  const deposit = await getSum([{sender: address}, {recipient: POOL_ADDRESS}, {type: 'deposit'}])
  const withdraw = await getSum([{sender: POOL_ADDRESS}, {recipient: address}, {type: 'withdraw'}])
  const earn = await getSum([{sender: address}, {recipient: POOL_ADDRESS}, {type: 'earn'}])
  const settle = await getSum([{sender: POOL_ADDRESS}, {recipient: address}, {type: 'settle'}])
  return {
    msg: 'success',
    staked: deposit - withdraw,
    earned: earn - settle
  }
}
const getFaucetStatus = async (address) => {
  const found = await Transaction.find({ sender: POOL_ADDRESS, recipient: address }).sort({date: -1}).limit(1).exec()
  if(found.length > 0) {
    return {
      msg: 'success',
      faucet: found[0].date
    }
  }
  return {
    msg: 'success',
  }
}
const updatePrice = async (price) => {
  const signedDataTx = data({
    data: [{
      key: 'WavesPerBtfc',
      type: 'integer',
      value: price
    }],
    chainId: ChainID,
    fee: 500000
  }, SEED)
  broadcast(signedDataTx, NodeURL)
    .catch(e => {
      console.error(e)
    })
}
module.exports = {
  checkTransactionAndSave,
  makeTransactionAndSave,
  getBalance,
  save,
  getFaucetStatus,
  updatePrice,
}