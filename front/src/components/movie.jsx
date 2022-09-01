import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {getMovies} from "../redux/Slice/movieAction";


export const Movie = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getMovies())
    })

    return (
        <div>Movie</div>
    )
}