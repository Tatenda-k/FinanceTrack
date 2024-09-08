
const AccessToken = require( "../models/AccessToken");
const User = require("../models/User")
const Account = require("../models/Accounts")
const Transaction = require("../models/Transactions")

const createLinkToken = async( req,res)=>{
  //pass in the username, and plaidClient comes from middleware
    const {username,plaidClient} = req.body
    
    console.log(process.env.PLAID_CLIENT_ID)
    console.log(process.env.PLAID_SECRET)

    const plaidRequest = {
  
        client_id: process.env.PLAID_CLIENT_ID,
        secret : process.env.PLAID_SECRET,
        user: {
          client_user_id: username
        },
        client_name: 'Tatenda App',
        products: ['auth','transactions'],
        language: 'en',
        //redirect_uri: 'http://localhost:3000/account',
        country_codes: ['US'],
      };
      try {
        const createTokenResponse = await  plaidClient.linkTokenCreate(plaidRequest);
        //response.json(createTokenResponse.data);
        //extract the linktoken from the response, and set the linktoken
        //use this to call usePlaidLink, which will return the public token
        responseData= createTokenResponse.data
        // console.log(responseData)
        //call use plaid link in front end which will get us a publictoken
        res.json(createTokenResponse.data);

        //make another api call to get the accesstoken
      } catch (error) {
         console.log(error)
        // console.log(plaidRequest)
        res.status(500).send('failure to create linktokein')
    
      }
}


const exchangePublicToken = async ( req,res) =>{

    const {plaidClient,username} = req.body
    const publicToken = req.body.public_token;


    try {
      const plaidResponse = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });
  
    
      const accessToken = plaidResponse.data.access_token;
      console.log('finding user')
      const user = await User.findOne({username}) 
      console.log('found user')
      await AccessToken.create({owner: user,accessToken: accessToken })
      console.log('added to accessToken')

      res.json({ accessToken });


    } catch (error) {
      // handle error
      console.log(error,"exchange error")
      res.status(500).send({detail:'failed to exchange public token',errormsg : error})
    }

}


//send the access token to this function
const fetchBankAccounts = async(req,res) =>{

      const {plaidClient,username,accessToken} = req.body

      const user = await User.findOne({username})

      //const {accessToken} = await AccessToken.findOne({owner : user._id})
      //console.log(accessToken,"access token")
      const request = {
      access_token: accessToken
    };
    try {
      console.log('actually getting accounts',)
      const response = await plaidClient.accountsGet({access_token: accessToken});
      const accounts = response.data.accounts;
      console.log(accounts)
      //returns an array of accounts
      //itterrate through this array and extract
      for (let i = 0; i<accounts.length; i++){
        const {balances, name, account_id, official_name,type,  subtype, persistent_account_id}=accounts[i]
            const {available, current, iso_currency_code, limit} = balances
        console.log(account_id)
        await Account.create({
          owner : user._id,
          accessToken : accessToken,
          account_id : account_id,
          accountName : name,
          type : type,
          subtype : subtype,
          limit : limit,
          currency : iso_currency_code,
          available : available, 
          current : current
        })

      }

      //we should not send anything? no
      res.status(200).send('added bank accounts to db')
    } catch (error) {
       console.log(error)

      res.status(500).send('failed to retrieve bank accounts')
      // handle error
    }



}

const  getBankAccountsWithToken = async(req,res)=>{
//  'accounts/get'
  //retrieve access token from the db.
  //don't we need all the access tokens that a user has
  console.log('getting banks with Token')
    const {plaidClient,username} = req.body

    const user = await User.findOne({username})

    const {accessToken} = await AccessToken.findOne({owner : user._id})
    console.log(accessToken,"access token")
    const request = {
      access_token: accessToken
    };
    try {
      console.log('actually getting accounts',)
      const response = await plaidClient.accountsGet({access_token: accessToken});
      const accounts = response.data.accounts;
      console.log(accounts)
      //returns an array of accounts
      //itterrate through this array and extract
      for (let i = 0; i<accounts.length; i++){
        const {balances, name, account_id, official_name,type,  subtype, persistent_account_id}=accounts[i]
            const {available, current, iso_currency_code, limit} = balances
        console.log(account_id)
        await Account.create({
          owner : user._id,
          accessToken : accessToken,
          account_id : account_id,
          accountName : name,
          type : type,
          subtype : subtype,
          limit : limit,
          currency : iso_currency_code,
          available : available, 
          current : current
        })

      }

      res.json({accounts})
    } catch (error) {
       console.log(error)

      res.status(500).send('failed to retrieve bank accounts')
      // handle error
    }

}



const getTransactionsFirstTime = async(req,res) =>{
    console.log('in function to get transactions')
    //assuming the user has transactions
    const {plaidClient,username} = req.body
    const user = await User.findOne({username})

    const {accessToken} = await AccessToken.findOne({owner : user._id})
    //use the access token to get the cursor in lambda
    //wan't to get all transactions with owner, regardless, but that so
    //should change to find all

    let added = new Array()
    let modified = new Array()
    let removed = new Array()    
    let hasMore = true
try{
    while (hasMore) {
      const request = {
        access_token: accessToken,
        // cursor: cursor,
      };
      
      const response = await plaidClient.transactionsSync(request);
      const data = response.data;
      // Add this page of results
      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed);
      hasMore = data.has_more;
      // Update cursor to the next cursor
      cursor = data.next_cursor;
    }
      //added returns an array
    //  console.log(added.length)
    //  console.log(added[added.length-1])
    //shall have to add handling for income that is coming in
      for(let i = added.length-1 ; i>=0;i--){
      const   {account_id, account_owner, amount, iso_currency_code, category, counterparties, date, merchant_name, pending, personal_finance_category } = added[i]
              console.log(personal_finance_category)
              const {primary,detailed}= personal_finance_category
              let categoryGroup = primary
              const otherCategories =[ 'GENERAL_MERCHANDISE', 'HOME_IMPROVEMENT', 'PERSONAL_CARE', 'GENERAL_SERVICES', 'GOVERNMENT_AND_NON_PROFIT', 'TRAVEL', 'BANK_FEES',
                'LOAN_PAYMENTS']
                if(otherCategories.includes(categoryGroup))
                {
                  categoryGroup = 'OTHER'
                }
               const parsedDate = new Date(date)
               console.log(primary)
               console.log(categoryGroup)
             let account = await Account.findOne({account_id : account_id})
              await Transaction.create({
                  user_id : user._id,
                  account : account,
                  account_id : account_id,
                  account_owner : account_owner,
                  amount : amount,
                  currency : iso_currency_code,
                  category : primary,
                  category_group : categoryGroup,
                  merchant : merchant_name,
                  pending : pending,
                  date : Date.parse(date),
                  details : detailed,
                  month :  parsedDate.getMonth(),
                  year : parsedDate.getFullYear()

              })

            }
          

      
      // console.log("added",added)
      res.json({transactions : added})
    }

    catch(error){
      console.log(error)
      res.status(500).send('error fetching transactions')
    }



     
    }

    //modified returns transactions
    //extract the transaction_id and search to db to update

    //removed,search transaction_id and remove

    //added returns an array of transactions
    //extract the account_id, and associate it with a user

    //extract also the account_owner, amount, currency, category
    //extract counterparties.name
    //extract date, pending, transaction_id
    //itterate throught the added backwards



module.exports = {
  createLinkToken,
  exchangePublicToken,
  getBankAccountsWithToken,
  getTransactionsFirstTime
}


