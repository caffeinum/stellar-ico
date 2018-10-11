const runOperation = require('./runOperation')
const { sdk } = require('./sdk')

const initAccount = (admin, address, startingBalance = '1.5000100') => {

  const keypair = sdk.Keypair.fromSecret(admin)

  return runOperation(keypair, 'createAccount', {
    destination: address,
    startingBalance: String(startingBalance)
  })
}

module.exports = initAccount
