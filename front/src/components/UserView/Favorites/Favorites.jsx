import React, { useEffect, useState } from 'react'
import FavoritesCards from './FavoritesCards'
import Style from "./Favorite.module.css"
import Header from '../../Presentational/header'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';



const Favorites = (props) => {

    return (
        <div>
            <Header />
            <div className={Style.favContainer}>
                <Link to="/Home"> <button className={Style.favs}><FavoriteIcon/> Favorites <FavoriteIcon/></button></Link>
            </div>
            <div className={Style.container}>
                <div className={Style.classContainer}>
                    <FavoritesCards />
                </div>
            </div>
        </div>
    )


}

export default Favorites