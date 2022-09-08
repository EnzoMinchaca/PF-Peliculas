import React from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Confirm() {

    const navigate = useNavigate()
    const {search} = useLocation()
    const query = new URLSearchParams(search)
    console.log(query)

    const status = query.get('status')
    console.log(status)
    console.log(typeof status)

    useEffect(() => {
        if(status === "approved") {
            navigate("/success")
        }
        if(status === "rejected") {
            navigate("/home")
        }
        if(status === "null") {
            navigate("/home")
        }
        if(status === "in_process") {
            navigate("/home")
        }
    }, [])


    return (
        <div>
            {
                status === "approved" ?
                <div>
                    <h1>Se aprobo tu pago perri ya tenes tu nueva pelicula</h1>
                    <Link to={"/home"}>
                        <button>Volver al home</button>
                    </Link>
                </div> 
                : status === "rejected" ?
                <h1>Nos rechazaron perri</h1>
                : status === "in_process" ?
                <h1>Estamos en proceso perri</h1>
                :
                <h1>Estamos nulo perri</h1>
            }
        </div>
    )
}
