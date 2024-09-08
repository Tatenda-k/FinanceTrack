import {v4 as uuidv4} from 'uuid'



function BankAccounts ({accounts}) {
    
    return (
    
    <div className='container'>
        {
            accounts.map((account)=>{
                const {accountName,available,balance} = account
                return(
                    <div className = ' max-w-sm bg-white rounded overflow-hidden shadow-xl py-3  my-4 px-3'  key={uuidv4()}>
                    <p>{accountName}</p>
                    <p>Available : {available}</p>
                    <p>Balance : </p>
                    <button className = ' btn bg-red-400 hover:bg-red-600 rounded text-white my-2 py-2 px-2 flex-shrink-0'> remove account</button>    
                </div>


                )

            })
        }

    </div>

   
     
    )
}



export default BankAccounts