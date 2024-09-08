import { usePlaidLink } from "react-plaid-link"
import axios from "axios"
import React,{useState,useEffect} from 'react' 
import { useDispatch,useSelector } from "react-redux"
import {BankAccounts} from '../../components'
import { fetchAccounts } from "../../features/user/userSlice"




function ManageAccount (){

    const {user} = useSelector((store)=>store.user)
    const {accounts} = useSelector((store)=>store.user)
    const [linkToken,setLinkToken] = useState()
    const [ publicToken,setPublicToken]= useState();
    const dispatch = useDispatch()

    

    const {open,ready} = usePlaidLink({
        token: linkToken,

        onSuccess: (public_token, metadata) => {
        setPublicToken(public_token)
        console.log('exchanging')
        }

    })

    useEffect(()=>{
        dispatch(fetchAccounts({user: user}));
        // console.log('user.accounts')
        // console.log(accounts)

    },[])

    useEffect(()=>{
        if(linkToken  && ready){
            console.log("ready now")
            try{
             open()
             console.log('opened')
             //we could just force the page to refresh
            }
            catch(error){
                console.log('problem connecting to bank try later')
            }
            //i guess we have to reset to connect other accounts
        }
    },[linkToken,ready,])

    const  getLinkToken =async ()=>{
        console.log(ready)
        console.log(linkToken)
        console.log('link token')
        const response = await axios.post("/api/v1/token/create_link_token",{username : user.username})
        setLinkToken(response.data.link_token)
        //ohh, we have to wait for state to update this 
        console.log("response",linkToken)
     }
     useEffect(()=> {
        
    const exchangeForAccessToken = async()=>{
      let accessToken = await axios.post("/api/v1/token/exchange_public_token",{public_token: publicToken, username : user.username})
      //then get bank accounts and reset state
       await axios.post("/api/v1/token/bank_accounts",{public_token: publicToken, username : user.username})
       await axios.post("/api/v1/token/transactions",{public_token: publicToken, username : user.username})


      console.log('exchanged')
      dispatch(fetchAccounts({user: user}));
      console.log('dispatched')
      setLinkToken(null)
      setPublicToken(null)

    }

    if(publicToken){
    exchangeForAccessToken()
    }
    //reset everything


     },[publicToken])

    // const getBankAccounts = async()=>{

    //     let accounts = await axios.post("/api/v1/token/bank_accounts",{username: user.username})
    //     console.log(accounts)
       
    // }

    

    return(
        <div>

            <button onClick ={() => getLinkToken()  } className = ' btn bg-green-400 hover:bg-blue-600 rounded text-white my-2 py-2 px-4 flex-shrink-0' >
                Connect a bank account
            </button>

            {/* <button onClick = {() => getBankAccounts()}>
                bankAccounts
            </button> */}
            <BankAccounts accounts={accounts}/>




        </div>
    )
}

export default ManageAccount