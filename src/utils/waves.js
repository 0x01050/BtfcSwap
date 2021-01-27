import Waves from '@waves/signer'
import Provider from '@waves.exchange/provider-web'

import WavesConfig from '../config/waves'

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
export default {
  unlockWallet,
  getBalance
}