const initSDK = (sdk) => {
  sdk.Network.useTestNetwork()
  return new sdk.Server('https://horizon-testnet.stellar.org')
}

const setupAccount = async () => {
  const result  = await fetch('/me')
  const data    = await result.json()

  console.log('admin account', data)

  return server.loadAccount(data.address)
    .then(async (sourceAccount) => {
      console.log('sourceAccount', sourceAccount)
      // Start building the transaction.

      const createAccount = new StellarSdk.TransactionBuilder(sourceAccount)
        .addOperation(StellarSdk.Operation.createAccount({
          destination: key.publicKey(),
          startingBalance: '1.544'
        }))
      return createEnvelope(createAccount)
    })
}

const setTrust = () => {
  server.loadAccount(key.publicKey())
    .then(account => {
      const transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.changeTrust({
          source: key.publicKey(),
          asset: new StellarSdk.Asset('TOKEN', 'GDFVH322IMUXADZHNP4M3BPM3HGX6MRFP4PX3YN73JE5TKDGGLEAGHVG'),
          limit: '11'
        }))
        .build()

      transaction.sign(key)

      return server.submitTransaction(transaction)
    })
}

const createEnvelope = async (tx) => {
  console.log('tx', tx)
  const transaction = tx.build()
  transaction.sign(key)

  const envelope = transaction.toEnvelope().toXDR('base64');
  console.log('envelope', envelope)

  const txSendResult = await fetch(`/setup?tx=${envelope}`)
  console.log('txSendResult', await txSendResult.json())
  return txSendResult
}

const generateAccount = () => {
  const key = StellarSdk.Keypair.random()
  window.key = key
  console.log('new address =', key.publicKey())
  console.log('window.key', key)
}

const initAccount = async () => {
  const address = key.publicKey()

  const result = await fetch(`/create-account?address=${address}`)

  console.log('create account', await result.json())
}

const setupTrust = () => {
  const amount = window.prompt('For how many tokens should we setup trust?') || 100

  const token = new StellarSdk.Asset('TOKEN', 'GDFVH322IMUXADZHNP4M3BPM3HGX6MRFP4PX3YN73JE5TKDGGLEAGHVG')

  server.loadAccount(key.publicKey())
    .then(account => {
      const transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.changeTrust({
          asset: token,
          limit: String(amount)
        }))
        .build();

      transaction.sign(key);
      return server.submitTransaction(transaction);
    })
}

const getTokens = async () => {
  const amount = window.prompt('How many tokens you want to buy?') || 50

  const address = key.publicKey()

  const result = await fetch(`/mint?name=TOKEN&amount=${amount}&to=${address}`)

  console.log('get tokens', await result.json())
}

const checkBalance = async () => {
  const address = key.publicKey()
  const balance = await fetch(`/get-balance?address=${address}`)
  console.log('get balance', await balance.json())
}

window.onload = () => {
  const server = initSDK(StellarSdk)

  window.server = server
  window.sdk = StellarSdk
}
