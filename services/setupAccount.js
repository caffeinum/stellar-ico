const { sdk, server } = require('./sdk')

const secret = 'SB6F2RDT45WO23HGGBWB7OHTXRPKTO5LRMTOTOCDIIKSKB4YENJK3SWD'
const keypair = sdk.Keypair.random()
const address = keypair.publicKey()
const account = new sdk.Account(address, "1")

module.exports = (from, token, tx) => {

  if (tx) {
    transaction = new StellarSdk.Transaction(tx)
  }
  // Transaction will hold a built transaction we can resubmit if the result is unknown.
  var transaction;
  // First, check to make sure that the destination account exists.
  // You could skip this, but if the account does not exist, you will be charged
  // the transaction fee when the transaction fails.
  return server.loadAccount(from.publicKey())
    .then(function(sourceAccount) {
      // Start building the transaction.
      const tx = new sdk.TransactionBuilder(sourceAccount)
        .addOperation(sdk.Operation.createAccount({
          destination: address,
          startingBalance: '1.5'
        }))
        .addOperation(sdk.Operation.changeTrust({
          source: address,
          asset: token,
          limit: '1000'
        }))
        .addOperation(sdk.Operation.payment({
          destination: address,
          asset: token,
          amount: '1000'
        }))

        transaction = tx.build();


        // Sign the transaction to prove you are actually the person sending it.
        transaction.sign(from);

        
        const envelope = transaction.toEnvelope().toXDR('base64');
        console.log('envelope', envelope);

        const restored = new sdk.Transaction(envelope);

        restored.sign(keypair);

       console.log('address', address)
       return server.submitTransaction(restored);
    })
}
