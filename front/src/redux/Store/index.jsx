import { configureStore } from "@reduxjs/toolkit";
import  movies from "../Slice/movieSlice";

export default configureStore({
    reducer: {
        movies: movies,
    }

})