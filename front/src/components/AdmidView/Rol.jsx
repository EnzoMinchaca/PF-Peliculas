import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../redux/Slice/userAction";
import VistaRol from "./VistRol";
import styles from "../../styles/Admin.module.css";
import { Link } from "react-router-dom";
import { BsFillHouseDoorFill} from "react-icons/bs";
import { AiFillLeftSquare } from "react-icons/ai";



export default function VistaRoles({ lastItemIndex, firstItemIndex }){

    const dispatch=useDispatch();

    const users=useSelector(state=>state.users.users);

         React.useEffect(()=>{
         dispatch(allUsers())
       },[])

      return (

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

      
        <>
          {typeof users ==='string'?
          <h2>{users}, click refresh </h2>
          :
          users.length !== 0 ? (
            <div  className={styles.usersContainer}>
              {Array.isArray(users) === false ? (
                <>
                  <VistaRol />
                </>
              ) : (
                users?.slice(firstItemIndex, lastItemIndex).map((user) => {
                  return (
                    <VistaRol
                    key={user.id}
                    name={user.name}
                    lastname={user.lastname}
                    email={user.email}
                    status={user.status}
                    isUser={user.isUser}
                    isBan={user.isBan}
                    isOwner={user.isOwner}
                    isAdmin={user.isAdmin}
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
        </>
        </div>
      );
    }