import React from 'react'
import Header from '../Presentational/header'
import Footer from '../Presentational/footer'
import ButtonHome from '../Presentational/ButtonHome'
import styles from "../../styles/styles.module.css"



export default function Cart() {

   
    return (
        <div>
            <Header/>
            <div className={styles.title}>
                <p className={styles.span}> Henry Movie - Cart</p>
            </div>
                <div><ButtonHome/></div>
            <Footer/>
        </div>
    )
}