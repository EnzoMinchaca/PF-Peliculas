import React from "react";
import Header from '../Presentational/header'
import Footer from '../Presentational/footer'
import ButtonHome from '../Presentational/ButtonHome'
import styles from "../../styles/styles.module.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { FiLayout } from "react-icons/fi";
import { Link } from "react-router-dom";



export default function AdminPanel() {
    return (
        <div>
            <Header/>
            
            <div className={styles.title}>
                <p className={styles.span}> Admin Panel</p>
            </div>
                
                <div className={styles.detailContainer}>
                <div className={styles.card2}>
                <div><ButtonHome/></div>
                <div className={styles.grid}>
                <div  className={styles.caja}><Link to="/modifyUsers"><div className={styles.movieBtn}></div></Link></div>
                
                <div className={styles.caja}><Link to="/modifyMovies"><div className={styles.userBtn}></div></Link></div>
                

                  

                  

                  

                </div>
                
                   

                </div>
            
            </div>
            <Footer/>
        </div>
    )
}