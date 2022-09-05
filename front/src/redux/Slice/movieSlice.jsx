import { createSlice } from "@reduxjs/toolkit";


export const movieSlice = createSlice({
    name: "movies",

    initialState:{
        allMovies:[],//estado que siempre va a almacenar todas las peliculas
        movies:[], //estado que se va a renderizar en los componentes

        movie: {},
        filtered: [],
        genres: [],
        platform: []
    },

    
    reducers: {
        getAllMovies: (state, action)=>{
            state.allMovies = action.payload    
            state.movies = action.payload        
        },

        clearAllMovies: (state)=>{
          state.movies = []       
        },

        postMovie: (state)=>{
          return{state}
      },

        getMoviesById: (state, action) => {
            state.movie = action.payload
        },

        getSearchMovie: (state, action) => {
            state.movies = action.payload
        },

        getByGenres: (state, action)=>{

            state.genres = action.payload
        },

        clearAllGenres:(state) => {
          state.genres = []
        },

        clearAllDetails:(state) => {
          state.movie = {}
        },

        getByPlatform: (state, action) => {
            state.platform = action.payload
        },

        filterBygenre:(state, action)=>{
            let moviesFilter= [];
            state.allMovies.forEach(movie=> {
                movie.genres.forEach(genre=> {
                  if(genre===action.payload){
                    moviesFilter.push(movie)
                  }
                })
            })
            state.movies = moviesFilter;
        },
        filterByPlataform:(state, action)=>{
            console.log(action.payload.toLowerCase())
            let moviesFilter= [];
            state.allMovies.map(movie=> {
                console.log(movie.platform.toLowerCase())
                  if (movie.platform.toLowerCase()===action.payload.toLowerCase()) {
                    moviesFilter.push(movie)
                }else if(action.payload.toLowerCase()==='all'){
                    moviesFilter=state.allMovies
                }
            })
            state.movies = moviesFilter;
          },


        sortRating: (state, action)=>{
            if (action.payload === "1-5") {
                console.log()
                return {
                  ...state,
                  movies: state.allMovies?.slice().sort((a, b) => {
                    return a.rating - b.rating;
                  }),
                };
              } else if (action.payload === "5-1") {
                return {
                  ...state,
                  movies: state.allMovies?.slice().sort((a, b) => {
                    return b.rating - a.rating;
                  }),
                };
              } else {
                return { ...state, movies: state.filtered };
              }
        },
        sortYear: (state, action)=>{
            if (action.payload === "1900-2022") {
                return {
                  ...state,
                  movies: state.allMovies?.slice().sort((a, b) => {
                    return a.date - b.date;
                  }),
                };
              } else if (action.payload === "2022-1900") {
                return {
                  ...state,
                  movies: state.allMovies?.slice().sort((a, b) => {
                    return b.date - a.date;
                  }),
                };
              } else {
                return { ...state, movies: state.filtered };
              }
        }
    }
}


)

export const {
    getAllMovies,
    clearAllMovies,
    getMoviesById,
    getSearchMovie,
    clearAllGenres,
    clearAllDetails,
    getByGenres,
    getByPlatform,
    filterBygenre,
    filterByPlataform,
    sortRating,
    sortYear,
    postMovie
} = movieSlice.actions

export default movieSlice.reducer