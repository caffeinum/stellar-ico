const { sdk } = require('./sdk')
const runOperation = require('./runOperation')


module.exports = (admin, tokenName, issuer, amount) => {

  const keypair = sdk.Keypair.fromSecret(admin)

  return runOperation(keypair, 'changeTrust', {
    source: issuer,
    asset: tokenName,
    limit: String(amount)
  })
}
