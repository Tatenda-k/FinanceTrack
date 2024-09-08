const Account = require('../models/Accounts')
const Transaction = require('../models/Transactions')
const User = require('../models/User')


//send the username, return the array of accounts
const getAccounts = async (req,res) => {

    const {username} = req.body

    const user = await User.findOne({username : username})

    try{

    const accounts = await Account.find({owner: user._id})
    return res.json({accounts})
    }

    catch(error){
        console.log(error)
        res.status(500).send('failed to fetch accounts')
    }



}

const getTransactions = async (req,res) =>{
    const {username, transactionYear, bug} = req.body
    const user = await User.findOne({username : username})
    const page = Number(req.body.page) ||1;
    const skip = (page -1) *10

    try{
        //add transactions.year

        const query = {user_id: user._id, year: transactionYear }
        const transactionsCount = await Transaction.countDocuments(query)


        const transactions = await Transaction.find(query).skip(skip).limit(10)

        

        const numOfPages = Math.ceil(transactionsCount / 10 )
        console.log(numOfPages)

        return res.json({transactions, transactionsCount,numOfPages})
    }


    catch(error){
        console.log(error)
        res.status(500).send('failed to fetch transactions')
    }
    // res.status(500).send('failed to fetch transactions')

}


//send the month and year and username
const getSpendingYearMonth = async ( req,res)=>{
    const{pieYear, pieMonth,username} = req.body
    const months = ['January','February','March','April','May','June','July','August','September','October','November',
    'December']
    let monthIndex = months.findIndex( m => m === pieMonth)

    const user = await User.findOne({username : username})
        // console.log(pieMonth,'month')
    try{
    
    const results = await Transaction.aggregate([
        {
            $match:{ 
                user_id : user._id,
                month : pieMonth,
                year : Number(pieYear)

            }
        },
        
        
        {
            $group : 
            {
                _id : "$category_group",
                total_expenditure : {$sum : "$amount"}
            }
        }
    ])
    // console.log(results)
    res.json({results})
        
    }
        
    catch(error)
    {
        res.status(500).send('failed to retrieve spending aggregations')
    }




}
//send the year, month, and username
//returns an array of results

const getSpendingThreeMonths = async ( req,res)=>{
    const {year,month,username} = req.body
    const months = ['January','February','March','April','May','June','July','August','September','October','November',
    'December']
    
    let monthIndex = months.findIndex( m => m === month) +1
    const user = await User.findOne({username : username})
    const nextThreeMonths = [monthIndex, (monthIndex +1)%12, (monthIndex +2)%12]

    try{
    
   const results = await Transaction.aggregate([
        {
            $match:{
                 user_id : user._id, 
                  month : {$in : nextThreeMonths},
                  year : Number(year)       
            }
        },
        // {
        //     $match : { month : monthIndex}
        // },
        // {
        //     $match: { year : Number(year)}
        // },
        {
            $group : 
            {
                _id : {
                    category : "$category_group",
                    // month : "$month"
                    },
                total_expenditure : {$sum : "$amount"}
            }
        }
    ])
    console.log(results)
    res.json({results})
        
    }
        
    catch(error)
    {
        res.status(500).send(error)
    }




}


module.exports = {getAccounts, getTransactions, getSpendingThreeMonths, getSpendingYearMonth}