require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

const { ADMIN_KEY, ADMIN, TOKEN } = require('./account')

const { initAccount, runOperation, getBalance, mint, send } = require('./services')

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
  return getBalance(ADMIN.publicKey())
    .then(balance => ({
      address: ADMIN.publicKey(),
      balance,
    }))
}))

app.get('/get-balance', route('get-balance', ['address'], ({ address }) => {
  return getBalance(address)
}))

app.get('/create-account', route('create-account', ['address'], ({ address, startingBalance }) => {
  return initAccount(ADMIN, address, startingBalance)
}))

app.get('/send', route('send', ['to', 'amount'], ({ to, amount }) => {
  return send(ADMIN, to, amount)
}))

app.get('/mint', route('mint', ['to', 'name', 'amount'], ({ to, name, amount }) => {
  return mint(ADMIN, TOKEN, to, amount)
}))

app.listen(port, () => console.log(`[SERVER] listening on port ${port}`))
