import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../../../redux/Slice/movieAction';
import Style from "./DeleteCardButton.module.css"
import DeleteIcon from '@mui/icons-material/Delete';



function DeleteCartButton({ id }) {

    const dispatch = useDispatch();

    function deleteCart(e){
        e.preventDefault(e)
        dispatch(deleteFromCart(id));
      }

  return (
    <button className={Style.equis} onClick={(e) => deleteCart(e)}><DeleteIcon/></button>
  )
}

export default DeleteCartButton