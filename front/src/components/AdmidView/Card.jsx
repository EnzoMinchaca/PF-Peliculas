import React from "react";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { deleteMovies } from "../../redux/Slice/movieAction";
import "./CardAdmin.css";
import { FaTrash } from 'react-icons/fa';
import { useSelector } from "react-redux";
import styles from "../../styles/Admin.module.css" ;
import { AiFillEdit } from "react-icons/ai";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from "@mui/material";


export default function CardAdmin(props) {

  const movies=useSelector(state=>state.movies.movies)
  const dispatch= useDispatch();

  const handleDelete = ()=>{
    dispatch(deleteMovies(props.id))
  };


    return (
  
      <div className={styles.cardContainer2} key={props.id}>

      <TableContainer component ={Paper}>

      <Table aria-label="simple table">
           <TableHead>
              <TableRow className={styles.row}>
                <TableCell >Title</TableCell>
                <TableCell >Price</TableCell>
                <TableCell >Edit</TableCell>
                <TableCell >Delete</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>

    { movies.map(props=>(
      <TableRow Key={props.id} sx={{"&:last-child td, &:last-child th": {border: 0}}}>

          <TableCell>{props.title}</TableCell>
          <TableCell>{props.price}Usd</TableCell>
          <TableCell>{<Link to={`/Modify/${props.id}`}><AiFillEdit/> </Link>}</TableCell>
          <TableCell><button onClick={(props) => {handleDelete(props)}} > <FaTrash></FaTrash></button></TableCell>
      </TableRow>

    ))}
 
  </TableBody>

</Table>
</TableContainer>
    
      </div>
              
    )
}