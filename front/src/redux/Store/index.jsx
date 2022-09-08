import { configureStore } from "@reduxjs/toolkit";
import  movies from "../Slice/movieSlice";
import users from "../Slice/userSlice";
import admin from "../Slice/adminSlice";
import order from "../Slice/orderSlice";

export default configureStore({
    reducer: {
        movies: movies,
        users: users,
        admin: admin,
        order: order
    }

})