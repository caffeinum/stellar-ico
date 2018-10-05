const sdk = require('stellar-sdk')

const server = new sdk.Server('https://horizon-testnet.stellar.org')

const NETWORK = process.env.NETWORK || ''

if (NETWORK.toLowerCase() === 'mainnet') {
  sdk.Network.usePublicNetwork()
} else if (NETWORK.toLowerCase() === 'testnet') {
  sdk.Network.useTestNetwork()
} else {
  console.error(`[SDK] unknown network '${NETWORK}', use 'TESTNET'`)
  sdk.Network.useTestNetwork()
}

module.exports = { sdk, server }
