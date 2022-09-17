import { createSlice } from "@reduxjs/toolkit";



export const movieSlice = createSlice({
  name: "movies",

  initialState: {
    allMovies: [],//estado que siempre va a almacenar todas las peliculas
    movies: [], //estado que se va a renderizar en los componentes
    movieView: {},
    movie: {},
    filtered: [],
    genres: [],
    platform: [],
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    favs: localStorage.getItem("favs") ? JSON.parse(localStorage.getItem("favs")) : [],
    commentsMovie: {}

  },


  reducers: {

    getAllMovies: (state, action) => {
      state.allMovies = action.payload
      state.movies = action.payload
    },

    /* clearAllMovies: (state) => {
      state.movies = []
    }, */

    postMovie: (state) => {
      return { state }
    },

    getMoviesById: (state, action) => {
      state.movie = action.payload
      state.movieView = action.payload
    },

    getSearchMovie: (state, action) => {
      state.movies = action.payload
    },

    getByGenres: (state, action) => {

      state.genres = action.payload
    },

    clearAllGenres: (state) => {
      state.genres = []
    },

    clearAllDetails: (state) => {
      state.movie = {}
    },

    getByPlatform: (state, action) => {
      state.platform = action.payload
    },

    clearCarts: (state) => {
      state.cart = []
    },

    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload]
    },

    removeCart: (state, action) => {
      localStorage.setItem("cart", JSON.stringify(state.cart.filter((e) => e._id !== action.payload)))
      state.cart = state.cart.filter((e) => e._id !== action.payload)
    },

    addToFavs: (state, action) => {
      state.favs = [...state.favs, action.payload]
    },

    removeFavs: (state, action) => {
      localStorage.setItem("favs", JSON.stringify(state.favs.filter((e) => e._id !== action.payload)))
      state.favs = state.favs.filter((e) => e._id !== action.payload)
    },

    filterBygenre: (state, action) => {
      let moviesFilter = [];
      state.allMovies.forEach(movie => {
        movie.genres.forEach(genre => {
          if (genre === action.payload) {
            moviesFilter.push(movie)
          }
        })
      })
      state.movies = moviesFilter;
    },

    filterByPlataform: (state, action) => {
      console.log(action.payload.toLowerCase())
      let moviesFilter = [];
      state.allMovies.map(movie => {
        console.log(movie.platform.toLowerCase())
        if (movie.platform.toLowerCase() === action.payload.toLowerCase()) {
          moviesFilter.push(movie)
        } else if (action.payload.toLowerCase() === 'all') {
          moviesFilter = state.allMovies
        }
      })
      state.movies = moviesFilter;
    },

    sortRating: (state, action) => {
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

    sortYear: (state, action) => {
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
    },

    deleteMovieById: (state, action) => {
      state.movies = state.movies.filter(movie => movie._id !== action.payload);
      state.movies = state.movies.filter(movie => movie._id !== action.payload);

    },

    orderSoldMovies: (state, action) => {
      let orderSoldMovies = [...state.movies];
      console.log(action.payload.select)
      let orderAscendant = orderSoldMovies.sort((a, b) => a.amountOfSales - b.amountOfSales)
      if (action.payload.select === 'ASCENDANT') {
        return { ...state, movies: orderAscendant }
      } else if (action.payload.select === 'DESCENDENTE') {
        let orderDesc = orderAscendant.reverse();
        return { ...state, movies: orderDesc }
      };
    },

    getComments: (state, action) => {
      state.commentsMovie = action.payload;
    },
    clearStateComments: (state, action) => {
      state.commentsMovie = action.payload;
    },

    getMovieToView: (state, action) => {
      state.movieView = action.payload
    },

    postComments: (state) => {
      return { state }
    },
  
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
  removeCart,
  removeFavs,
  addToCart,
  addToFavs,
  postMovie,
  deleteMovieById,
  clearCarts,
  orderSoldMovies,
  postComments,
  getComments,
  clearStateComments,
  getMovieToView,
  
  
} = movieSlice.actions

export default movieSlice.reducer