require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

const { initAccount, getBalance, mint, send, setupAccount, changeTrust } = require('./services')

const route = (name, params, handler) => (req, res) => {
  console.log('[SERVER]', name, req.query)

  const paramsValid = params.reduce((acc, param) => acc && req.query[param], true)

  if (!paramsValid) {
    return res.status(500).json({
      err: true,
      required: params,
      message: `not enough args: ${params} required, got ${req.query}`
    })
  }

  handler(req.query)
    .then(info => {
      console.log('[SERVER] 200 Success', info)
      return res.json(info)
    })
    .catch(err => {
      console.error('[SERVER] 500 Error', err.message)
      res.status(500).json({ err: true, message: err.message })
    })
}

app.use(express.static('web'))

app.get('/me', route('me', [], () => {
  return getBalance().then(balance => ({
    balance,
  }))
}))

app.get('/get-balance', route('get-balance', ['address'], ({ address }) => {
  return getBalance(address)
}))

app.get('/create-account', route('create-account', ['admin', 'address'], ({ admin, address, startingBalance }) => {
  return initAccount(admin, address, startingBalance)
}))

app.get('/send', route('send', ['admin', 'to', 'amount'], ({admin, to, amount }) => {
  return send(admin, to, amount)
}))

app.get('/mint', route('mint', ['admin', 'to', 'name', 'amount'], ({admin, to, name, amount }) => {
  return mint(admin, name, to, amount)
}))

app.get('/change-trust', route('change-trust', ['admin', 'tokenName', 'issuer'], ({admin, tokenName, issuer, amount }) => {
  return changeTrust(admin, tokenName, issuer, amount)
}))

app.get('/setup', route('setup-account', ['amount', 'admin', 'tokenName'], ({ amount, admin, tokenName }) => {
  return setupAccount(admin, amount, tokenName)
}))

app.listen(port, () => console.log(`[SERVER] listening on port ${port}`))
