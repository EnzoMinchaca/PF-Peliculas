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

        getMoviesById: (state, action) => {
            state.movie = action.payload
        },

        getSearchMovie: (state, action) => {
            state.movies = action.payload
        },

        getByGenres: (state, action)=>{

            state.genres = action.payload
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

       
    


}


)

export const {
    getAllMovies,
    getMoviesById,
    getSearchMovie,
    getByGenres,
    getByPlatform,
    filterBygenre,
    filterByPlataform,
    sortRating,
    sortYear
} = movieSlice.actions

export default movieSlice.reducer