const { sdk } = require('./sdk')

const runOperation = require('./runOperation')

const mint = (admin, asset = 'TOKEN', to, amount) => {

  const keypair = sdk.Keypair.fromSecret(admin)

  return runOperation(keypair, 'payment', {
    destination: to,
    asset: asset,
    amount: String(amount),
  })
}

module.exports = mint
