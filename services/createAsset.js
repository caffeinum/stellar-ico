const { sdk, server } = require('./sdk')

module.exports = (admin, issuer, name, totalSupply) => {

  const keypair = sdk.Keypair.fromSecret(admin)

  const address = issuer || keypair.publicKey();
  return new sdk.Asset(name, address);
}
