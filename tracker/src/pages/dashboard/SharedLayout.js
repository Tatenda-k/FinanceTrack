import {Outlet} from 'react-router-dom'
import SideBar from '../../components/SideBar'
import TopBar from '../../components/TopBar'

const SharedLayout = () =>{
    return(
            <main >
                <div  className = {`flex`}>

                <div  className = {`w-[150px]`} >
                <SideBar  />
                </div>
                <div className = {`flex-1`}>
                    <div className = {`flex flex-col`}>
                    <TopBar/>
                    <Outlet/>
                    </div>
                   
                </div>
                </div>
                   
            </main>
    )
}

export default SharedLayout