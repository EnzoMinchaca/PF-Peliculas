import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../redux/Slice/userAction";
import CardUser from "./vista";
import styles from "../../styles/Admin.module.css";


export default function CardsUser(){

    const dispatch=useDispatch();

    const users=useSelector(state=>state.users.users);

         React.useEffect(()=>{
         dispatch(allUsers())
       },[])

      return (

        <div  className={styles.usersContainer}>

                      <CardUser />
          </div>

       
      );
    }

      
          
      

  


/* <>
          {users.length !== 0 ? (
            <div  className={styles.usersContainer}>
              {Array.isArray(users) === false ? (
                <>
                  <CardUser />
                </>
              ) : (
                users?.slice(firstItemIndex, lastItemIndex).map((user) => {
                  return (
                    <CardUser
                    key={user.id}
                    name={user.name}
                    lastname={user.lastname}
                    email={user.email}
                    status={user.status}
                    id={user._id} 
                      
                    />
                  );
                })
              )}
            </div>
          ) : (
            <>
              
             
            </>
          )}
        </>*/