import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Style from "./Details.module.css"
import { addMovieToCart, getMovieById, } from '../../redux/Slice/movieAction'
import Header from '../Presentational/header'
import Footer from '../Presentational/footer'
import ButtonHome from '../Presentational/ButtonHome'
import { style } from '@mui/system'
import Swal from "sweetalert2";
import styles from "../../styles/styles.module.css"
import { BsFillCartFill } from "react-icons/bs";
import axios from 'axios'



export default function Details() {



    const { id } = useParams()


    const dispatch = useDispatch()
    const details = useSelector((state) => state.movies.movie)
    const cart = useSelector((state) => state.movies.cart)
    console.log(details)


    useEffect(() => {
        dispatch(getMovieById(id))
    }, [])

    const addToCartAndStorage = async (id) => {

        if (!cart.map((e) => e._id).includes(id)) {
            let a = await dispatch(addMovieToCart(id))
            let json = await axios.get(`http://localhost:3001/movieDetails/${id}`)
            localStorage.setItem("cart", JSON.stringify([...cart, json.data]))
            Swal.fire({
                icon: 'success',
                title: 'Added to cart',
                showConfirmButton: false,
                timer: 1000
            })
        }

    }
    

    return (
        <div>
            <Header />
            {
                details ?
                    <div>
                        <div className={styles.title}>
                            <p className={styles.span}>Exclusive of "{details.platform}"</p></div>
                        <div className={styles.ubButton}><ButtonHome /> </div>
                        <div className={Style.generalContainer}>
                            <div className={Style.container}>
                                <div>
                                    <div className={Style.imgContainer}>
                                        <img className={Style.movieImg} src={details.image} />
                                    </div>
                                    <div className={Style.textTitle}>
                                        <h2>{details.title}</h2>
                                        <h5>Date: {details.date} || {details.duration}</h5>
                                        <h3 className={Style.Rate}>Rating: {details.rating}</h3>
                                        <div><button onClick={() => addToCartAndStorage(id)} className={styles.btnBuy} ><BsFillCartFill />Buy</button> </div>
                                        <div><h5>{details.price}$USD</h5></div>
                                    </div>
                                </div>
                            </div>
                            <div className={Style.textContainer}>
                                <div><h3>Genres</h3><p>{details.genres?.map((g, i) => {
                                    return (
                                        details.genres.length === i + 1 ? <span>{g}.</span> : <span>{g}, </span>
                                    )
                                })}</p></div>
                                <div><h3>Description</h3><p>{details.description}</p></div>
                                <div><h3>Cast</h3> <p>{details.cast?.map((c, i) => {
                                    return (
                                        details.cast.length === i + 1 ? <span>{c}.</span> : <span>{c}, </span>
                                    )
                                })}</p></div>
                                <div><h3>Director</h3><p>{details.director}</p></div>
                                <div><h3>Trailer</h3>
                                    {
                                        // details.trailer.split("").slice(7).join("") === "<iframe" ? details.trailer :
                                        <iframe width="560" height="310" src="https://www.youtube.com/embed/T1NeHRuPpoM"
                                            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                                        </iframe>
                                    }
                                </div>
                                {/*  compartir->incorporar->link copy */}
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            <Footer />
        </div>
    )
}