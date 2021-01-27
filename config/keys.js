require('dotenv').config()
module.exports = {
  chainID: process.env.CHAIN_ID,
  mongoURI: process.env.MONGO_URI,
  decimals: process.env.REACT_APP_TOKEN_ASSET_DECIMALS,
  assetID: process.env.REACT_APP_TOKEN_ASSET_ID,
  poolAddr: process.env.REACT_APP_TOKEN_POOL,
  nodeUrl: process.env.REACT_APP_WAVES_NODE_URL,
  secretKey: process.env.SECRET_KEY,
  seed: process.env.SEED,
}
