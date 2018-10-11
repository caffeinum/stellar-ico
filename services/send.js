const { sdk } = require('./sdk');

const runOperation = require('./runOperation')

const send = (admin, to, amount) => {

  const keypair = sdk.Keypair.fromSecret(admin)

  return runOperation(keypair, 'payment', {
    destination: to,
    asset: sdk.Asset.native(),
    amount: String(amount),
  })
}

module.exports = send
