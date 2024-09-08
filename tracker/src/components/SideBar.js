import NavLinks from './NavLinks'
import Logo from '../components/Logo'

import {useSelector} from 'react-redux'


const SideBar = () =>{

     const {isSidebarOpen} = useSelector((store)=>store.user)

    return (
        <div  
        className={
            isSidebarOpen
            ? 'sidebar-container show-sidebar'
            : 'sidebar-container show-sidebar'
        }>
        <div className='content'>
            <header>
                <Logo/>
            </header>
            <NavLinks/>
        </div>
           
        </div>
    )

}

export default SideBar