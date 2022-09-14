import React from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { oneUser, postExecutePay, putBuy } from '../../redux/Slice/userAction'
import { addBuyMovie, clearCart } from '../../redux/Slice/movieAction'
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
    const movies = JSON.parse(localStorage.getItem('cart'))
        const user = JSON.parse(localStorage.getItem('user'))
        const idUser = user._id

    useEffect(() => {
        dispatch(postExecutePay(send))
        const user = JSON.parse(localStorage.getItem('user'))
        if(!user) {
            navigate("/home")
        }
    }, [])
    if(status === "COMPLETED") {
        dispatch(putBuy(movies, idUser))
        dispatch(oneUser(idUser))
        localStorage.setItem('user', JSON.stringify(user))
        dispatch(clearCart())
        navigate("/success")
        dispatch(addBuyMovie(movies))
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