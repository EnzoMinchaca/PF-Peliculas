import React, { useEffect, useState,} from 'react'
import FavoritesCards from './FavoritesCards'
import Style from "./Favorite.module.css"
import Header from '../../Presentational/header'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Footer from "../../Presentational/footer"
import { useDispatch, useSelector } from 'react-redux'
import { addMovieToFavs, oneUser } from '../../../redux/Slice/userAction'



const Favorites = (props) => {

    const dispatch = useDispatch()

    const fav = useSelector((state) => state.users.fav)
    const user = JSON.parse(localStorage.getItem('user'))


    useEffect(() => {
        const theuser = JSON.parse(localStorage.getItem('user'))
        if (theuser.favorites.length > 0) {
            theuser.favorites.map(m => dispatch(addMovieToFavs(m._id)))
        }
    }, [])

    return (
        <div className={Style.generalContainer}>
            <Header />
            <div className={Style.favoriteBanner}>
                <Link to="/Home"> <button className={Style.favs}><FavoriteIcon />Favorites</button></Link>
            </div>
            {fav.length > 0 ?

                <FavoritesCards />
                :
                <div className={Style.ggs}><h2>No Movies added</h2></div>
            }
            <div className={Style.favoriteMargin} >
            <Footer />
            </div>
            
        </div>
    )


}

export default Favorites