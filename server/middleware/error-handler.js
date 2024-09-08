const {StatusCodes} = require('http-status-codes')


const errorHandlerMiddleware = (err,req,res,next)=>{
    let customError = {
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err || 'Something went wrong try again later'
    }

    console.log('error handled')
    console.log(err)

    return res.json({msg: customError.msg})

}

module.exports = errorHandlerMiddleware