const sdk = require('stellar-sdk')
const crypto = require('crypto')

const server = new sdk.Server('https://horizon-testnet.stellar.org')

sdk.Network.useTestNetwork()

const secretString = "SDA7HRNGXC5S4AWMTANDVBXLPVSDMRXGAURMACE2D3NQDO2M7I2STWUG"

const keypair = sdk.Keypair.fromSecret(secretString)
const sourcePublicKey = keypair.publicKey()
const account = new sdk.Account(sourcePublicKey, "1")

console.log('secretString', secretString)
console.log('keypair', keypair)
console.log('publicKey', sourcePublicKey)
console.log('acc', account)

const tx = new sdk.TransactionBuilder(account)

tx.addOperation(sdk.Operation.createAccount({
    destination: sourcePublicKey,
    startingBalance: "50"  // in XLM
  }))
  .build()
  .sign(keypair)


// the JS SDK uses promises for most actions, such as retrieving an account
server.loadAccount(keypair.publicKey()).then(function(account) {
  console.log('Balances for account: ' + keypair.publicKey());
  account.balances.forEach(function(balance) {
    console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
  });
});

var destinationId = 'GBBORXCY3PQRRDLJ7G7DWHQBXPCJVFGJ4RGMJQVAX6ORAUH6RWSPP6FM';
// Transaction will hold a built transaction we can resubmit if the result is unknown.
var transaction;

// First, check to make sure that the destination account exists.
// You could skip this, but if the account does not exist, you will be charged
// the transaction fee when the transaction fails.
server.loadAccount(destinationId)
  // If the account is not found, surface a nicer error message for logging.
  .catch(sdk.NotFoundError, function (error) {
    throw new Error('The destination account does not exist!');
  })
  // If there was no error, load up-to-date information on your account.
  .then(function() {
    return server.loadAccount(keypair.publicKey());
  })
  .then(function(sourceAccount) {
    // Start building the transaction.
    transaction = new sdk.TransactionBuilder(sourceAccount)
      .addOperation(sdk.Operation.payment({
        destination: destinationId,
        // Because Stellar allows transaction in many currencies, you must
        // specify the asset type. The special "native" asset represents Lumens.
        asset: sdk.Asset.native(),
        amount: "10"
      }))
      // A memo allows you to add your own metadata to a transaction. It's
      // optional and does not affect how Stellar treats the transaction.
      .addMemo(sdk.Memo.text('Test Transaction'))
      .build();
    // Sign the transaction to prove you are actually the person sending it.
    transaction.sign(keypair);
    // And finally, send it off to Stellar!
    return server.submitTransaction(transaction);
  })
  .then(function(result) {
    console.log('Success! Results:', result);
  })
  .catch(function(error) {
    console.error('Something went wrong!', error);
    // If the result is unknown (no response body, timeout etc.) we simply resubmit
    // already built transaction:
    // server.submitTransaction(transaction);
  });
