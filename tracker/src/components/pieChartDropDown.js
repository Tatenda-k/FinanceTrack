// import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import { DropdownButton, Dropdown } from 'react-bootstrap';
import { getPieChartData } from '../features/transactions/transactionsSlice';

import {changePieMonth, changePieYear} from '../features/transactions/transactionsSlice'
import {useDispatch, useSelector} from 'react-redux'

// import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css"


function DropDownButtons() {

  //   const { pieMonth, pieYear, pieChartData } = useSelector((store) => store.transactions);
  //   let dispatch = useDispatch()

  //   // console.log(pieMonth)
    

  //   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //   const years = [2023, 2024];

  //   const handleSelectMonth= ( index)=>{
  //       dispatch(changePieMonth(index))
  //       dispatch(getPieChartData())


        
        
  //   }

  //   const handleSelectYear = (index)=>{
  //     if(index == 0 ){
  //       dispatch(changePieYear(years[0]))
  //       dispatch(getPieChartData())

  //     }
  //     else{
  //       dispatch(changePieYear(years[1]))
  //       console.log('got here')
  //     }
        
        
  //   }
  // return (
  //   <>
      
  //         <DropdownButton
  //           as={ButtonGroup}
  //           key={1}
  //           id={'months'}
  //           variant={'primary'}
  //           title={months[pieMonth]}
  //           // onSelect = {handleSelect}
  //         >
  //           {months.map((month,index) =>(
  //               <Dropdown.Item 
  //               eventKey={index+1}
  //               key={index}
  //               active = {index ===pieMonth}
  //               onClick = {() =>handleSelectMonth( index)}
  //               >{month}
  //               </Dropdown.Item>
  //           ))}
            
  //         </DropdownButton>

  //         <DropdownButton
  //            as={ButtonGroup}
  //            key={2}
  //            id={'years'}
  //           variant={'primary'}
  //           title={pieYear}            
  //         >
  //           {years.map((year,index) =>(
  //               <Dropdown.Item 
  //               eventKey={index+1}
  //               key={index}
  //               active = {year ===pieYear}
  //               onClick = {() =>handleSelectYear(index)}
  //               >{year}
  //               </Dropdown.Item>
  //           ))}
            
  //         </DropdownButton>
    
  //   </>
 // );
}

export default DropDownButtons;