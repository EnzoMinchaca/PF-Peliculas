import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Favorite from './Favorite'
import Style from "./Favorite.module.css"



const FavoritesCards = () => {

    const dispatch = useDispatch()
    const favs = useSelector((state) => state.movies.favs)
    




    return (
        <div>
            <div className={Style.container}>
                <div className={Style.classContainer}>
                    {favs.map((e) => {
                        return (
                            <Favorite
                                key={e._id}
                                id={e._id}
                                title={e.title}
                                image={e.image}
                                rating={e.rating}
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