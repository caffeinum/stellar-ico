const { sdk, server } = require('./sdk');

const runOperation = require('./runOperation')

const send = (admin, to, amount) => {
  return runOperation(admin, 'payment', {
    destination: to,
    asset: sdk.Asset.native(),
    amount: String(amount),
  })
}

module.exports = send;
//
// module.exports = (admin, to, amount) => {
//   // Transaction will hold a built transaction we can resubmit if the result is unknown.
//   var transaction;
//
//   // First, check to make sure that the destination account exists.
//   // You could skip this, but if the account does not exist, you will be charged
//   // the transaction fee when the transaction fails.
//   return server.loadAccount(to)
//     // If the account is not found, surface a nicer error message for logging.
//     .catch(sdk.NotFoundError, function (error) {
//       throw new Error('The destination account does not exist!');
//     })
//     // If there was no error, load up-to-date information on your account.
//     .then(function() {
//       return server.loadAccount(admin.publicKey());
//     })
//     .then(function(sourceAccount) {
//       // Start building the transaction.
//       transaction = new sdk.TransactionBuilder(sourceAccount)
//         .addOperation(sdk.Operation.payment({
//           destination: to,
//           // Because Stellar allows transaction in many currencies, you must
//           // specify the asset type. The special "native" asset represents Lumens.
//           asset: sdk.Asset.native(),
//           amount: String(amount),
//         }))
//         // A memo allows you to add your own metadata to a transaction. It's
//         // optional and does not affect how Stellar treats the transaction.
//         .addMemo(sdk.Memo.text('Test Transaction'))
//         .build();
//       // Sign the transaction to prove you are actually the person sending it.
//       transaction.sign(admin);
//       // And finally, send it off to Stellar!
//       return server.submitTransaction(transaction);
//     })
//     .then(function(result) {
//       console.log('Success! Results:', result);
//       return
//     })
//     .catch(function(error) {
//       console.error('Something went wrong!', error);
//       throw error
//       // If the result is unknown (no response body, timeout etc.) we simply resubmit
//       // already built transaction:
//       // server.submitTransaction(transaction);
//     });
//
//
// }
