import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardIndividual from './Card';
import NavBar from "./NavBar";
import Order from "./Order";
import Cards from "./Cards";
import Pagination from "./Paginated"
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles.module.css"
import s from "../../styles/Buttons.module.css"
import Header from "../Presentational/header";
import Footer from "../Presentational/footer";
import { clearDetails, clearMovies, getGenres, getMovies } from "../../redux/Slice/movieAction";
import Swal from "sweetalert2";


export default function Home() {

 let movies= useSelector(state => state.movies.movies);
 console.log(movies)
 const dispatch = useDispatch()

 useEffect(()=>{
    dispatch(getGenres())
    dispatch(clearDetails())
    
 })

 function handleRefresh() {
    // dispatch(clearMovies())
    dispatch(getMovies())
    setPag(1)
 }
  
 const [page, setPag] = useState(1);  
 if(typeof movies !== 'string') {
     var moviesPerPage = 9;        
        
     var max= movies.length / moviesPerPage;
    
     var firstMovies = ((page-1)* moviesPerPage);  
     var lastMovies = firstMovies + moviesPerPage ;
 }
    return (
        <div>
            <Header/>
            <NavBar />
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={3} md={2}>
                            <Order />
                        </Grid>
                        {
                            movies === 'Movie not found' ?
                            <div className={styles.uniqueHome}>
                                <h2>Movie not found</h2>
                                <button onClick={() => handleRefresh()} className={s.btn}>Refresh</button>
                            </div>
                            :
                            <Grid item xs={12} sm={9} md={9}>
                            <div className={styles.container_grid}>
                                <Cards firstMovies={firstMovies} lastMovies={lastMovies} />
                            </div>
                            </Grid>
                        }
                    </Grid>
                    <Pagination page={page} setPag={setPag} max={max} movies={movies} ></Pagination>
                </Box>
            <Footer/>
        </div>
    )
}