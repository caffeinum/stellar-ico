const { sdk, server } = require('./sdk')

const runOperation = require('./runOperation')

const mint = (admin, asset, to, amount) => {
  return runOperation(admin, 'payment', {
    destination: to,
    asset: asset,
    amount: String(amount),
  })
}

module.exports = mint
