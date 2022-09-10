import React from "react";
import { useDispatch } from "react-redux";
import { deleteUsers } from "../../redux/Slice/userAction";
import "./CardAdmin.css"



export default function CardUser(props) {
  const dispatch= useDispatch();
  const handleDelete = ()=>{
    dispatch(deleteUsers(props.id))
  };
    return (
  
      <div className="Card" key={props.key}>    
             <p>Name:{props.name}</p>
             <p>Lasname:{props.lastname}</p>
             <p>Email:{props.email}</p>
             <p>Status:{props.status}</p>
             <button onClick={(props) => {handleDelete(props)}} >Delete</button>
        
      </div>
      
           
    )
}