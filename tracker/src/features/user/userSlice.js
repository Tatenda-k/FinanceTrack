import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
import {
    addUserToLocalStorage,
    getUserFromLocalStorage,
    removeUserFromLocalStorage,
  } from '../../utils/localStorage';
  import { loginUserThunk, registerUserThunk, clearStoreThunk, fetchAccountsThunk} from './userThunk';


const initialState = {
    isSideBarOpen : false,
    isLoading : false,
    user: getUserFromLocalStorage(),
    accounts : []

}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(user,thunkAPI) =>{
        return registerUserThunk('/api/v1/auth/register',user,thunkAPI)
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user,thunkAPI)=>{
        return loginUserThunk('/api/v1/auth/login',user,thunkAPI)

    }
)
export const clearStore = createAsyncThunk('user/clearStore',clearStoreThunk)

// export const fetchAccounts = createAsyncThunk('user/fetchAccounts',fetchAccountsThunk)

export const fetchAccounts = createAsyncThunk(
    'user/fetchAccounts',
    async(user,thunkAPI)=>{
        return fetchAccountsThunk('/api/v1/db/accounts',user,thunkAPI)
    }
)




const usersSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        toggleSidebar : (state) =>{
            state.isSideBarOpen = !state.isSideBarOpen
        },
        logoutUser : (state,{payload}) =>{
            console.log('logging out user')
            state.user = null
            state.isSideBarOpen = false;
            removeUserFromLocalStorage()
            

        }

    },
    extraReducers(builder){
        builder
            .addCase(registerUser.pending,(state, action)=>{
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled,(state, {payload})=>{
                const {user} = payload;
                console.log(payload)
                console.log(user)
                //user is email, username, token
            state.isLoading = false;
            if(user){
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Hi ${user.username}, Welcome!`)
            }
            //we would have to see what the error type is and display the message
            //examples: email-already-exists,passwordtooshort

                state.isLoading = true
            })
            .addCase(registerUser.rejected,(state, {payload})=>{
                state.isLoading = false;
                toast.error(payload)
            })
            .addCase(loginUser.pending,(state, action)=>{
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled,(state, {payload})=>{
                const {user} = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Hi ${user.username}, Welcome Back!`)
                state.isLoading = true
            })
            .addCase(loginUser.rejected,(state, {payload})=>{
                state.isLoading = false;
                toast.error(payload)
            })
            .addCase(clearStore.rejected,( state, action) =>{
                toast.error('There was an error')
            })
            .addCase(fetchAccounts.pending,(state, action) =>{
                state.isLoading = true
            })
            .addCase(fetchAccounts.fulfilled,(state, {payload})=>{
                const {accounts} = payload;
                state.accounts = accounts;
                state.isLoading = false;
                
            })
            .addCase(fetchAccounts.rejected,(state, {payload})=>{
                state.isLoading = false;
                toast.error(payload)
            })



    }
})

export const {toggleSidebar, logoutUser } = usersSlice.actions


export default usersSlice.reducer