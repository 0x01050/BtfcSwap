import Waves from '@waves/signer'
import Provider from '@waves.exchange/provider-web'

import WavesConfig from '../config/waves'
import ApiUtils from './api'

const unlockWallet = async (callback, error_callback) => {
  try {
    window.waves = new Waves({NODE_URL: WavesConfig.NODE_URL})
    const provider = new Provider(WavesConfig.PROVIDER_URL)
    window.waves.setProvider(provider)
    const user = await window.waves.login()
    if(callback) {
      callback(user.address)
    }
  } catch(e) {
    if(error_callback) {
      error_callback()
    }
    console.error(e)
  }
}
const getBalance = async (callback, error_callback) => {
  try {
    if(window.waves) {
      const balances = await window.waves.getBalance()
      var btfc_balance = 0, waves_balance = 0
      balances.forEach(item => {
        if(item.assetId === WavesConfig.TOKEN_ID) {
          btfc_balance = item.amount / (10 ** WavesConfig.TOKEN_DECIMALS)
        }
        if(item.assetId === WavesConfig.WAVES_ID) {
          waves_balance = item.amount / (10 ** WavesConfig.WAVES_DECIMALS)
        }
      })
      if(callback) {
        callback(btfc_balance, waves_balance)
      }
    }
  } catch(e) {
    if(error_callback) {
      error_callback()
    }
    console.error(e)
  }
}
const deposit = async (sender, amount) => {
  try {
    if(window.waves) {
      const broadcastedTransfer = await window.waves.transfer({
        recipient: WavesConfig.POOL_ADDRESS,
        amount: amount * (10 ** WavesConfig.TOKEN_DECIMALS),
        assetId: WavesConfig.TOKEN_ID,
      }).broadcast()
      ApiUtils.postTransaction(sender, WavesConfig.POOL_ADDRESS, 'deposit', amount, broadcastedTransfer.id)
    }
  } catch(e) {
    console.error(e)
  }
}
const withdraw = async (recipient, amount) => {
  try {
    if(window.waves) {
      ApiUtils.postTransaction(WavesConfig.POOL_ADDRESS, recipient, 'withdraw', amount)
    }
  } catch(e) {
    console.error(e)
  }
}
const settle = async (recipient, amount) => {
  try {
    if(window.waves) {
      ApiUtils.postTransaction(WavesConfig.POOL_ADDRESS, recipient, 'settle', amount)
    }
  } catch(e) {
    console.error(e)
  }
}
export default {
  unlockWallet,
  getBalance,
  deposit,
  withdraw,
  settle,
}