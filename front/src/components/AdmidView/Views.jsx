import React from "react";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { deleteMovies } from "../../redux/Slice/movieAction";
import "./CardAdmin.css";
import { FaTrash } from 'react-icons/fa';


export default function CardAdmin(props) {
  const dispatch= useDispatch();
  const handleDelete = ()=>{
    dispatch(deleteMovies(props.id))
  };
    return (
  
      <div className="Card" key={props.key}>

             <p className="title">{props.title}</p>
             <p> Price: {props.price}Usd</p>
             <Link to={`/Modify/${props.id}`}><button>Modify</button> </Link>
             <button onClick={(props) => {handleDelete(props)}} > <FaTrash></FaTrash></button> 
             
           
      </div>
      
           
    )
}