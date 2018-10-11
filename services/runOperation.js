const { sdk, server } = require('./sdk')

module.exports = (from, operation_type, options) => {
  const operationBuilder = sdk.Operation[operation_type]

  if (!operationBuilder) {
    return Promise.reject(new Error(`Unknown operation type: ${operation_type}`))
  }

  return server.loadAccount(from.publicKey())
    .then(function(sourceAccount) {
      const operation = operationBuilder.call(sdk.Operation, options)

      const transaction = new sdk.TransactionBuilder(sourceAccount)
        .addOperation(operation)
        .build();

      transaction.sign(from);

      return server.submitTransaction(transaction);
    })
}
