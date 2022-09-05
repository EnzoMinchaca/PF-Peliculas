import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardIndividual from './Card';
import NavBar from "./NavBar";
import Order from "./Order";
import Cards from "./Cards";
import Pagination from "./Paginated"
import { useSelector } from "react-redux";
import styles from "../../styles/styles.module.css"
import Header from "../Presentational/header";
import Footer from "../Presentational/footer";



export default function Home() {

 let movies= useSelector(state => state.movies.movies);
  
 const [page, setPag] = useState(1);  
 let moviesPerPage = 9;        
    
 const max= movies.length / moviesPerPage;

 let firstMovies = ((page-1)* moviesPerPage);  
 let lastMovies = firstMovies + moviesPerPage ;
    return (
        <div>
            <Header/>
            <NavBar />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={3} md={2}>
                        <Order />
                    </Grid>

                    <Grid item xs={12} sm={9} md={9}>
                      <div className={styles.container_grid}>
                        <Cards firstMovies={firstMovies} lastMovies={lastMovies} />
                      </div>
                    </Grid>

                </Grid>
                <Pagination page={page} setPag={setPag} max={max} movies={movies} ></Pagination>
            </Box>
            <Footer/>
        </div>
    )
}