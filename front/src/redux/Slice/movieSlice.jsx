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
    
    reducers: {
        getAllMovies: (state, action)=>{
            state.movies = action.payload        
        },

        getMoviesById: (state, action)=>{
            state.movie = action.payload
        },

        getSearchMovie: (state, action)=>{
            state.movies = action.payload
        },

    

        getByGenres: (state, action)=>{
            state.genres = action.payload
        },

        getByPlatform: (state, action)=>{
            state.platform = action.payload
        },

        sortRating: (state, action)=>{
            if (action.payload === "asc") {
                return {
                  ...state,
                  movies: state.filtered?.slice().sort((a, b) => {
                    return b.rating - a.rating;
                  }),
                };
              } else if (action.payload === "desc") {
                return {
                  ...state,
                  movies: state.filtered?.slice().sort((a, b) => {
                    return a.rating - b.rating;
                  }),
                };
              } else {
                return { ...state, movies: state.filtered };
              }
        },

        sortYear: (state, action)=>{
            if (action.payload === "asc") {
                return {
                  ...state,
                  movies: state.filtered?.slice().sort((a, b) => {
                    return b.date - a.date;
                  }),
                };
              } else if (action.payload === "desc") {
                return {
                  ...state,
                  movies: state.filtered?.slice().sort((a, b) => {
                    return a.date - b.date;
                  }),
                };
              } else {
                return { ...state, movies: state.filtered };
              }
        }



    }

})

export const { 
    getAllMovies, 
    getMoviesById,
    getSearchMovie,
    getByGenres,
    getByPlatform,
    sortRating,
    sortYear


} = movieSlice.actions

export default movieSlice.reducer