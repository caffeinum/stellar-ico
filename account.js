const { createAsset, createAccount } = require('./services')

const ADMIN_KEY = process.env.KEY || "SDA7HRNGXC5S4AWMTANDVBXLPVSDMRXGAURMACE2D3NQDO2M7I2STWUG"
const ADMIN = createAccount(ADMIN_KEY)

const TOKEN_NAME = process.env.TOKEN || "TOKEN"
const TOKEN = createAsset(ADMIN, TOKEN_NAME)

module.exports = {
  ADMIN,
  ADMIN_KEY,
  TOKEN,
}
