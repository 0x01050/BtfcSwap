import axios from 'axios'

const postTransaction = (sender, recipient, type, amount, transactionID = '') => {
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
export default {
  postTransaction,
  getBalance,
}