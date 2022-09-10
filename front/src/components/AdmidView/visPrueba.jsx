import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../redux/Slice/userAction";
import CardUser from "./vista";


export default function CardsUser(){
    const dispatch=useDispatch();
    const users=useSelector(state=>state.users.users)
  
       React.useEffect(()=>{
         dispatch(allUsers())
       },[])
      return (
          
          <div>
             {users.length? users.map((user)=>{
                  return (
                    
                      <CardUser
                      key={user.id}
                      name={user.name}
                      lastname={user.lastname}
                      email={user.email}
                      status={user.status}
                      id={user._id}/>
    
                )
              }):null}
          </div>
       
      )
  }