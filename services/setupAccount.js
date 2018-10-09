const { sdk, server } = require('./sdk')

const secret = 'SB6F2RDT45WO23HGGBWB7OHTXRPKTO5LRMTOTOCDIIKSKB4YENJK3SWD'
const keypair = sdk.Keypair.random()
const address = keypair.publicKey()
const account = new sdk.Account(address, "1")

module.exports = (admin, tx) => {
  console.log('server tx', tx)

  const restored = new sdk.Transaction(tx);

  console.log('server admin', admin)

  restored.sign(admin);
  return server.submitTransaction(restored);
}
