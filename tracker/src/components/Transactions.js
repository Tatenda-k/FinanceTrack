import {useEffect,useState} from 'react'
import axios from "axios"
import {useDispatch,useSelector} from 'react-redux'
import { getTransactions,changeTransactionYear } from '../features/transactions/transactionsSlice'
import {v4 as uuidv4} from 'uuid'

const Transactions = () =>{

    const date = Number(new Date().getFullYear())

    const {user} = useSelector((store) => store.user)
    const {page, transactions,isLoading, transactionYears} = useSelector((store)=>store.transactions)
    const dispatch = useDispatch()

    useEffect(()=>{

        dispatch(getTransactions())
        console.log('called dispatch')
        
    },[page,transactionYears])

    if (isLoading){
        return <h2>Loading ...</h2>
    }
    

    return (
        <div>
            <div className = 'year-btns'>
                <button disabled = {transactionYears ==date-1} onClick={()=> dispatch(changeTransactionYear(date-1))}>{date-1}</button>
                <button disabled = {transactionYears ==date} onClick = {()=> dispatch(changeTransactionYear(date))}>{date}</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope = "col">Date</th>
                        <th scope = "col">Merchant</th>
                        <th scope = "col">Description</th>
                        <th scope = "col">Category</th>
                        <th scope = "col">Card</th>
                        <th scope = "col">Amount</th>
                        {/* <th scope = "col">Pending</th> */}

                    </tr>
                </thead>
                <tbody>
                   {transactions.map((transaction) =>{
                    const {date,merchant_name,description,amount,account_id} =transaction
                    return(
                        <tr key ={uuidv4()}>
                        <td>2024-01-12</td>
                        <td>Walmart</td>
                        <td>Walmart Purchase</td>
                        <td>Tatenda's card</td>
                        <td>8575</td>
                        <td>$ 20 </td>
                        </tr>
                    )
                   })} 
                </tbody>
            </table>

        </div>
    )
}

export default Transactions