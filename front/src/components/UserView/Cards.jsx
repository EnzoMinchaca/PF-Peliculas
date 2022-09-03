import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardIndividual from './Card';
import { useSelector, useDispatch } from "react-redux"
import { getMovies } from '../../redux/Slice/movieAction';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Cards({firstMovies,lastMovies}){
  const dispatch=useDispatch();
  const movies=useSelector(state=>state.movies.movies)

    React.useEffect(()=>{
      dispatch(getMovies())
    },[])
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            {movies.length? movies.slice(firstMovies,lastMovies).map((movie)=>{
                return (
                <Grid item xs={12} md={4} sm={6} 
                >
                    <CardIndividual
                    title={movie.title}
                    image={movie.image}
                    genres={movie.genres}
                    platform={movie.platform}
                    id={movie._id}/>
                </Grid>
              )
            }):null}
        </Grid>
      </Box>
    )
}
