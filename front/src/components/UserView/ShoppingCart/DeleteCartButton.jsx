import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../../../redux/Slice/movieAction';
import Style from "./DeleteCardButton.module.css"



function DeleteCartButton({ id }) {

    const dispatch = useDispatch();

    function deleteCart(e){
        e.preventDefault()
        dispatch(deleteFromCart(id));
      }

  return (
    <button className={Style.equis} onClick={(e) => deleteCart(e)}>X</button>
  )
}

export default DeleteCartButton