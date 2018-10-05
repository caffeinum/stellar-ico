const { sdk } = require('./sdk');

const runOperation = require('./runOperation')

const send = (admin, to, amount) => {
  return runOperation(admin, 'payment', {
    destination: to,
    asset: sdk.Asset.native(),
    amount: String(amount),
  })
}

module.exports = send
