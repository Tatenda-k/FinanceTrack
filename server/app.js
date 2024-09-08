require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require("cors")
const connectDB = require('./db/connect')

const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const cookieParser = require('cookie-parser');


//routes
const authRouter = require('./routes/authRoutes')
const plaidToken = require('./routes/plaidConnectRoutes')
const fetchDb = require('./routes/dbRetrievalRoutes')

//error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const plaidClientMiddleware = require('./middleware/configuration')

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});




const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(plaidClientMiddleware)

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/token", plaidToken)
app.use("/api/v1/db",fetchDb )








app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// Account filtering isn't required here, but sometimes 
// it's helpful to see an example. 


const start = async()=>{
  try{
    await connectDB(process.env.MONGO_URI)
    app.listen(5000,()=>console.log("listening at port 5000"))
  }
  catch(error){
    console.log(error)
  }
}

start()