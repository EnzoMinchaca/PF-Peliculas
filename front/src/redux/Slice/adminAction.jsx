import axios from "axios";
import Swal from "sweetalert2";

import { getUser,
    deletUser,
    promoveUser,
    getOrder,
    getOrders
     }from "./movieSlice";

export const getUsers=()=>(dispatch)=>{
    axios.get("http://localhost:3001/getUsers")
    .then(resp=> {
        return{
            payload:dispatch(getUser(resp.data))            
        }})
    
    .catch((e) => {
        console.log(e);
        return Swal.fire({
            icon: "error",
            title: "Oopss...",
            text: "There are no users! -- GetUsers",

          });
      });
}

export const deleteUsers=(id)=>(dispatch)=>{
    axios.delete(`http://localhost:3001/deletUsers/${id}`)
    .then(resp=> {
        return{
            payload:dispatch(deletUser(resp.data))            
        }})
    
    .catch((e) => {
        console.log(e);
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There are no users! -- DeleteUsers",
          });
      });
}

export const promoveUsers=(id)=>(dispatch)=>{
    axios.delete(`http://localhost:3001/promoveUsers/${id}`)
    .then(resp=> {
        return{
            payload:dispatch(promoveUser(resp.data))            
        }})
    
    .catch((e) => {
        console.log(e);
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "user cannot be promoted! -- PromovedUsers",
          });
      });
}

export const getsOrder=()=>(dispatch)=>{
    axios.get("http://localhost:3001/getOrder")
    .then(resp=> {
        return{
            payload:dispatch(getOrder(resp.data))            
        }})
    
    .catch((e) => {
        console.log(e);
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "there is no order! -- GetOrder",
          });
      });
}

export const getsOrders=()=>(dispatch)=>{
    axios.get("http://localhost:3001/getOrder")
    .then(resp=> {
        return{
            payload:dispatch(getOrders(resp.data))            
        }})
    
    .catch((e) => {
        console.log(e);
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There are not order! -- GetOrders",
          });
      });
}
