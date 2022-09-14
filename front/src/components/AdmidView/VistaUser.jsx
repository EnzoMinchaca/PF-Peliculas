import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardUser from "./visPrueba";
import styles from "../../styles/Admin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../redux/Slice/userAction";
import { BsFillHouseDoorFill} from "react-icons/bs";
import { AiFillLeftSquare } from "react-icons/ai";


export default function AdminModifyUser() {

  const dispatch=useDispatch();

  const users=useSelector(state=>state.users.users);

       React.useEffect(()=>{
       dispatch(allUsers())
     },[])

    return(
        <div>
             
          <div className={styles.title1}>
           <p className={styles.span1}>Admin Panel - View Users</p>
           <div className={styles.home} >
            <Link to="/Home">   
               <BsFillHouseDoorFill className={styles.icon}/> 
            </Link>
            </div>
            <div className={styles.home1}><Link to="/panel"><AiFillLeftSquare className={styles.icon2}/></Link></div>
          </div>

            <CardUser/>
   
        </div>
    )
}