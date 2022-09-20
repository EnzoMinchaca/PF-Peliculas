import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../redux/Slice/userAction";
import CardUse from "./CardUser";
import styles from "../../styles/Admin.module.css";


export default function CardUsers({ lastItemIndex, firstItemIndex }){

    const dispatch=useDispatch();

    const users=useSelector(state=>state.users.users);

         React.useEffect(()=>{
         dispatch(allUsers())
       },[])

      return (
        <>
          {typeof users ==='string'?
          <p className={styles.refresh}>{users}, click refresh <button className={styles.Reload} onClick={() => window.location.reload()}> Reload </button> </p>
          
          :
          users.length !== 0 ? (
            <div  className={styles.usersContainer}>
              {Array.isArray(users) === false ? (
                <>
                  <CardUse />
                </>
              ) : (
                users?.slice(firstItemIndex, lastItemIndex).map((user) => {
                  return (

                    <CardUse
                    key={user._id}
                    name={user.name}
                    lastname={user.lastname}
                    email={user.email}
                    status={user.status}
                    isUser={user.isUser}
                    isBan={user.isBan}
                    isOwner={user.isOwner}
                    isAdmin={user.isAdmin}
                    id={user._id}/>

                  );
                
                })  
              )}
            </div>
          ) : (
            <>                  
           </>
          )}
        </>
      );
    }

        /*
          
          <div  className={styles.usersContainer}>
           
        
        {users.length? users.map((user)=>{
                  return (
                    
                      <CardUser
                      key={user.id}
                      name={user.name}
                      lastname={user.lastname}
                      email={user.email}
                      status={user.status}
                      id={user._id} 
                      />
    
                )
                  }):null}
              
           
          </div>
          
          
       
      )
  }
*/