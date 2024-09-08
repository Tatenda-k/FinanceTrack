import {configureStore} from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import transactionsSlice from './features/transactions/transactionsSlice'



export const store = configureStore({
    reducer :{
        user: userSlice,
        transactions : transactionsSlice
    }
})
export default store