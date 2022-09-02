import axios from "axios";
import Swal from "sweetalert2";

import { getAllMovies, 
    getMoviesById,  
    getSearchMovie, 
    getByGenres,
    getByPlatform,
    sortRating,
    sortYear
  }from "./movieSlice";




export const getMovies=()=>(dispatch)=>{
    axios.get("http://localhost:3001/getMovies")
    .then(resp=> {
        return{
            payload:dispatch(getAllMovies(resp.data))            
        }})
    
    .catch((e) => {
        console.log(e);
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! -- Getmovies",
          });
      });
}

export const getMovieById=(id)=>(dispatch)=>{
    axios.get(`http://localhost:3001/movieDetails/${id}`)
    .then(resp=>dispatch(getMoviesById(resp.data)))
    .catch((e) => {
        console.log(e);
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! -- GetmoviesById",
          });
      });
}

export const getSearch=(name)=>(dispatch)=>{
    axios.get(`http://localhost:3001/getMovies?name=${name}`)
    .then(resp=>dispatch(getSearchMovie(resp.data)))
    .catch((e) => {
        console.log(e);
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! -- GetSearch",
          });
      });      
}

export const getGenres=()=>(dispatch)=>{
    axios.get(`http://localhost:3001/genres`)
    .then(resp=>dispatch(getByGenres(resp.data)))
    .catch((e) => {
        console.log(e);
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! -- getGenres",
          });
      });      
}

export const getPlatform=()=>(dispatch)=>{
    axios.get(`http://localhost:3001/platform`)
    .then(resp=>dispatch(getByPlatform(resp.data)))
    .catch((e) => {
        console.log(e);
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! -- getPlatform",
          });
      });      
}


export const sortRatings=()=>(dispatch)=>{
    dispatch(sortRating())
}

export const sortYears=()=>(dispatch)=>{
    dispatch(sortYear())
}

