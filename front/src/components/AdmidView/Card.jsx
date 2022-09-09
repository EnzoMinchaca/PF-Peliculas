import React from "react";
import { useDispatch } from "react-redux";
import { deleteMovies } from "../../redux/Slice/movieAction";
import "./CardAdmin.css"



export default function CardAdmin(props) {
  const dispatch= useDispatch();
  const handleDelete = ()=>{
    dispatch(deleteMovies(props.id))
  };
    return (
  
      <div className="Card" key={props.key}>
       
             <img className="imageMovie" src={props.image} alt="movie" />  

             <p>Title:{props.title}</p>
 
             <p>Price:{props.price}Usd</p>
             <button onClick={(props) => {handleDelete(props)}} >Delete</button>
        
      </div>
      
           
    )
}