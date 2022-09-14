import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { getMovies, getSearch, sortSoldMovies } from "../../redux/Slice/movieAction";
import CardAdmin from "./Card";
import './AdminModify.css';

import styles from "../../styles/Admin.module.css"
import { BsFillHouseDoorFill} from "react-icons/bs";
import { AiFillLeftSquare } from "react-icons/ai";
import { Link } from "react-router-dom";


export default function AdminModifyMovies() {


    const navigate = useNavigate()
    const [isUser, setisUser] = useState(true)

    const dispatch=useDispatch()
    const movies=useSelector(state=>state.movies.movies)


       React.useEffect(()=>{
         dispatch(getMovies())
         const user = JSON.parse(localStorage.getItem('user'))
        if(user === null) {
            console.log(user)
            // setisUser(true)
            navigate("/home")
        }
        if(user) {
            const flag = user.isUser ? true : false
            // setisUser(true)
            if(flag) {
                navigate("/home")
            }
        }
        setisUser(false)
       },[])


      if(isUser) {
        return(
            <div></div>
        )
    } else {
      return(
          <div>
             <div className="link">
                  <NavLink to="/panel" key={"panel"} className={s.text}>
                      Back
                  </NavLink>
                      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Search>
               
                  <StyledInputBase
                    onChange={(text) => handleOnChange(text)}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    
                    className={css.inputSearch}
                  />
                </Search>
          
                <Button onClick={() => searchOnClick()}  className={css.searchBtn}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                </Button>
              </Box>
                  {/*odenamiento de mas a menos vendidas*/}
                  <h5>Sort by sales </h5>
                  <select name="select" onChange={e => onSelectChange(e)}>
                    <option value="none" >--</option>
                    <option value='DESCENDENTE' >most sold</option>
                    <option value='ASCENDANT' >least sold</option> 
                  </select>  
              </div>
              <div className="section">
              {typeof movies ==='string'?
                <div className={styles.uniqueHome}>
                <h2>Movie not found</h2>
                <button onClick={() => handleRefresh()} className={s.btn}>Refresh</button>
            </div>
              :
              movies.length>0? movies.slice(firstMovies,lastMovies).map((movie)=>{
                    return (
                      
                        <CardAdmin
                        key={movie.id}
                        title={movie.title}
                        image={movie.image}
                        price={movie.price}
                        genres={movie.genres}
                        platform={movie.platform}
                        amountOfSales={movie.amountOfSales}
                        id={movie._id}/>
      
                  )
                }): null
               }
              </div>
              <div className={typeof movies ==='string'?"Pagination":''} >
                <Pagination page={page} setPag={setPag} max={max} movies={movies} ></Pagination>
              </div>
                <Footer/>


    return(
        <div>
          <div className={styles.title1}>
           <p className={styles.span1}>Admin Panel - View Movies</p>
           <div className={styles.home} >
            <Link to="/Home">   
               <BsFillHouseDoorFill className={styles.icon}/> 
            </Link>
            </div>
            <div className={styles.home1}><Link to="/panel"><AiFillLeftSquare className={styles.icon2}/></Link></div>

          </div>

                      <CardAdmin/>
            
           
        </div>
    )

}