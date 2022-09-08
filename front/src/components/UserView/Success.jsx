import React from 'react'
import { NavLink } from 'react-router-dom'
import ButtonHome from '../Presentational/ButtonHome'
import Footer from '../Presentational/footer'
import Header from '../Presentational/header'
import s from "./Success.module.css"
import styles from "../../styles/Buttons.module.css";

export default function Success() {
    return (
        <div className={s.content}>
            <Header/>
            <div className={s.link}>
                <h2 className={s.text}>Success</h2>
            </div>
            <div className={s.body}>
                <h2>Go to your profile to see your acquisitions or go to home</h2>
                <div className={s.buttons}>
                    <button className={s.btn}>Profile</button>
                    <ButtonHome/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
