import {Outlet} from 'react-router-dom'
import SideBar from '../../components/SideBar'
import TopBar from '../../components/TopBar'

const SharedLayout = () =>{
    return(
            <main className ='dashboard'>
                
                <SideBar/>
                <div>
                    <TopBar/>
                    <div className='dashboard-page'>
                        <Outlet/>
                    </div>
                </div>
                   
            </main>
    )
}

export default SharedLayout