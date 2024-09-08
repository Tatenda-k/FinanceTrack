const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const plaidClientMiddleware = (req,res,next) =>{

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET,
      },
    },
  });
  const plaidClient = new PlaidApi(configuration)
  req.body.plaidClient = plaidClient

  next()
}

  module.exports = plaidClientMiddleware