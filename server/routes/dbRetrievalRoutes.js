const express = require('express')
const router = express.Router()
const rateLimiter = require('express-rate-limit')


const {getAccounts,getTransactions, getSpendingThreeMonths, getSpendingYearMonth } = require("../controllers/dbRetrievalController")
router.post('/accounts',getAccounts)
router.post('/transactions',getTransactions)
router.post('/spendingThreeMonths',getSpendingThreeMonths)
router.post('/pieData', getSpendingYearMonth)

module.exports = router;