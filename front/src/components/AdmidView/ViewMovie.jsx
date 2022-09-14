import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMovies, getSearch } from "../../redux/Slice/movieAction";
import CardAdmin from "./Card";
import Footer from "../Presentational/footer";
import s from './Form.module.css';
import './AdminModify.css';
import Pagination  from "../UserView/Paginated";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import css from "../UserView/NavBar.module.css";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import styles from "../../styles/styles.module.css";
import styless from "../../styles/Admin.module.css"
import { BsFillHouseDoorFill} from "react-icons/bs";
import { AiFillLeftSquare } from "react-icons/ai";
import { Link } from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function AdminModifyMovies() {
    const dispatch=useDispatch()

    const movies=useSelector(state=>state.movies.movies)

    const [searchValue,setSearchValue]=React.useState('')

    const [page, setPag] = useState(1);  

 if(typeof movies !== 'string') {
     var moviesPerPage = 10;        
        
     var max= movies.length / moviesPerPage;

    
     var firstMovies = ((page-1)* moviesPerPage);  
     var lastMovies = firstMovies + moviesPerPage ;
 }
 const handleOnChange = (text) => {
  console.log(text.target.value)
  setSearchValue(text.target.value)
 }
 const searchOnClick = () => {
  if(searchValue.length > 0) {
    console.log(searchValue)
    dispatch(getSearch(searchValue));
  }
 }
 function handleRefresh() {
  // dispatch(clearMovies())
  dispatch(getMovies())
  setPag(1)
}
       React.useEffect(()=>{
         dispatch(getMovies())
       },[])

    return(
        <div>
          <div className={styless.title1}>
           <p className={styless.span1}>Admin Panel - Edit Movie</p>
           <div className={styless.home} >
            <Link to="/Home">   
               <BsFillHouseDoorFill className={styless.icon}/> 
            </Link>
            </div>
            <div className={styless.home1}><Link to="/panel"><AiFillLeftSquare className={styless.icon2}/></Link></div>
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
                      price={movie.price}
                      genres={movie.genres}
                      platform={movie.platform}
                      id={movie._id}/>
    

                )
              }): null
             }
            </div>
            <div className={typeof movies ==='string'?"Pagination":''} >
              <Pagination page={page} setPag={setPag} max={max} movies={movies} ></Pagination>
            </div>
           
        </div>
    )
}