import Waves from '@waves/signer'
import Provider from '@waves.exchange/provider-web'

import WavesConfig from '../config/waves'

const unlockWallet = async (callback) => {
  try {
    const waves = new Waves({NODE_URL: WavesConfig.NODE_URL})
    const provider = new Provider(WavesConfig.PROVIDER_URL)
    waves.setProvider(provider)
    const user = await waves.login()
    const balances = await waves.getBalance()
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
      callback(user.address, btfc_balance, waves_balance)
    }
  } catch(e) {
    console.error(e)
  }
}
export default {
  unlockWallet
}