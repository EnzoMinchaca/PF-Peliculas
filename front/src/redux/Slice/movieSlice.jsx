import { createSlice} from "@reduxjs/toolkit";


export const movieSlice = createSlice ({
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
        }
    }

})

export const { 
    getAllMovies, 
    getMoviesById,
    getSearchMovie,
    getByGenres,
    getByPlatform,
    filterBygenre,
    filterByPlataform
} = movieSlice.actions

export default movieSlice.reducer