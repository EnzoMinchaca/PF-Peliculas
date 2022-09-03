import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Style from "./Details.module.css"
import { getMovieById } from '../../redux/Slice/movieAction'



export default function Details() {

    const dispatch = useDispatch()
    const details = useSelector((state) => state.movies.movie)

    const { id } = useParams()

    useEffect(() => {
        dispatch(getMovieById(id))
    }, [dispatch])


    return (
        <div>
            <div className={Style.generalContainer}>
                <div className={Style.container}>
                    <div>
                        <div className={Style.imgContainer}>
                            <img className={Style.movieImg} src={details.image} />
                        </div>
                        <div className={Style.textTitle}>
                            <h3>{details.title}</h3>
                            <h5>Date: {details.date} || {details.duration}</h5>
                            <h5 className={Style.Rate}>Rating: {details.rating}</h5>
                        </div>
                    </div>
                </div>             
                <div className={Style.textContainer}>
                    <h5>Genres: {details.genres}</h5>
                    <h5>Description: {details.description}</h5>
                    <h5>Cast: {details.cast}</h5>
                    <h5>Director: {details.director}</h5>
                   {/*  compartir->incorporar->link copy */}
                    <iframe width="560" height="315" src={"https://www.youtube.com/embed/JtqIas3bYhg"} 
                    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>

                    </iframe>
                    <h5>Price: {details.price}$</h5>
                </div>
            </div>
        </div>
    )
}
