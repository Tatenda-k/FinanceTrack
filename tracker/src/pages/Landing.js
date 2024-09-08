import landingImg from '../assets/images/landingImg.jpeg'
import {Link} from 'react-router-dom'
import Logo from '../components/Logo'




const Landing = ()=>{
    return(
        <div className="h-screen w-screen">

            <nav  >
                <Logo/>
            </nav>       
        <div className = "flex ">

            <div className = "flex flex-col justify-center py-8 px-4">

                <h1 className = "text-blue-500 text-5xl py-3">
                    Financial <span>Tracking</span> App
                </h1>
                <p className = "max-w-lg">
                    Track your monthly spending and networth easily. Link
                    all accounts that matter to you. The stress free way
                </p>
                <div className ='my-6'>
                <Link to ='/register' className = ' btn bg-blue-400 hover:bg-blue-600 rounded text-white my-2 py-2 px-4 flex-shrink-0' >
                    Login/Register
                </Link>
                </div>
                
            
            </div>
            <img  src ={landingImg} alt='finance tracker' className='hidden  md:block' />

        </div>
        

        </div>
        

    )
}

export default Landing