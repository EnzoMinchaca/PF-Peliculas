import './Paginated.css'

const Pagination= ({page,setPag,max,movies}) =>{

 const prevHandler = () =>{
   setPag(page-1)
 }
 
 const nextHandler = (e) =>{
  
   setPag(page+1)
 }
 const handleChange = (e) =>{
  setPag(parseInt(e.target.innerHTML))
 }

 let numbrerPages= [];
 for (let i = 1; i < max+1; i++) {
   numbrerPages.push(i);
  }

  return(
    <div>
       {
        movies.length>0?
        <div className='Pag'>
            <button className={page <= 1? 'not-button' :'button'} disabled={page <= 1 } onClick={prevHandler} >⪨ </button>
        { 
         <div className='numPage' >
          {
            numbrerPages.map(num =>{
              return <a className={num===page? 'colorNum': 'not-colorNum'} key={num} onClick={handleChange}>{num}</a>
            })
          }
         </div>
        }
        <button className={page >= max? 'not-button' :'button'} disabled={page >= max} onClick={nextHandler}> ⪩ </button>
        </div>
        :
        <p></p>
    }

    </div>

  )

};

export default Pagination;
