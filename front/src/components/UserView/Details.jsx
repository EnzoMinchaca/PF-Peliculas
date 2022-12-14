import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Style from "./Details.module.css"
import { addMovieToCart, clearDetails, getMovieById, movieToView } from '../../redux/Slice/movieAction'
import Header from '../Presentational/header'
import Footer from '../Presentational/footer'
import ButtonHome from '../Presentational/ButtonHome'
import { style } from '@mui/system'
import Swal from "sweetalert2";
import styles from "../../styles/styles.module.css"
import { BsFillCartFill } from "react-icons/bs";
import { FiPlay } from "react-icons/fi"
import axios from 'axios'
import Rating from '@mui/material/Rating';
import buton from "../../styles/Buttons.module.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCart from "../Presentational/ShoppingCart.tsx"

import Comments from './Comments'

import { putFavToUser, addMovieToFavs } from '../../redux/Slice/userAction'




export default function Details() {



    const { id } = useParams()

    const [isUser, setisUser] = useState(false)
    const [hasMovie, sethasMovie] = useState(false)
    const [isAdmin, setisAdmin] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const details = useSelector((state) => state.movies.movie)
    const cart = useSelector((state) => state.movies.cart)
    // const favs = useSelector((state) => state.movies.favs)
    const user = JSON.parse(localStorage.getItem('user'))
    // console.log(details)

    const handleClick = () => {
        dispatch(movieToView(details))
        localStorage.setItem('movie', JSON.stringify(details))
        navigate("/viewMovie")
    }

    useEffect(() => {
        const login = JSON.parse(localStorage.getItem('user'))
        if (login) {
            setisUser(true)
            const us = login.buy.filter(m => m._id === id)
            if (us.length > 0) {
                sethasMovie(true)
            }
            if(login.isAdmin) {
                setisAdmin(true)
            }
        }
        dispatch(getMovieById(id))
        return () => { dispatch(clearDetails()) }
    }, [])

    const addToCartAndStorage = async (id) => {

        if (!isUser) {
            Swal.fire({
                icon: 'error',
                title: 'You need to login to add to cart',
                showConfirmButton: false,
                timer: 1500
            })
        } else if

            (!cart.map((e) => e._id).includes(id)) {
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

    const addToFavList = async (id) => {

        if (!isUser) {
            Swal.fire({
                icon: 'error',
                title: 'You need to login to add to Favs',
                showConfirmButton: false,
                timer: 1500
            })
        } else if

            (!cart.map((e) => e._id).includes(id)) {
            let a = await dispatch(addMovieToFavs(id))
            dispatch(putFavToUser(details, user._id))
            let json = await axios.get(`http://localhost:3001/movieDetails/${id}`)
            // localStorage.setItem("favs", JSON.stringify([...favs, json.data]))
            Swal.fire({
                icon: 'success',
                title: 'Added to favs',
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
                        <div className={styles.ubButton}><div><ButtonHome /></div><div ><ShoppingCart cart={cart}/></div></div>
                        <div className={Style.generalContainer}>
                            <div className={Style.container}>
                                <div className={Style.cont}>
                                    <div className={Style.imgContainer}>
                                        <img className={Style.movieImg} src={details.image} />
                                    </div>
                                    <div className={Style.textTitle}>
                                        <h2>{details.title/* .length < 15 ? details.title : details.title.slice(0, 15) + "..." */}</h2>
                                        <h3> {details.date} || {details.duration}</h3>
                                        {details.rating ?
                                            <Rating name="read-only" value={details.rating} readOnly />
                                            : null}
                                        <div className={Style.cartFav}>
                                            {
                                                hasMovie || isAdmin?
                                                    // < href={details.trailer} target={"_blank"}>
                                                    <button className={buton.btn} onClick={handleClick} ><FiPlay /> Play</button>
                                                    // </a>
                                                    // <ButtonPlay/> 
                                                    :
                                                    <button onClick={() => addToCartAndStorage(id)} className={styles.btnBuy} ><BsFillCartFill />Buy</button>
                                            }
                                            {
                                                isAdmin?null :
                                                <button onClick={() => addToFavList(id)} className={Style.button}><FavoriteIcon /></button>
                                            }
                                        </div>
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
                                        <iframe width="560" height="310" src={details.trailer}
                                            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                                        </iframe>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={Style.SectionComments} >
                            <h5>Comments</h5>
                            {
                                details.title ?
                                    <div  >
                                        <Comments titleMovies={details.title} user={user}></Comments>
                                    </div>
                                    :
                                    <p></p>
                            }
                        </div>
                    </div>
                    :
                    null
            }
            <div className={Style.footer}>
                <Footer />
            </div>

        </div>
    )
}