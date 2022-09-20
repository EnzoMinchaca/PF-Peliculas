import React from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { putBuy, oneUser, sendMailAfterBuy } from '../../redux/Slice/userAction'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../redux/Slice/movieAction'
import Swal from 'sweetalert2'

export default function Confirm() {

    const navigate = useNavigate()
    const {search} = useLocation()
    const query = new URLSearchParams(search)

    const dispatch = useDispatch()
    const status = query.get('status')
    const collectionStatus = query.get('collection_status')
    const collectionId = query.get('collection_id')
    const paymentId = query.get('payment_id')

    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('cart'))
        console.log(movies)
        const user = JSON.parse(localStorage.getItem('user'))
        const idUser = user._id
        console.log(idUser)
        if(status === "approved" && collectionStatus === "approved" && collectionId !== "null" && paymentId !== "null") {
            dispatch(putBuy(movies, idUser))
            dispatch(oneUser(idUser))
            dispatch(sendMailAfterBuy(user.email, movies))
            localStorage.setItem('user', JSON.stringify(user))
            dispatch(clearCart())
            navigate("/success")
        }
        if(status === "rejected" && collectionStatus === "rejected" && collectionId !== "null" && paymentId !== "null") {
            navigate("/home")
        }
        if(status === "null" && collectionStatus === "null" && collectionId === "null" && paymentId === "null") {
            navigate("/home")
        }
        if(status === "in_process" && collectionStatus === "in_process" && collectionId !== "null" && paymentId !== "null") {
            navigate("/home")
        }
        if(!status || !collectionStatus || !collectionId || !paymentId) {
            navigate("/home")
        }
    }, [])


    return (
        <div>
            {
                status === "approved" ?
                <div>
                </div> 
                : status === "rejected" ?
                <div></div>
                : status === "in_process" ?
                <div></div>
                :
                <div></div>
            }
        </div>
    )
}
