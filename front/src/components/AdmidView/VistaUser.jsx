import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import CardsUser from "./visPrueba";
import Footer from "../Presentational/footer";
import styles from "../../styles/styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterBStatus, allUsers, getSearchUser } from "../../redux/Slice/userAction";
import NavHome from "../AdmidView/NavBar";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Pagination, { objIndexPagination } from "../AdmidView/Pagination";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import css from "../UserView/NavBar.module.css";
import SearchIcon from '@mui/icons-material/Search';


//estilos para el SEARCH
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


export default function AdminModifyUser() {

    const navigate = useNavigate()
    const [isUser, setisUser] = useState(true)

    const dispatch = useDispatch();
    const [ setOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1); 
    const users=useSelector(state=>state.users.users);
    const quantityXPage = 6; 

      //Paginado
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const { lastItemIndex, firstItemIndex } = objIndexPagination(
    currentPage,
    quantityXPage
  );
  const handleStatusFilter = (status) => {
        dispatch(filterBStatus(status));
        setOrder(status);
        setCurrentPage(1);
 };
      //search
  const [searchValue,setSearchValue]=useState('')
  const handleOnChange = (text) => {
    setSearchValue(text.target.value)
   }
   const searchOnClick = () => {
    if(searchValue.length > 0) {
      dispatch(getSearchUser(searchValue));
    }
   }
      useEffect(() => {
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
      }, [])

      if(isUser) {
        return(
            <div>
            </div>
        )
    } else {
      return(
          <div>
              <div className={styles.title}>
                  <p className={styles.span}> Admin Panel -- Users</p>
                   {/*para el search */}
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
             {/*para el search */}
              </div>
             
              <NavHome 
              handleStatusFilter={handleStatusFilter}/>
            
              <CardsUser
              lastItemIndex={lastItemIndex}
              firstItemIndex={firstItemIndex}/>
  
              <Pagination
              items={users}
              quantityXPage={quantityXPage}
              handlePagination={handlePagination}
              currentPage={currentPage}
            />
  
            <Footer></Footer>
                                            
          </div>
      )
    }

}