
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CardAdmin.css"
import styles from "../../styles/Admin.module.css" 
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from "@mui/material";

export default function CardUser() {

  const users=useSelector(state=>state.users.users);
 

    return (
     
      <div className={styles.cardContainer} key={users.key}> 
        <TableContainer component ={Paper}>

          <Table aria-label="simple table">
            <TableHead>
              <TableRow className={styles.row}>
                <TableCell>Name</TableCell>
                <TableCell>Lastname</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>

              { users.map(row=>(
                <TableRow Key={row.id} sx={{"&:last-child td, &:last-child th": {border: 0}}}>

                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.lastname}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.status}</TableCell>
                   
                </TableRow>

              ))}
   
            </TableBody>

          </Table>
        </TableContainer>




           
        
      </div>
      
           
    )
}

