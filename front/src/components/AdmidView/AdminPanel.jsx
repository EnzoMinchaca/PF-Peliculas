
import React from "react";
import styles from "../../styles/Admin.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { BsFillHouseDoorFill } from "react-icons/bs";



export default function AdminPanel() {
    return (
        <div  >
         <div className={styles.title1}>
           <p className={styles.span1}> Admin Panel</p>
           <div className={styles.home} >
            <Link to="/Home">   
               <BsFillHouseDoorFill className={styles.icon}/> 
            </Link>
            </div>
        
         </div>
                <div className={styles.gridContainer}>
                <div className={styles.item1}><Link to="/modifyUsers"><div className={styles.img1}></div></Link></div>
                <div className={styles.item2}><Link to="/rol"><div className={styles.img2}></div></Link></div>
                <div className={styles.item3}><Link to="/ViewMovies"><div className={styles.img3}></div></Link></div>
                <div className={styles.item4}><Link to="/Create"><div className={styles.img4}></div></Link></div>
                <div className={styles.item6}><div className={styles.butt}>View Users</div></div>
                <div className={styles.item7}><div className={styles.butt}>Change User</div></div>
                <div className={styles.item8}><div className={styles.butt}>View Movies</div></div>
                <div className={styles.item9}><div className={styles.butt}>Add Movie</div></div>
               
        </div>
        </div>

    )

}