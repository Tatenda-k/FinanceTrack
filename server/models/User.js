const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        maxlength : 50,
        minlength: 5,

    },
    email: {
        type : String,
        required : [true, 'Please provide email'],
        match : [  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',          
        ],
        unique :true,
    },
    password : {
        type : String,
        required : [true, 'Please provide password'],
        minlength: 6
    },
    balance : {
        type : Number
    },
    available :{ 
        type : Number
    },
    accessToken : {
        type : String
        //do you need an access token for every bank?
    }
})

UserSchema.pre('save', async function(){
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}

UserSchema.methods.createJWT = async function(){
    return jwt.sign(
        {id: this._id, username: this.username},
        process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_LIFETIME,
        }
    )

}

module.exports = mongoose.model('User',UserSchema)