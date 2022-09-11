import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../../../redux/Slice/movieAction';



function DeleteCartButton({ id }) {

    const dispatch = useDispatch();

    function deleteCart(e){
        e.preventDefault()
        dispatch(deleteFromCart(id));
      }

  return (
    <button onClick={(e) => deleteCart(e)}>X</button>
  )
}

export default DeleteCartButton