import React from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { postExecutePay } from '../../redux/Slice/userAction'
import s from './ConfirmPay.module.css'

export default function ConfirmPay() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {search} = useLocation()
    const query = new URLSearchParams(search)
    // console.log(query)
    const token = query.get('token')
    // console.log(token)
    const send = {
        token: token
    }
    
    const status = useSelector(state => state.users.executePay)
    // console.log(status)

    useEffect(() => {
        dispatch(postExecutePay(send))
        const user = JSON.parse(localStorage.getItem('user'))
        if(!user) {
            navigate("/home")
        }
    }, [])
    
    if(status === "COMPLETED") {
        navigate("/success")
    }
    if(!status) {
        navigate("/home")
    }

    return (
        <div className={s.content}>
            <span className={s.text}>Processing</span>
            <span className={s.dots}>.....</span>
        </div>
    )
}