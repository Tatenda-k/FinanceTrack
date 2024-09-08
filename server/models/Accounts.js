
const mongoose = require('mongoose')

const AccountSchema = mongoose.Schema(
    {
        owner:{
            type : mongoose.Schema.ObjectId,
            ref : 'User',
            required : true,
        },
        accessToken:{
            type: String,
            required : true,
        },
        account_id :{
            type: String,
            required : true,

        },
        accountName : {
            type : String,
            required : true,
        },
        type : {
            type : String
        },
        limit : {
            type : Number
        },
        balance : {
            type : Number,
        },
        available : {
            type : Number
        },
        subtype : {
            type : String
        },
        currency : {
            type : String
        }
      

 
    }
)

module.exports = mongoose.model('Account',AccountSchema)