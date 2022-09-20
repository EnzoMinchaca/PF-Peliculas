import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Favorite from './Favorite'
import Style from "./Favorite.module.css"
import { addMovieToFavs, oneUser } from '../../../redux/Slice/userAction'
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined';



const FavoritesCards = () => {

    const dispatch = useDispatch()
    // const favs = useSelector((state) => state.movies.favs)
    const fav = useSelector((state) => state.users.fav)
    // console.log(fav)
    const user = JSON.parse(localStorage.getItem('user'))


    useEffect(() => {
        const theuser = JSON.parse(localStorage.getItem('user'))
        if (theuser.favorites.length > 0) {
            theuser.favorites.map(m => dispatch(addMovieToFavs(m._id)))
        }
    }, [])





    return (
        <div>
            <div className={Style.container}>
                <div className={Style.classContainer}>
                    {fav?.map((e) => {
                        return (
                            <Favorite
                                key={e._id}
                                id={e._id}
                                title={e.title}
                                image={e.image}
                                rating={e.rating}
                                idUser={user._id}
                            />
                        )
                    })                    
                    }
                </div>
            </div>
        </div>
    )
}

export default FavoritesCards