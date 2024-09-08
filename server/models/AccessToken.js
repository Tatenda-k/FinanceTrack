const mongoose = require('mongoose')

const AccessTokenSchema = mongoose.Schema(
    {
        owner:{
            type : mongoose.Schema.ObjectId,
            ref : 'User',
            required : true,
        },
        accessToken : {
            type : String,
            required : true,
        },
        cursor : {
            type : String,

        }
    }
)

module.exports = mongoose.model('AccessToken',AccessTokenSchema)