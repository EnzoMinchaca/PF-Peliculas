import React, { useEffect } from "react";
import Header from '../Presentational/header'
import Footer from '../Presentational/footer'
import ButtonHome from '../Presentational/ButtonHome'
import styles from "../../styles/styles.module.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { FiLayout } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


export default function AdminPanel() {

    const navigate = useNavigate()
    const [isUser, setisUser] = useState(true)
    
    useEffect(() => {
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
    }, [])

    if(isUser) {
        return(
            <div></div>
        )
    } else {

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

}