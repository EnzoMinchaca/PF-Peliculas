import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Favorite from './Favorite'
import Style from "./Favorite.module.css"
import { addMovieToFavs, oneUser } from '../../../redux/Slice/userAction'



const FavoritesCards = () => {

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

        <div className={Style.ggs}>
            <div className={Style.ggInside}>
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
        </div >
      
    )
}

export default FavoritesCards