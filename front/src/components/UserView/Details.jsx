import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Style from "./Details.module.css"
import { getMovieById } from '../../redux/Slice/movieAction'
import Header from '../Presentational/header'
import Footer from '../Presentational/footer'
import ButtonHome from '../Presentational/ButtonHome'
import { style } from '@mui/system'
import styles from "../../styles/styles.module.css"



export default function Details() {

    const dispatch = useDispatch()
    const details = useSelector((state) => state.movies.movie)
    console.log(details)

    const { id } = useParams()

    useEffect(() => {
        dispatch(getMovieById(id))
    }, [dispatch])


    return (
        <div>
            <Header/>
            {
                details ?
                    <div>
                        <div className={styles.title}>
                        <p className={styles.span}>Movie Detail</p></div>
                            <div className={styles.ubButton}><ButtonHome/> </div>
                        <div className={Style.generalContainer}>
                            <div className={Style.container}>
                                <div>
                                    <div className={Style.imgContainer}>
                                        <img className={Style.movieImg} src={details.image} />
                                    </div>
                                    <div className={Style.textTitle}>
                                        <h2>{details.title}</h2>
                                        <h3>Date: {details.date} || {details.duration}</h3>
                                        <h3 className={Style.Rate}>Rating: {details.rating}</h3>
                                    </div>
                                </div>
                            </div>             
                            <div className={Style.textContainer}>
                                <div><h3>Genres</h3><p>{details.genres?.map((g,i) => {
                                    return(
                                        details.genres.length === i+1 ? <span>{g}.</span> : <span>{g}, </span>
                                    )
                                })}</p></div>
                                <div><h3>Description</h3><p>{details.description}</p></div>
                                <div><h3>Cast</h3> <p>{details.cast?.map((c,i) => {
                                    return(
                                        details.cast.length === i+1 ? <span>{c}.</span> : <span>{c}, </span>
                                    )
                                })}</p></div>
                                <div><h3>Director</h3><p>{details.director}</p></div>
                                <div><h3>Trailer</h3>
                                {
                                    // details.trailer.split("").slice(7).join("") === "<iframe" ? details.trailer :
                                <iframe width="560" height="315" src={"https://www.youtube.com/embed/JtqIas3bYhg"} 
                                title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                                
                                </iframe>
                                }
                                </div>
                            {/*  compartir->incorporar->link copy */}
                                
                                <div><h3>Price</h3><p>$ {details.price}</p></div>
                            </div>
                        </div>
                    </div>
                :
                null
            }
            <Footer/>
        </div>
    )
}
