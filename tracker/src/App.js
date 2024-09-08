import { createBrowserRouter} from 'react-router-dom'
import ErrorPage from "./pages/Error"
import {Landing, Register, Root, ProtectedRoute} from './pages'
import SideBar from './components/SideBar'
import  {Profile, ManageAccount, Accountant,SharedLayout} from './pages/dashboard'


// function App() {

  const router = createBrowserRouter([
    {
      path : "account",
      element :  <ProtectedRoute>
                    <SharedLayout/>
                      </ProtectedRoute> ,
      errorElement : <ErrorPage/>,
      children:[
        {
          index: true,
          element : <ManageAccount/>

        },
        // {
        //   path : 'manageAccounts',
        //   element: <ManageAccount/>
    
        // },
        {
          path: 'accountant',
          element : <Accountant/>
        },
        {
          path: 'profile',
          element : <Profile/>
        }
        
      ]
    },

    {
      path : '/',
      element : <Landing/>
    },
    {
      path : 'register',
      element : <Register/>
    }


  ])




 
export default router
  // }



  


// export default App
