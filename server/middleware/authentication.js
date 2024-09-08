const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const auth = async (req,res,next)=>{
    const authHeader = req.headers.authorizaation
    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.json('Authentication error authHeader not set')
    }
    const token = authHeader.split(' ')[1]
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(e){
        
    }
}