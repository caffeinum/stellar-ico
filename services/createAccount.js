const { sdk, server } = require('./sdk')

const getBalance = require('./getBalance')

module.exports = (key) => {
  const keypair = key ? sdk.Keypair.fromSecret(key) : sdk.Keypair.random();
  const account = new sdk.Account(keypair.publicKey(), "1")

  const tx = new sdk.TransactionBuilder(account)
  tx.addOperation(sdk.Operation.createAccount({
      destination: keypair.publicKey(),
      startingBalance: "50"  // in XLM
    }))
    .build()
    .sign(keypair)


  console.log('secretString', key)
  console.log('keypair', keypair)
  console.log('publicKey', keypair.publicKey())
  console.log('acc', account)

  const balance = getBalance(keypair.publicKey())

  balance.then(console.log)

  return keypair
}
