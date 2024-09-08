import { NavLink} from 'react-router-dom'
import links from '../utils/links'


const NavLinks = () => {


    const method = ((text)=>{
        console.log('text')

    })
        
    
    console.log(links)
    return(
        <div className ='nav-links'>
            {links.map((link,index) =>{
                const {text,path,id,icon} = link
                return(
                    <NavLink
                    to={path}
                    onClick={()=>{method(text)}}
                   
                    className={({ isActive}) =>{
                        return isActive ? 'nav-link active' : 'nav-link'
                    }}
                    key={index}
                    >
                       <span className='icon'>{icon}</span>
                        {text}
                    </NavLink>
                )
            })}

        </div>

        
    )
}

export default NavLinks