import React from "react";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { deleteMovies } from "../../redux/Slice/movieAction";
import "./CardAdmin.css";
import { FaTrash } from 'react-icons/fa';
import { BsFillPencilFill } from "react-icons/bs";
import styles from "../../styles/Admin.module.css"
import Swal from "sweetalert2";


export default function CardAdmin(props) {
  const dispatch= useDispatch();
  const handleDelete = ()=>{
    Swal.fire({
      title: 'Do you really want to delete this movie?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: "#0b132b"
  }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMovies(props.id))
      }
  })
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