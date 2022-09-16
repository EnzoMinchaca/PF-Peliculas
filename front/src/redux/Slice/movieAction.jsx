import axios from "axios";
import Swal from "sweetalert2";

import {
    getAllMovies,
    getMoviesById,
    getSearchMovie,
    clearAllMovies,
    clearAllGenres,
    clearAllDetails,
    getByGenres,
    getByPlatform,
    addToCart,
    addToFavs,
    filterBygenre,
    sortRating,
    sortYear,
    postMovie,
    removeCart,
    removeFavs,
    filterByPlataform,
    deleteMovieById,
    clearCarts,
    orderSoldMovies,
    getComments,
    clearStateComments
} from "./movieSlice";




export const getMovies = () => (dispatch) => {
    axios.get("http://localhost:3001/getMovies")
        .then(resp => {
            return {
                payload: dispatch(getAllMovies(resp.data))
            }
        })

        .catch((e) => {
            console.log(e);
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! -- Getmovies",
            });
        });
}
export const addMovieToCart = (id) => (dispatch) => {
    axios.get(`http://localhost:3001/movieDetails/${id}`)
        .then(resp => dispatch(addToCart(resp.data)))
        .catch((e) => {
            console.log(e);
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Movie has beed added",
            });
        });
}

export const addMovieToFavs = (id) => (dispatch) => {
    axios.get(`http://localhost:3001/movieDetails/${id}`)
        .then(resp => dispatch(addToFavs(resp.data)))
        .catch((e) => {
            console.log(e);
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Movie has beed added",
            });
        });
}

export const deleteFromFavs =(id) => (dispatch) => {
    localStorage.setItem('favs', JSON.stringify([]))
    dispatch(removeFavs(id))
}


export const deleteFromCart = (id) => (dispatch) => {
    localStorage.setItem('cart', JSON.stringify([]))
    dispatch(removeCart(id))
}

export const clearCart = () => (dispatch) => {
    return dispatch(clearCarts())
}

export const postMovies = (movie) => (dispatch) => {
    axios.post('http://localhost:3001/postMovies', movie)
        .then(resp => dispatch(postMovie(resp.data)))
        .catch((e) => console.log(e))
}

export const getMovieById = (id) => (dispatch) => {
    axios.get(`http://localhost:3001/movieDetails/${id}`)
        .then(resp => dispatch(getMoviesById(resp.data)))
        .catch((e) => {
            console.log(e);
            return Swal.fire({
                icon: "error",
                title: "Oopss...",
                text: "Something went wrong! -- GetmoviesById",
            });
        });
}

export const getSearch = (name) => (dispatch) => {
    //console.log("Entra"+name)
    axios.get(`http://localhost:3001/getMovies?nameMovie=${name}`)
        .then(resp => dispatch(getSearchMovie(resp.data)))
        .catch((e) => {
            console.log(e);
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "The movie was not found! -- GetSearch",
            });
        });
}

export const getGenres = () => (dispatch) => {
    axios.get(`http://localhost:3001/genres`)
        .then(resp => dispatch(getByGenres(resp.data)))
        .catch((e) => {
            console.log(e);
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! -- getGenres",
            });
        });
}

export const getPlatform = () => (dispatch) => {
    axios.get(`http://localhost:3001/platform`)
        .then(resp => dispatch(getByPlatform(resp.data)))
        .catch((e) => {
            console.log(e);
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! -- getPlatform",
            });
        });
}

export const filterGenre = (genre) => (dispatch) => {
    dispatch(filterBygenre(genre))
}
export const filterPlataform = (plataform) => (dispatch) => {
    dispatch(filterByPlataform(plataform))
}



export const sortRatings = (type) => (dispatch) => {
    dispatch(sortRating(type))
}

export const sortYears = (type) => (dispatch) => {
    dispatch(sortYear(type))
}

export const clearGenres = () => (dispatch) => {
    dispatch(clearAllGenres())
}

export const clearDetails = () => (dispatch) => {
    dispatch(clearAllDetails())
}

export const clearMovies = () => (dispatch) => {
    dispatch(clearAllMovies())
}
export const deleteMovies = (id) => (dispatch) => {
    axios.delete(`http://localhost:3001/movies/${id}`)
        .then(resp => console.log(resp.data))
        .catch((e) => {
            console.log(e);
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! -- deleteMovies",
            });
        });
    dispatch(deleteMovieById(id))
}

export const modifyMovies=(input)=>(dispatch)=>{
    axios.put(`http://localhost:3001/movies/${input.id}`, input)
        .then(resp => dispatch(getMoviesById(resp.data)))
        .catch((e) => {
            console.log(e);
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! -- modifyMovies",
            });
        });
}
export const addBuyMovie=(movies)=>(dispatch)=>{
    axios.put(`http://localhost:3001/addBuyInMovie`, {buyMovies: movies} )
    .then(resp=>console.log(resp.data))
    .catch((e) => {
        console.log(e);
    });  
}

export const sortSoldMovies=(order)=>(dispatch)=>{
    dispatch(orderSoldMovies(order))
}

export const getCommentsMovie=(titleMovie)=>(dispatch)=>{
    axios.get(`http://localhost:3001/getComments?movie=${titleMovie}`)
    .then(resp=>dispatch(getComments(resp.data)))
    .catch((e) => {
        console.log(e);
    });  
}

export const clearComments=()=>(dispatch)=>{
    dispatch(clearStateComments({}))
}

