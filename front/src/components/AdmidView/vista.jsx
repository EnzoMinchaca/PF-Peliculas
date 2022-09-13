import React from "react";
import { useDispatch } from "react-redux";
import { allUsers, deleteUsers, editUsersStatus } from "../../redux/Slice/userAction";
import "./CardAdmin.css"
import styles from "../../styles/Admin.module.css"
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { useState } from "react";



export default function CardUser(props) {
  const dispatch= useDispatch();
  const handleDelete = ()=>{
    dispatch(deleteUsers(props.id))
  };
  const [roleUser, setRoleUser] = useState({id: props.id, role: ''})

  const onSelectChange = (e)=>{
    setRoleUser({
      ...roleUser,
      [e.target.name]:e.target.value
    })
  };
  const submitRole=()=>{
    dispatch(editUsersStatus(roleUser))
    setTimeout(() => {
      dispatch(allUsers())
    }, 1000); 
  }
  let role;
    if (props.isAdmin){
     role='Administrator'
    }else if(props.isUser){
     role='User'
    }else if(props.isOwner){
      role='Owner'
    }else if(props.isBan){
      role='banned'
    }
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
                
              </div >  
        
      </div>
      
           
    )
}