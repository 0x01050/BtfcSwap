import axios from 'axios'
import WavesConfig from '../config/waves'

const postTransaction = (sender, recipient, type, amount = -1, transactionID = '') => {
  axios
    .post('/api/transactions/post', {
      sender, recipient, type, amount, transactionID
    }).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.error(err)
    })
}
const getBalance = (address, callback) => {
  axios
    .post('/api/transactions/balance', {address})
    .then(res => {
      const {msg} = res.data
      if(msg === 'success') {
        const {staked, earned} = res.data
        if(callback) {
          callback(staked, earned)
        }
      }
    }).catch(err => {
      console.error(err)
    })
}
const getPrice = (callback) => {
  axios
    .get('https://api.coingecko.com/api/v3/coins/bitcoin-flash-cash')
    .then(res => {
      try {
        callback(res.data.market_data.current_price.usd)
      } catch(err) {
        console.error(err)
      }
    })
}
const getFaucet = (address, callback) => {
  axios
    .post('/api/transactions/faucet', {address})
    .then(res => {
      const {msg} = res.data
      if(msg === 'success') {
        const {faucet} = res.data
        if(callback) {
          callback(faucet)
        }
      }
    }).catch(err => {
      console.error(err)
    })
}
const getTransactions = (callback) => {
  axios
    .get(WavesConfig.API_URL + '/v0/transactions/transfer?limit=100&assetId=' + WavesConfig.TOKEN_ID)
    .then(res => {
      const {data} = res.data
      if(callback) {
        callback(data)
      }
    }).catch(err => {
      console.error(err)
    })
}
const getSwapPrice = (callback) => {
  axios
    .post('/api/transactions/getSwapPrice')
    .then(res => {
      try {
        callback(res.data)
      } catch(err) {
        console.error(err)
      }
    })
}
export default {
  postTransaction,
  getBalance,
  getPrice,
  getFaucet,
  getTransactions,
  getSwapPrice,
}