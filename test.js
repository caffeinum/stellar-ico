const {
  createAsset, createAccount,
  getBalance,
  mint, send,
  runOperation,
} = require('./services')

const { ADMIN_KEY, ADMIN, CAF } = require('./account')

Promise.resolve()
.then(async () => {
  await mint(ADMIN, CAF, ADMIN.publicKey(), 1000);

  const balances = await getBalance(ADMIN.publicKey());

  console.log('balance after mint', balances);
})
.then(async () => {

  await send(ADMIN, "GBBORXCY3PQRRDLJ7G7DWHQBXPCJVFGJ4RGMJQVAX6ORAUH6RWSPP6FM", 100);

  const balances = await getBalance(ADMIN.publicKey());
  const hisbalan = await getBalance("GBBORXCY3PQRRDLJ7G7DWHQBXPCJVFGJ4RGMJQVAX6ORAUH6RWSPP6FM");

  console.log('balance after send', balances)
  console.log('his balance after', hisbalan)
})
