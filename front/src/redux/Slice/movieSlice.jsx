import { createSlice} from "@reduxjs/toolkit";


export const movieSlice = createSlice ({
    name: "movies",
    initialState:{
        movies:[],
        movie: {},
        filtered: [],
        genres: [],
        platform: []
    },
    
    reducer: {
        getAllMovies: (state, action)=>{
            state.movies = action.payload        
        },

        getMoviesById: (state, action)=>{
            state.movie = action.payload
        },

        getSearchMovie: (state, action)=>{
            state.movies = action.payload
        },

       /* getPostMovie: (state)=>{
            state
        },*/

        getByGenres: (state, action)=>{
            state.genres = action.payload
        },

        getByPlatform: (state, action)=>{
            state.platform = action.payload
        }
    }

})

export const { 
    getAllMovies, 
    getMoviesById,
    getSearchMovie,
    getByGenres,
    getByPlatform
} = movieSlice.actions

export default movieSlice.reducer