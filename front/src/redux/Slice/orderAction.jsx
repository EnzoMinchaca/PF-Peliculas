import axios from "axios";
import Swal from "sweetalert2";
import {
    getOrder,
    getOrders
}from "./userSlice";


//Acción para mostrar una orden por id 
export const orderget=(data)=>(dispatch)=>{
    return axios.get({
           url: `http://localhost:3001/orders/${id}`,
           data: data})

        .then(res => {
            return{
                payload: dispatch(getOrder(res.data))
            }
        }
        );     
}

/// Acción para mostrar las ordenes -listado - 
export const ordersget=(data)=>(dispatch)=>{
    return axios.get({
           url: `http://localhost:3001/orders`,
           data: data})

        .then(res => {
            return{
                payload: dispatch(getOrders(res.data))
            }
        }
        );     
}




