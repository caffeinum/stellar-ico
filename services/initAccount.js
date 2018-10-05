const runOperation = require('./runOperation')

const initAccount = (admin, address, startingBalance = '1.5000100') => {
  return runOperation(admin, 'createAccount', {
    destination: address,
    startingBalance: String(startingBalance)
  })
}

module.exports = initAccount
