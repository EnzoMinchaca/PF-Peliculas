import React from "react";
import { useDispatch } from "react-redux";
import { allUsers, deleteUsers, editUsersStatus } from "../../redux/Slice/userAction";
import "./CardAdmin.css"
import styles from "../../styles/Admin.module.css"
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { useState } from "react";



export default function CardUse(props) {
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
  
      <div className={styles.containerU}>
        
        <div className={styles.cont} key={props.key}>  
           <p>Name: {props.name}</p>
           <p>LastName: {props.name}</p>
           <p>Email: {props.email}</p>
           <p>Status: {props.status}</p>
           <p>Current role: {role}</p>
           <select name="role" key={props.id} onChange={(e)=>{onSelectChange(e)}}>
                  <option disabled selected >-Select role-</option>
                  <option value={'Admin'}>Admin</option>
                  <option value={'User'}>User</option>
                  <option value={'Banned'}>Banned</option>
                  <option value={'Owner'}>Owner</option>
            </select>
            <button className={styles.Change} onClick={submitRole} >Change</button>
            <button onClick={(props) => {handleDelete(props)}} className={styles.button}><BsFillTrashFill/></button>
      </div>
  
  </div >  
      
           
    )
}

