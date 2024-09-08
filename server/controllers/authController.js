const User = require('../models/User')
const {StatusCodes } = require('http-status-codes')

const register = async (req,res) =>{
    //add the user confirming their email,probably use aws for that
    const {email, username, password } = req.body


    
    console.log('registering')
    const emailAlreadyExists = await User.findOne({email})
    console.log(emailAlreadyExists)
    if(emailAlreadyExists){
        res.json("Email already exists")
        return
    }
    const usernameExists = await User.findOne({username}) 
    if(usernameExists){
        res.json("Username already exists")
        return
    }
    //should we try this
    const user = await User.create({ username, email, password })
    const token = user.createJWT()

    res.status(StatusCodes.OK).json({
        user:{
            email : user.email,
            username : user.username,
            balance : user.balance,
            avaliable : user.available,
            token,
        }
    })
    return
    
    

}

const login = async (req,res) =>{
    console.log('enteirng login method')
    const {email,password} = req.body
    if(!email ||!password){
        res.json('Please provide email and password')
    }
    const user = await User.findOne({email : email})
    
    if(!user){
        res.json("Invalid credentials")
    }
    const compare = user.comparePassword(password)
    if(!compare){
        res.json('Invalid credentials')
    }
    //custom errors, and cookies
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        user:{
            email : user.email,
            username : user.username,
            balance : user.balance,
            avaliable : user.available,
            token,
        }
    })
    console.log('logged in')
    // res.status(StatusCodes.OK).json({user})
}

const logout = async (req,res) =>{
    //expire their cookie
    res.cookie('token', 'logout',{
        httpOnly: true,
        expires : new Date(Date.now() + 1000)
    })
    res.status(StatusCodes.OK).json({msg: 'userlogged out!'})
}


const update = async (req,res)=>{

}

module.exports = {
    register,
    login,
    update,
    logout,
}