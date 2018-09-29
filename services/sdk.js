const sdk = require('stellar-sdk')

const server = new sdk.Server('https://horizon-testnet.stellar.org')
sdk.Network.useTestNetwork()

module.exports = { sdk, server }
