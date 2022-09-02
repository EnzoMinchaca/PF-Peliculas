import axios from "axios";
import Swal from "sweetalert2";

import { getAllMovies, 
    getMoviesById,  
    getSearchMovie, 
    getByGenres,
    getByPlatform,  
    filterBygenre,
    filterByPlataform}from "./movieSlice";

    

export const getMovies=()=>(dispatch)=>{
    axios.get("http://localhost:3001/getMovies")
    .then(resp=>dispatch(getAllMovies(resp.data)))
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
    axios.get(`http://localhost:3001/movies/${id}`)
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
export const filterGenre=(genre)=>(dispatch)=>{
    dispatch(filterBygenre(genre))
}
export const filterPlataform=(plataform)=>(dispatch)=>{
    dispatch(filterByPlataform(plataform))
}
