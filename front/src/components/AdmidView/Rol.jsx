import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../redux/Slice/userAction";
import VistaRol from "./VistRol";
import styles from "../../styles/Admin.module.css";
import { Link } from "react-router-dom";
import { BsFillHouseDoorFill} from "react-icons/bs";
import { AiFillLeftSquare } from "react-icons/ai";
import Pagination  from "../UserView/Paginated";



export default function VistaRoles(){

    const dispatch=useDispatch();
    const navigate = useNavigate()
    const [isUser, setisUser] = useState(true)
    const users=useSelector(state=>state.users.users);
    const [page, setPag] = useState(1);  

    if(typeof users !== 'string') {
     var usersPerPage = 5;        
     var max= users.length / usersPerPage;
     var firstUsers = ((page-1)* usersPerPage);  
     var lastUsers = firstUsers + usersPerPage ;
 }

    

         React.useEffect(()=>{
         dispatch(allUsers())
         const user = JSON.parse(localStorage.getItem('user'))
        if(user === null) {
            console.log(user)
            // setisUser(true)
            navigate("/home")
        }
        if(user) {
            const flag = user.isUser ? true : false
            // setisUser(true)
            if(flag) {
                navigate("/home")
            }
        }
        setisUser(false)
       },[])

       if(isUser) {
        return(
            <div></div>
        )
    } else {

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

          {typeof users ==='string'?
          <h2>{users}, click refresh </h2>
          :
      
                users?.slice(firstUsers, lastUsers).map((user) => {
                  return (
                    <VistaRol
                    key={user._id}
                    name={user.name}
                    lastname={user.lastname}
                    email={user.email}
                    status={user.status}
                    isUser={user.isUser}
                    isBan={user.isBan}
                    isOwner={user.isOwner}
                    isAdmin={user.isAdmin}
                    id={user._id} />
                  )
                })
      

              }
              
             <div className={typeof users ==='string'?"Pagination":''} >
               <Pagination page={page} setPag={setPag} max={max} users={users} ></Pagination>
              </div>

        </div>
    
       
      )
          
    }

  }