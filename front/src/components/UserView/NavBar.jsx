import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom"
import css from "./NavBar.module.css"
import Style from "./NavBar.module.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Navigate, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { filterPlataform, getSearch } from '../../redux/Slice/movieAction';
import { logOut } from '../../redux/Slice/userAction';
import { useState } from 'react';
import ShoppingCart from "../Presentational/ShoppingCart.tsx"
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


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

export default function NavBar({setPag, openModal, userMenu}) {
  const navigate=useNavigate()
    const pages = ['All','Netflix', 'Disney+', 'Amazon','Paramount+','HBOMAX'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [admin,setAdmin]=React.useState(false)
  const [searchValue,setSearchValue]=React.useState()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const cart = useSelector((state)=> state.movies.cart)

  React.useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      if(user.isUser){
        setLogin(true)
      }else{
        setLogin(false)
      }

      if(user.isAdmin){
      setAdmin(true)
      }else{
        setAdmin(false)
      }
      setImage(user.image)
    }else{
      setLogin(false)
      setAdmin(false)
    }
   
  })

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch= useDispatch();
  const handleSingOff = () => {
    setAnchorEl(null);
    dispatch(logOut())
  };
  const handleEdit=()=>{
    return(
      navigate("/editUser")
    )
  }
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const handleOnClickNavMenu =(plataform)=>{
    dispatch(filterPlataform(plataform.target.innerText))
    console.log(plataform.target.innerText)
    setPag(1)

  }
  const handleOnChange = (text) => {
    setSearchValue(text.target.value)
  }
  const searchOnClick = () => {
    if(searchValue.length > 0) {
      dispatch(getSearch(searchValue));
    }
  }

  React.useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      setLogin(true)
    }
  },[])

  if(!login && !admin){
    return (
      <AppBar position="static" className={css.fondo}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MovieCreationIcon className={css.margin} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              HMovies
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <MovieCreationIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              HMovies
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
  
                  onClick={(page)=>handleOnClickNavMenu(page)}
  
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Search>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(text) => handleOnChange(text)}
                  className={css.inputSearch}
                />
              </Search>
              <Button onClick={() => searchOnClick()} className={css.searchBtn}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
              </Button>
            </Box>
  
            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <IconButton sx={{ p: 0 }}>
                <Link to="/Create" key={"Create"}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  className={css.linkBtn}>
                  Create Movie
                </Link>
              </IconButton>
            </Box> */}
  
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <ShoppingCart/>
              </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={()=>openModal()} sx={{ p: 0 }}>
                  <Button to="/Login"           
                  key={"LogIn"}
                  onClick={()=>openModal()}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  className={css.linkBtn}
                  >
                  Login
                  </Button>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }else if(login){
    return (
      <AppBar position="static" className={css.fondo}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MovieCreationIcon className={css.margin} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              HMovies
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <MovieCreationIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              HMovies
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
  
                  onClick={(page)=>handleOnClickNavMenu(page)}
  
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Search>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(text) => handleOnChange(text)}
                  className={css.inputSearch}
                />
              </Search>
              <Button onClick={() => searchOnClick()} className={css.searchBtn}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
              </Button>
            </Box>
  
            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <IconButton sx={{ p: 0 }}>
                <Link to="/Create" key={"Create"}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  className={css.linkBtn}>
                  Create Movie
                </Link>
              </IconButton>
            </Box> */}
  
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <ShoppingCart cart={cart}/>
              <Link to="/Favorites"><button className={Style.button}><FavoriteIcon/></button></Link>
              </Box>
  
            {/* <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={()=>openModal()} sx={{ p: 0 }}>
                  <Button to="/Login"           
                  key={"LogIn"}
                  onClick={()=>openModal()}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  className={css.linkBtn}
                  >
                  Login
                  </Button>
                </IconButton>
              </Tooltip>
            </Box> */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  <Button to="/userMenu"           
                  key={"userMenu"}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  className={css.linkBtn}
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  >
                 <img src={image} alt={image} className={css.image}/>
                  </Button>
                </IconButton>
              </Tooltip>
            </Box> 
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleEdit}>Profile</MenuItem>
              <MenuItem onClick={handleSingOff}>Sing off</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }else if(admin){
    return(
      <AppBar position="static" className={css.fondo}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MovieCreationIcon className={css.margin} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HMovies
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <MovieCreationIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HMovies
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}

                onClick={(page)=>handleOnClickNavMenu(page)}

                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Search>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(text) => handleOnChange(text)}
                className={css.inputSearch}
              />
            </Search>
            <Button onClick={() => searchOnClick()} className={css.searchBtn}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
            </Button>
          </Box>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <IconButton sx={{ p: 0 }}>
              <Link to="/Create" key={"Create"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                className={css.linkBtn}>
                Create Movie
              </Link>
            </IconButton>
          </Box> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <IconButton sx={{ p: 0 }}>
            <Link to="/Create"   key={"Create"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                className={css.linkBtn}>
                <AddIcon className={css.margin} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
            </Link>
            </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <IconButton sx={{ p: 0 }}>
            <Link to="/panel"   key={"panel"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                className={css.linkBtn}>
                <AdminPanelSettingsIcon className={css.margin} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
            </Link>
            </IconButton>
            </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={()=>openModal()} sx={{ p: 0 }}>
                <Button to="/Login"           
                key={"LogIn"}
                onClick={()=>openModal()}
                sx={{ my: 2, color: 'white', display: 'block' }}
                className={css.linkBtn}
                >
                Login
                </Button>
              </IconButton>
            </Tooltip>
          </Box> */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Button to="/userMenu"           
                key={"userMenu"}
                sx={{ my: 2, color: 'white', display: 'block' }}
                className={css.linkBtn}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                >
              <img src={image} alt={image} className={css.image}/>
                </Button>
              </IconButton>
            </Tooltip>
          </Box> 
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleEdit}>Profile</MenuItem>
            <MenuItem onClick={handleSingOff}>Sing off</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
    )
  }
  
};