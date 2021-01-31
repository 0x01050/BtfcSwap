const {
  REACT_APP_WAVES_PLATFORM,
  REACT_APP_TOKEN_ASSET_ID,
  REACT_APP_TOKEN_ASSET_DECIMALS,
  REACT_APP_TOKEN_POOL
} = process.env

const WAVES_ASSET_ID = "WAVES"
const WAVES_DECIMALS = 8

const NodeUrls = {
  'testnet': 'https://nodes-testnet.wavesnodes.com',
  'prod': 'https://nodes.wavesexplorer.com'
}
const ProviderUrls = {
  'testnet': 'https://testnet.waves.exchange/signer/',
  'prod': 'https://waves.exchange/signer/'
}
const explorerUrls = {
  'testnet': 'https://testnet.wavesexplorer.com',
  'prod': 'https://wavesexplorer.com'
}
const apiUrls = {
  'testnet': 'https://api.testnet.wavesplatform.com',
  'prod': 'https://api.wavesplatform.com',
}

export default {
  WAVES_PLATFORM: REACT_APP_WAVES_PLATFORM,
  NODE_URL: NodeUrls[REACT_APP_WAVES_PLATFORM],
  PROVIDER_URL: ProviderUrls[REACT_APP_WAVES_PLATFORM],
  EXPLORER_URL: explorerUrls[REACT_APP_WAVES_PLATFORM],
  API_URL: apiUrls[REACT_APP_WAVES_PLATFORM],
  TOKEN_ID: REACT_APP_TOKEN_ASSET_ID,
  TOKEN_DECIMALS: parseInt(REACT_APP_TOKEN_ASSET_DECIMALS),
  WAVES_ID: WAVES_ASSET_ID,
  WAVES_DECIMALS: WAVES_DECIMALS,
  POOL_ADDRESS: REACT_APP_TOKEN_POOL
}