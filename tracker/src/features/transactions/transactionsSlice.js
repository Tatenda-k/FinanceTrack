import { createSlice, createAsyncThunk, createDraftSafeSelector} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
import {getAllTransactionsThunk, getPieChartDataThunk} from './transactionsThunk'

const initialState = {
    isLoading : true,
    transactions : [],
    totalTransactions : 0,
    numOfPages : 1,
    page : 1,
    transactionYears : Number(new Date().getFullYear()),
    pieChartData:[],
    threeMonthStats :[],
    pieYear : Number(new Date().getFullYear()),
    pieMonth : Number(new Date().getMonth())

}

export const getTransactions = createAsyncThunk(
    'transactions/getTransactions',
    async(_,thunkAPI) =>{
        const state = thunkAPI.getState();
        const user = state.user
        return getAllTransactionsThunk('/db/transactions',user,thunkAPI)
    }
)

export const getPieChartData = createAsyncThunk(
    'transactions/getPieData',
    async(_, thunkAPI)=>{

        return getPieChartDataThunk('/db/pieData',thunkAPI)
    }
)

const transactionsSlice = createSlice({
    name : 'allTransactions',
    initialState,
    reducers : {
        showLoading : (state)=>{
            state.isLoading = true;
        },
        hideLoading : (state) =>{
            state.isLoading = false
        },
        changePage : (state,{payload})=>{
            state.page = payload;
        },
        changeTransactionYear : (state,{payload})=>{
            console.log(payload)

            state.transactionYears = payload;
        },
        changePieYear: (state,{payload})=>{
            state.pieYear = payload;
        },
        changePieMonth : (state,{payload})=>{
            state.pieMonth = payload

        }
    },
    
    extraReducers : (builder)=>{
        builder
            .addCase(getTransactions.pending, (state)=>{
                state.isLoading = true;
            })

            .addCase(getTransactions.fulfilled,(state,{payload}) =>{
                // console.log('here transactions')
                state.isLoading = false;
                state.transactions = payload.transactions;
                state.numOfPages = payload.numOfPages;
            }) 
            .addCase(getTransactions.rejected,(state,action)=>{
                state.isLoading = false;
                toast.error(action.payload)
            })
            .addCase(getPieChartData.pending, (state)=>{
                console.log('pending')
                state.isLoading = true;
            })

            .addCase(getPieChartData.fulfilled,(state,{payload}) =>{
                state.isLoading = false;
                state.pieChartData = payload
                console.log(state.pieChartData)
            }) 
            .addCase(getPieChartData.rejected,(state,action)=>{
                state.isLoading = false;
                toast.error(action.payload)
            })
    }
    
    
})

export const {showLoading, hideLoading, changePage, changeTransactionYear, changePieMonth, changePieYear } = transactionsSlice.actions
export default transactionsSlice.reducer