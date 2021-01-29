require('dotenv').config()
const NodeUrls = {
  'testnet': 'https://nodes-testnet.wavesnodes.com',
  'prod': 'https://nodes.wavesexplorer.com'
}
const ChainIDs = {
  'testnet': 'T',
  'prod': 'W'
}
const platform = process.env.REACT_APP_WAVES_PLATFORM
module.exports = {
  nodeUrl: NodeUrls[platform],
  assetID: process.env.REACT_APP_TOKEN_ASSET_ID,
  decimals: process.env.REACT_APP_TOKEN_ASSET_DECIMALS,
  poolAddr: process.env.REACT_APP_TOKEN_POOL,
  chainID: ChainIDs[platform],
  mongoURI: process.env.MONGO_URI,
  secretKey: process.env.SECRET_KEY,
  seed: process.env.SEED,
}
