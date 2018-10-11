const { sdk, server } = require('./sdk')
const runOperation = require('./runOperation')


module.exports = async (admin, tokenName = 'TOKEN') => {

  const adminKey  = await sdk.Keypair.fromSecret(admin)
  const userKey   = await sdk.Keypair.random()
  const asset     = await new sdk.Asset(tokenName, adminKey.publicKey())

  const createAccount = await runOperation(adminKey, 'createAccount', {
    destination: userKey.publicKey(),
    startingBalance: String(1.51),
  })

  const changeTrust = await runOperation(userKey, 'changeTrust', {
    source: userKey.publicKey(),
    asset: asset,
    limit: '1000'
  })

  const payment = await runOperation(adminKey, 'payment', {
    destination: userKey.publicKey(),
    asset: asset,
    amount: '1000'
  })

  return {
    payment,
    changeTrust,
    createAccount,
  }
}
