import React from "react";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { deleteMovies } from "../../redux/Slice/movieAction";
import "./CardAdmin.css";
import { FaTrash } from 'react-icons/fa';
import { BsFillPencilFill } from "react-icons/bs";
import styles from "../../styles/Admin.module.css"


export default function CardAdmin(props) {
  const dispatch= useDispatch();
  const handleDelete = ()=>{
    dispatch(deleteMovies(props.id))
  };
    return (

      <div className={styles.containerM}>

        <div className="Card" key={props.key}>
          
             <img className="imageMovie" src={props.image} alt="movie" />  

             <p className="title">{props.title}</p>
              <p>Quantity sold: {props.amountOfSales}</p>
             <p> Price: {props.price}Usd</p>
             <Link to={`/Modify/${props.id}`}><BsFillPencilFill/> </Link>
             <button onClick={(props) => {handleDelete(props)}} className={styles.trash}> <FaTrash/></button> 
             
           
      </div>
      
      </div>
  
      
           
    )
}