import React from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { putBuy, oneUser } from '../../redux/Slice/userAction'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../redux/Slice/movieAction'
import Swal from 'sweetalert2'

export default function Confirm() {

    const navigate = useNavigate()
    const {search} = useLocation()
    const query = new URLSearchParams(search)
    // console.log(query)

    const dispatch = useDispatch()
    const status = query.get('status')
    const collectionStatus = query.get('collection_status')
    const collectionId = query.get('collection_id')
    const paymentId = query.get('payment_id')
    // console.log(status)
    // console.log(typeof status)

    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('cart'))
        console.log(movies)
        const user = JSON.parse(localStorage.getItem('user'))
        const idUser = user._id
        console.log(idUser)
        if(status === "approved" && collectionStatus === "approved" && collectionId !== "null" && paymentId !== "null") {
            dispatch(putBuy(movies, idUser))
            dispatch(oneUser(idUser))
            // console.log(user.buy)
            // const send = user
            // console.log(movies)
            // send.buy = user.buy.concat(movies)
            // console.log(send.buy)
            // console.log(send)
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
                    <h1>Aproved</h1>
                    <Link to={"/home"}>
                        <button>Volver al home</button>
                    </Link>
                </div> 
                : status === "rejected" ?
                <h1>Rejected</h1>
                : status === "in_process" ?
                <h1>In Process</h1>
                :
                <h1>Null</h1>
            }
        </div>
    )
}
