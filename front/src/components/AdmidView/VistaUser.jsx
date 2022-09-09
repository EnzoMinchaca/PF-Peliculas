import React from "react";
import Header from '../Presentational/header'
import Footer from '../Presentational/footer'
import ButtonHome from '../Presentational/ButtonHome'
import styles from "../../styles/styles.module.css"
import { useDispatch, useSelector } from "react-redux";
import { allJUsers } from "../../redux/Slice/userAction";
import { Link } from "react-router-dom";

export default function VistaUser() {


    const dispatch=useDispatch();
    const users=useSelector(state=>state.users.users)

    React.useEffect(()=>{
      dispatch(allJUsers())
    },[])


    return (
        <div>
            <Header/>
            <div className={styles.title}>
                <p className={styles.span}> Admin Panel -- Users</p>
            </div>
            <Link to="/panel">
              {" "}
                <button className={styles.btn2}> Panel Admin </button>
            </Link>
            <div  className={styles.containerUser}>
            {users.length? users.map((user)=>{
                return (
                     <div className={styles.stats}>
                       <div className={styles.statsCard}>
                          <p>{user.name}</p>
                          <p>{user.lastname}</p>
                          <p>{user.status}</p>
                          <p>{user.email}</p>
                       </div>
                       </div>
              )
            }):null}
            
            </div >

            
            <Footer/>
        </div>
    )
}