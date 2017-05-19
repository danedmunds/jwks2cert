const jwksClient = require('jwks-rsa');

var args = process.argv.slice(2);
if (args.length != 2) {
  console.log('Need 2 arguments, the url to the jwks.json and the kid')
  process.exit(1)
}

console.log(`jwks url: ${args[0]}`)
console.log(`kid: ${args[1]}`)

const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 10, // Default value
  jwksUri: args[0]
});

const kid = args[1];
client.getSigningKey(kid, (err, key) => {
  const signingKey = key.publicKey || key.rsaPublicKey;
  console.log('signing key:')
  console.log(signingKey)
});
