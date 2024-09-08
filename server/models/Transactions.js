const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema(
    {
    user_id : {
        type: mongoose.Schema.ObjectId,
        ref : 'User',
    },
    account :{
        type : mongoose.Schema.ObjectId,
        ref: 'Account',
        required : true,
    },
    account_id : {
        type : String
    },
    account_owner : {
        type : String
    },
    amount :{
        type : Number,
        required : true,
    },
    currency : {
        type : String,
    },
    category : {
        type : String,
    },
    merchant : {
        type : String,
    },
    pending : {
        type : String
    },
    category_group : {
        type: String,
        required : true,

    },
   
    date : {
        type : Date
    },
    month : {
        type : Number
    },
    year: {
        type : Number
    },
    personal_finance_category : {
        type : String
    },
    
    details : {
        type : String
    }
},
    
    )

    module.exports = mongoose.model('Transaction',TransactionSchema)