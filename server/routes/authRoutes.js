const express = require('express')
const router = express.Router()
const rateLimiter = require('express-rate-limit')


const apiLImiter = rateLimiter({
    windowMs : 15*60 * 1000,
    max : 10,
    message: {
        ms: 'Too many requests from this IP, please try again after 15 minutes'
    }
})
//install express-rate-limit
//add apiLimiter




const {register, login, logout } = require("../controllers/authController")
router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)

module.exports = router;