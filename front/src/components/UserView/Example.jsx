import React from 'react'
import Pay from './Pay.jsx'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPayment } from '../../redux/Slice/userAction.jsx'

export default function Example() {

    const [isOpenModal, setisOpen] = useState(false)
    const openModal = () => {
        setisOpen(true)
        dispatch(getPayment(simulador))
        console.log(linkPay)
    }
    const closeModal = () => setisOpen(false)

    const dispatch = useDispatch()
    const linkPay = useSelector(state => state.users.payLink)

    const simulador = {
        email: "test_user_11831113@testuser.com",
        items: [{
            title: "Una pelicula",
            description: "Descripcion de la pelicula",
            picture_url: "https://es.web.img3.acsta.net/c_310_420/pictures/22/07/11/17/07/2506648.jpg",
            category_id: "El id de la pelicula",
            quantity: 1,
            unit_price: 17000
        },
        {
            title: "Otra pelicula",
            description: "Descripcion de la otra pelicula",
            picture_url: "https://es.web.img3.acsta.net/c_310_420/pictures/22/07/11/17/07/2506648.jpg",
            category_id: "El id de la otra pelicula",
            quantity: 1,
            unit_price: 5000
        }
    ]}

    return (
        <div>
            <h2>Component to pay</h2>
            <button onClick={openModal}>Pay</button>
            <Pay isOpen={isOpenModal} closeModal={closeModal} link={linkPay}>
                <h3>Payment methods</h3>
            </Pay>
        </div>
    )
}
