const { sdk, server } = require('./sdk')

module.exports = (address) => {
  if (typeof address != 'string' && !(address instanceof String)) {
    return Promise.resolve(0)
  }

  return server.loadAccount(address).then(function(account) {
    return account.balances
  });
}
