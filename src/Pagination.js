import React from 'react'

export default function Pagination({currentPage,totalPages,onPageChange}) {
    const maxButtons = 10;
    const calculateButtonRange = ()=>{
        const halfButton = Math.floor(maxButtons/2)
        let start = currentPage - halfButton;
        let end = currentPage+ halfButton;
        if(start < 1){
            start = 1;
            end = start+maxButtons-1
        }
        if(end >totalPages){
            end = totalPages;
            start = end - maxButtons +1;
            if(start < 1){
                start = 1
            }
        }
        return {
            start,end
        }
    }
    const {start,end} = calculateButtonRange();
    const pageNumbers  = Array.from({length:end-start+1},(_,index)=>start+index)
    console.log(pageNumbers)
  return (
    <div className='pagination'>
        <button onClick={()=>onPageChange(currentPage-1)} disabled={currentPage === 1}>Prev</button>
        {pageNumbers.map((item,index)=>(
            <button key={index} disabled={currentPage===item} onClick={()=>onPageChange(item)}>{item}</button>
        ))}
        <button onClick={()=>onPageChange(currentPage+1)} disabled={currentPage === totalPages}>Next</button>
    </div>
  )
}