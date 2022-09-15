
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

/* <div className={styles.stats}>
              <div className={styles.statsCard}>
                <h6>Name:</h6><p>{props.name}</p>
                </div> 
                <div className={styles.statsCard}>
                <h6>LastName:</h6><p>{props.lastname}</p>
                </div> 
                <div className={styles.statsCard}>
                <h6>Email:</h6><p>{props.email}</p>
                </div> 
                <div className={styles.statsCard}>
                <h6>S  tatus:</h6><p>{props.status}</p>
                </div> 
                <div className={styles.statsCard}>
                <h6>Role actual:</h6><p>{role}</p>
                <select name="role" key={props.id} onChange={(e)=>{onSelectChange(e)}}>
                  <option disabled selected >-Select role-</option>
                  <option value={'Admin'}>Admin</option>
                  <option value={'User'}>User</option>
                  <option value={'Banned'}>Banned</option>
                  <option value={'Owner'}>Owner</option>
                </select>
                <button onClick={submitRole} >change</button>
                </div>
                <div className={styles.cardCon}>
                <div><button onClick={(props) => {handleDelete(props)}} className={styles.button}><BsFillTrashFill/></button></div>
               
                </div>
                
              </div >*/