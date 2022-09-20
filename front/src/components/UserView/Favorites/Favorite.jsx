import React from 'react';
import Style from "./Favorite.module.css"
import { useDispatch } from 'react-redux';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { deleteFromFavs } from '../../../redux/Slice/userAction';
import { deleteFavToUser } from '../../../redux/Slice/userAction';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';




const Favorite = ({ id, title, image, rating, idUser }) => {

    const dispatch = useDispatch();

    function deleteFav(e) {
        e.preventDefault()
        dispatch(deleteFromFavs(id));
        dispatch(deleteFavToUser({ id: id }, idUser))
    }


    return (
        <div >
            <Link className={Style.text} to={`/Details/${id}`}>
                <br></br>
                <div className={Style.card}>
                    <div key={id}>
                        <img className={Style.imgContainer} src={image} />
                        <h3 className={Style.text}>{title.length < 15 ? title : title.slice(0, 15) + "..."}</h3>
                        <div className={Style.rat}><Rating name="read-only" value={rating} readOnly /></div>
                        <button className={Style.button} onClick={(e) => deleteFav(e)}><HeartBrokenIcon /></button>
                    </div>
                </div>
            </Link>
        </div >
    )
}


export default Favorite;