const { sdk, server } = require('./sdk')

module.exports = (from, operation_type, options) => {
  const operationBuilder = sdk.Operation[operation_type]

  if (!operationBuilder) {
    return Promise.reject(new Error(`Unknown operation type: ${operation_type}`))
  }

  // Transaction will hold a built transaction we can resubmit if the result is unknown.
  var transaction;
  // First, check to make sure that the destination account exists.
  // You could skip this, but if the account does not exist, you will be charged
  // the transaction fee when the transaction fails.
  return server.loadAccount(from.publicKey())
    .then(function(sourceAccount) {
      const operation = operationBuilder.call(sdk.Operation, options)

      // Start building the transaction.
      transaction = new sdk.TransactionBuilder(sourceAccount)
        .addOperation(operation)
        .build();

      // Sign the transaction to prove you are actually the person sending it.
      transaction.sign(from);
      // And finally, send it off to Stellar!
      return server.submitTransaction(transaction);
    })
}
