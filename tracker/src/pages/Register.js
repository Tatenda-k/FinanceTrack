import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
import {loginUser,registerUser} from '../features/user/userSlice'
import {useNavigate} from 'react-router-dom'
import Logo from '../components/Logo'
import FormRow from '../components/FormRow';
import {useState,useEffect} from 'react'


const initialState = {
    username: '',
    password: '',
    email: '',
    isMember: true
}
const Register =() =>{
    const [person,setPerson] = useState(initialState)
    const {user,isLoading} = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setPerson({...person, [name]:value })
    }
    
    const onSubmit =(e) =>{
        e.preventDefault()
        const {name, email, password, isMember} = person;
        if(!email || !password || (!isMember &&!name)){
            toast.error('Please fill all fields')
            return
        }
        if(isMember){
            dispatch(loginUser({ email : email, password : password}))
            return
        }
        dispatch(registerUser({ email : email, password: password, username: name}))
    }
    const toggleMember = () =>{
        setPerson({...person,isMember : !person.isMember})

    }

    useEffect(() =>{
        if(user){
            console.log(user)
            setTimeout(()=> {
                navigate('/account')
            },2000)
        }
    },[user])

    return(

        <div className= 'h-screen flex items-center justify-center'>
            
            <div className='border  border-gray-400 rounded-md p-5 ' >
            <form className='form  flex flex-col' onSubmit={onSubmit}>
            <Logo className='logo'/>
               
                <h3 className='text-center text-lg'>{person.isMember ? 'Login' : 'Register'}</h3>
                {!person.isMember && (
                    <FormRow
                    type = 'text'
                    name = 'name'
                    value = {person.name}
                    handleChange={handleChange}
                    />
                )}
                 <FormRow 
                    type= 'email'
                    name= 'email'
                    value={person.email}
                    handleChange={handleChange}
                    />
                <FormRow 
                    type= 'password'
                    name= 'password'
                    value={person.password}
                    handleChange={handleChange}
                    />
                <button type ='submit' className= 'btn bg-blue-400 hover:bg-blue-600 rounded text-white my-2 py-2 px-4 flex-shrink-0' disabled={isLoading}>
                    {isLoading ? 'loading' : 'submit'}
                </button>
                <p className='text-center'>
                    {person.isMember ? 'First time?' : 'Here before?'}
                <button type = 'button' onClick={toggleMember} className='underline text hover:text-green-500'>
                    {person.isMember ? ' Register' :' Login'}
                </button>
                </p>
            

            </form>
            </div>

        </div>
    )
}


export default Register