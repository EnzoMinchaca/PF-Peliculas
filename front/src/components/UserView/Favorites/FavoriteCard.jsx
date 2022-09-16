import React from 'react';
import Style from "./Favorite.module.css"
import { useDispatch } from 'react-redux';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { deleteFromFavs } from '../../../redux/Slice/movieAction';



const Favorite = ({ id, title, image, rating}) => {

    const dispatch = useDispatch();

    function deleteFav(e) {
        e.preventDefault()
        dispatch(deleteFromFavs(id));
    }


    return (
        <div >
            <div className={Style.card}>
                <div key={id} className={Style.card}>
                    <img className={Style.card} src={image} />
                    <h3 className={Style.text}>{title.length < 13 ? title : title.slice(0, 13) + "..."}</h3>
                    <h3 className={Style.text}>{rating}</h3>
                    <button className={Style.button} onClick={(e) => deleteFav(e)}><HeartBrokenIcon /></button>
                </div>
            </div>          
        </div>
    )
}


export default Favorite;