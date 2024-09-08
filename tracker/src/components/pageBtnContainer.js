import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

import { useSelector, useDispatch} from 'react-redux'
import {changePage} from '../features/transactions/transactionsSlice'


const PageBtnContainer =() =>{
    const {numOfPages, page} = useSelector((store)=> store.transactions)
    const dispatch = useDispatch()

    const pages = Array.from({length: numOfPages}, (_,index)=>{
        return index+1;
    })

    const nextPage = ()=>{
        let newPage = page+1;
        if(newPage > numOfPages){
            newPage = 1
        }
        dispatch(changePage(newPage))
    }
    const prevPage = ()=>{
        let newPage = page - 1;
        if(newPage < 1 ){
            newPage = numOfPages
        }
        dispatch(changePage(newPage))
    }

    return(
        <>
        <div class = "flex justify-center items-center">
        <button type = 'button' class = "btn bg-blue-300 hover:bg-blue-600 rounded text-white my-2 py-1 px-1 flex-shrink-0 flex items-center" onClick ={prevPage}>
            <HiChevronDoubleLeft/>
            back
        </button>
        <div class= "inline-grid grid-cols-8 gap-x-2 mt-2 mx-3">
            {pages.map((pageNumber)=>{
                return(
                    <button  
                    type ='button'
                    key= {pageNumber}
                    className={`btn rounded  ${pageNumber === page ? 'pageBtn active': 'pageBtn'}`}
                    onClick = {()=>dispatch(changePage(pageNumber))}>
                        {pageNumber}
                    </button>
                )
            })}
        </div>
        <button type = 'button' class = "btn bg-blue-300 hover:bg-blue-600 rounded text-white my-2 py-1 px-1 flex-shrink-0 flex items-center" onClick ={nextPage}>
            
            next
            <HiChevronDoubleRight/>
        </button>
        </div>
        
        </>

    )
}

export default PageBtnContainer