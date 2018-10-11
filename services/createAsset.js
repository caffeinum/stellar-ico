const { sdk, server } = require('./sdk')

module.exports = (admin, name, totalSupply) => {

  const keypair = sdk.Keypair.fromSecret(admin)

  const issuer = keypair.publicKey();
  return new sdk.Asset(name, issuer);
}
