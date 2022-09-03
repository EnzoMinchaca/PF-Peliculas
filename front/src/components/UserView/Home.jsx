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

export default function Home() {

 let movies= useSelector(state => state.movies.movies);
  
 const [page, setPag] = useState(1);  
 let moviesPerPage = 10;        
    
 const max= movies.length / moviesPerPage;

 let firstMovies = ((page-1)* moviesPerPage);  
 let lastMovies = firstMovies + moviesPerPage ;
    return (
        <div>
            <NavBar />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={3}>
                        <Order />
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                        <Cards firstMovies={firstMovies} lastMovies={lastMovies} />
                    </Grid>
                </Grid>
                <Pagination page={page} setPag={setPag} max={max} movies={movies} ></Pagination>
            </Box>
        </div>
    )
}