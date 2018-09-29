const express = require('express')
const app = express()
const port = 3000

const {
  createAsset, createAccount,
  getBalance,
  mint, send,
  runOperation,
} = require('./services')

const { ADMIN_KEY, ADMIN, CAF } = require('./account')

const aaa = (name, params, handler) => (req, res) => {
  console.log('REQUEST', name, req.query)

  const paramsValid = params.reduce((acc, param) => acc && req.query[param], true)

  if (!paramsValid)
    throw new Error(`Not enough args: ${params} required, got ${req.query}`)

  handler(req.query)
    .then(info => {
      console.log('200 Success', info)
      return res.json(info)
    })
    .catch(err => {
      console.error('500 Error', err.message)
      res.status(500).json({ err: true, message: err.message })
    })
}

app.get('/', (req, res) => res.send('Mint tokens at /mint?to&amount'))

app.get('/me', aaa('getBalance', [], () => {
  return getBalance(ADMIN.publicKey())
}))

app.get('/send', aaa('send', ['to', 'amount'], ({ to, amount }) => {
  return send(ADMIN, to, amount)
}))

app.get('/mint', aaa('mint', ['to', 'name', 'amount'], ({ to, name, amount }) => {
  return mint(ADMIN, CAF, to, amount)
}))


app.listen(port, () => console.log(`app listening on port ${port}!`))
