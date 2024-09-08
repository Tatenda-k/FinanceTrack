
import axios from "axios"

export const getAllTransactionsThunk = async(url,user,thunkAPI)=>{
    try{

        const {page, transactionYears} = thunkAPI.getState().transactions
        
        const res = await axios.post("/api/v1/db/transactions",{username: user.user.username, page : page, transactionYear : transactionYears})
        console.log(res.data)
        return res.data;

    }
    catch(error){
        console.log(error)
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}

export const getPieChartDataThunk = async(url, thunkAPI) =>{
    try{
        const {pieYear, pieMonth} = thunkAPI.getState().transactions
        const {user} = thunkAPI.getState().user

       
      


        const res = await axios.post("/api/v1/db/pieData", {username: user.username, pieYear, pieMonth})
        //itterrate over the array.
        //for every itterration, access index 1 and index 3 and append them to the new array
        let pieChartData = [['CATEGORY', 'AMOUNT']]
         for( let  i=0; i<res.data.results.length; i++){
            pieChartData.push([res.data.results[i]._id,Math.abs( res.data.results[i].total_expenditure)])

         }
        //  console.log(pieChartData[0],"data")

        return pieChartData

    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}