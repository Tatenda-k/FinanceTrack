import { FaHome } from 'react-icons/fa'
import { FaAlignLeft,FaUserCircle, } from 'react-icons/fa'
import Logo from './Logo'
import {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { toggleSidebar, logoutUser } from '../features/user/userSlice'

const TopBar =  () =>{

    const [showLogout,setShowLogout] = useState(false)
    const {user} = useSelector((store)=>store.user)

    const dispatch = useDispatch()
    return (

       

            <div className = 'flex justify-between w-[85vw] items-center  shadow-bottom' >
                <button type='button' className = 'toggle-btn' onClickCapture={()=>
                console.log('toggle sidebar')}>
                    <FaAlignLeft className="mx-2" />
                </button>
                <div>
                    <Logo/>
                    
                </div>
                <div className="flex justify-end" >
                    <div className="mx-2 inline-flex items-center" >
                   
                    <FaUserCircle />
                     <p className='px-2'>  {user?.username}</p>  
                   
                    </div>
                    <button  className = ' btn bg-slate-500 hover:bg-slate-600 rounded text-white my-2 py-1 px-2 mx-1 flex-shrink-0'
                    onClick={()=> dispatch(logoutUser())}
                    >
                        logout
                    </button>
                    </div>
                </div>
            
            
       
    )
}

export default TopBar