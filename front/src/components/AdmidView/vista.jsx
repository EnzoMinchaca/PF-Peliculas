import React from "react";
import { useDispatch } from "react-redux";
import { deleteUsers } from "../../redux/Slice/userAction";
import "./CardAdmin.css"
import styles from "../../styles/Admin.module.css"
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";



export default function CardUser(props) {
  const dispatch= useDispatch();
  const handleDelete = ()=>{
    dispatch(deleteUsers(props.id))
  };
    return (
  
      <div className={styles.cardContainer} key={props.key}>  
            <div className={styles.stats}>
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
                <h6>Status:</h6><p>{props.status}</p>
                </div> 
                <div className={styles.cardCon}>
                <div><button onClick={(props) => {handleDelete(props)}} className={styles.button}><BsFillTrashFill/></button></div>
               
                </div>
                
              </div >  
        
      </div>
      
           
    )
}