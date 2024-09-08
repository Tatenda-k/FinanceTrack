import axios from 'axios'
import {logoutUser} from './userSlice'


export const registerUserThunk = async(url, user, thunkAPI) =>{
    try{
        const resp = await axios.post('/api/v1/auth/register',user);
        return resp.data;
    }
    catch(error){

    return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}

export const loginUserThunk = async(url, user, thunkAPI) =>{
    try{
        //email, password
        const resp = await axios.post('/api/v1/auth/login',user);
        return resp.data;
    }
    catch(error){

        console.log(error.response.data.msg)
    return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}


export const clearStoreThunk = async (message,thunkAPI) =>{
    try{
        thunkAPI.dispatch(logoutUser(message))
        return Promise.resolve()
    }catch(error){
        return Promise.reject()
    }}

export const fetchAccountsThunk = async(url,user,thunkAPI)=>{

    try{
        console.log('fetching accounts')
        const res = await axios.post("/api/v1/db/accounts",{username: user.user.username})
        console.log(res.data.accounts)
        return res.data

    } catch(error){
        console.log(error)
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }


}