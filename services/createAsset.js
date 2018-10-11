const { sdk, server } = require('./sdk')

module.exports = (admin, user, name, totalSupply) => {

  const keypair = sdk.Keypair.fromSecret(admin)

  const issuer = user || keypair.publicKey();
  return new sdk.Asset(name, issuer);
}
