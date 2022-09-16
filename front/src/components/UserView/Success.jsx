import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import ButtonHome from '../Presentational/ButtonHome'
import Footer from '../Presentational/footer'
import Header from '../Presentational/header'
import s from "./Success.module.css"
/* import styles from "../../styles/Buttons.module.css"; */

export default function Success() {
    
    const navigate = useNavigate()
    React.useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(!user) {
            navigate("/home")
        }
    }, [])

    return (
        <div className={s.content}>
            <Header/>
            <div className={s.link}>
                <h2 className={s.text}>Success</h2>
            </div>
            <div className={s.body}>
                <h2>Go to your profile to see your acquisitions or go to home</h2>
                <p>We send you an email with the details of your purchase</p>
                <div className={s.buttons}>
                    <NavLink to={"/editUser"}>
                        <button className={s.btn}>Profile</button>
                    </NavLink>
                    <ButtonHome/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
