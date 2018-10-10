const { sdk, server } = require('./sdk')

module.exports = (admin, name, totalSupply) => {

  const issuer = admin.publicKey();
  return new sdk.Asset(name, issuer);
}
