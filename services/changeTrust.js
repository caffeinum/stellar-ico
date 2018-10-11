const { sdk } = require('./sdk')
const runOperation = require('./runOperation')
const createAsset = require('./createAsset')


module.exports = (admin, tokenName, issuer, amount) => {

  const keypair = sdk.Keypair.fromSecret(admin)

  return runOperation(keypair, 'changeTrust', {
    source: issuer,
    asset: createAsset(tokenName, issuer),
    limit: String(amount)
  })
}
