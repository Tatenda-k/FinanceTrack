const express = require('express')
const router = express.Router()
const configurePlaid   = require('../middleware/configuration')

router.use(configurePlaid)

const {createLinkToken,exchangePublicToken,getBankAccountsWithToken, getTransactionsFirstTime} = require("../controllers/plaideConnectController")
router.post('/create_link_token',createLinkToken)
router.post('/exchange_public_token',exchangePublicToken)
router.post('/bank_accounts', getBankAccountsWithToken)
router.post('/transactions',getTransactionsFirstTime)


module.exports = router;