const {
  createAsset, createAccount,
  getBalance,
  mint, send,
  runOperation,
} = require('./services')

const ADMIN_KEY = "SDA7HRNGXC5S4AWMTANDVBXLPVSDMRXGAURMACE2D3NQDO2M7I2STWUG"
const ADMIN = createAccount(ADMIN_KEY)
const CAF = createAsset(ADMIN, "CAF", 1000)

module.exports = {
  ADMIN,
  ADMIN_KEY,
  CAF,
}
