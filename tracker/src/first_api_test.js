import React, {useEffect,useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import axios from "axios"
import {usePlaidLink} from 'react-plaid-link'

axios.defaults.baseURL = "http://localhost:5000"

function PlaidAuth({publicToken}){



  useEffect( ()=>{
    console.log(publicToken,"tok")

    async function fetchData(){
      let accessToken = await axios.post("/api/exchange_public_token",{public_token: publicToken})
      console.log(accessToken.data)

      const auth = await axios.post("/auth", {access_token: accessToken.data.accessToken})
      console.log("authda",auth.data)

      const balance = await axios.post("/accounts/balance/get",{access_token : accessToken.data.accessToken})
      console.log("balance",balance.data)
      console.log("done")

      //const accounts = await axios.post("/api/accounts", {})
    }
    fetchData()
  },[])
 
  return (<span>{publicToken}</span>)
}
function App() {


  const [ linkToken,setLinkToken]=useState();
  const [ publicToken,setPublicToken]= useState();
  useEffect(()=>{
   
    async function fetch(){
    const response = await axios.post("/api/create_link_token")
    setLinkToken(response.data.link_token)
    console.log("response",response.data)

    }
    fetch()
  },[])



const { open, ready } = usePlaidLink({
  token: linkToken,
  onSuccess: (public_token, metadata) => {
    setPublicToken(public_token)
    console.log("success", public_token,metadata)
    console.log(publicToken)
    // send public_token to server
  },
});

return  publicToken ? (<PlaidAuth publicToken={publicToken} />) : (
  <button onClick={() => open()} disabled={!ready}>
    Connect a bank account
  </button>
);



  
}

export default App
