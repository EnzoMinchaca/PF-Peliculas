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
                <div  className={styles.caja}><Link to="/vistaUser"><div className={styles.movieBtn}></div></Link></div>
                
                    <div className={styles.caja}> 
                    <div className={styles.userBtn}></div>  </div>
                
                
                
                <div className={styles.caja}>  <div ><Link to="/vistaUser"></Link><button className={styles.btn1}>  Users </button></div>  </div>
                <div className={styles.caja}> <div><button className={styles.btn2}>  Movies </button></div></div>

                  

                  

                  

                </div>
                
                   

                </div>
            
            </div>
            <Footer/>
        </div>
    )
}