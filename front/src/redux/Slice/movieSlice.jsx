import { createSlice } from "@reduxjs/toolkit";


export const movieSlice = createSlice({
    name: "movies",
    initialState: {
        allMovies: [],
        movies: [],
        movie: {},
        filtered: [],
        genres: [],
        platform: []
    },

    
    reducers: {
        getAllMovies: (state, action)=>{
            state.movies = action.payload        



    reducer: {
        getAllMovies: (state, action) => {
            state.movies = action.payload
            state.allMovies = action.payload

        },

        getMoviesById: (state, action) => {
            state.movie = action.payload
        },

        getSearchMovie: (state, action) => {
            state.movies = action.payload
        },

        /* getPostMovie: (state)=>{
             state
         },*/

        getByGenres: (state, action) => {
            state.genres = action.payload
        },

        getByPlatform: (state, action) => {
            state.platform = action.payload
        },
        FilterByGenres: (state, action) => {
            state.allMovies.filter(e => e.genres.split(", ").includes(action.payload))
        }
    },


}

)

export const {
    getAllMovies,
    getMoviesById,
    getSearchMovie,
    getByGenres,
    getByPlatform,
    filterByGenres,
} = movieSlice.actions

export default movieSlice.reducer