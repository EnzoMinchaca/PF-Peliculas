import React from "react";
import { useSelector } from "react-redux";
import DeleteCartButton from "../DeleteCartButton/DeleteCartButton";

function Cart() {

  const cart = useSelector((state) => state.cart);

  return (
    <div>
      <h1>Cart</h1>
      {cart.length>0 ? cart.map((e) =>(
        <div key={e._id}>
          <DeleteCartButton id={e._id} />
          <p>{e.title}</p>
          <p>Precio: {e.price}</p>
          <img src={e.image[0].url} />
        </div>
      ))
       : <div>The cart is empty</div>}
    </div>
  );
}

export default Cart;