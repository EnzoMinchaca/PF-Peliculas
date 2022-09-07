import { configureStore } from "@reduxjs/toolkit";
import  movies from "../Slice/movieSlice";
import users from "../Slice/userSlice";

export default configureStore({
    reducer: {
        movies: movies,
        users: users
    }

})