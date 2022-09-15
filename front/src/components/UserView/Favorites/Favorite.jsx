import React from 'react';
import Style from "./Favorite.module.css"
import { useDispatch } from 'react-redux';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { deleteFromFavs } from '../../../redux/Slice/userAction';
import { deleteFavToUser } from '../../../redux/Slice/userAction';



const Favorite = ({ id, title, image, rating, platform, description, idUser }) => {

    const dispatch = useDispatch();

    function deleteFav(e) {
        e.preventDefault()
        dispatch(deleteFromFavs(id));
        dispatch(deleteFavToUser({id: id}, idUser))
    }


    return (
        <div >
            <div className={Style.card}>
                <div key={id} className={Style.card2}>
                    <img className={Style.card} src={image} />
                    <h3 className={Style.text}>{title.length < 20 ? title : title.slice(0, 20) + "..."}</h3>
                    <h3 className={Style.text}>{rating}</h3>
                    <button className={Style.button} onClick={(e) => deleteFav(e)}><HeartBrokenIcon /></button>
                </div>

            </div>
        </div>
    )
}


export default Favorite;