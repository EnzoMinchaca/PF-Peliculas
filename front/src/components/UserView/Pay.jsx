import React from 'react'
import "./Pay.css"
import mp from '../../../src/img/mercadopago.jpg'

export default function Pay({children, isOpen, closeModal, link}) {

    const handleModalContainerClick = (e) => {
        e.stopPropagation()
    }

    return (
        <div className={`content ${isOpen && "modal"}`} onClick={closeModal}>
            <div className='modal-container' onClick={handleModalContainerClick}>
                {children}
                <div>
                    <a href={link}>
                        <img src={mp} alt="mercadopago" className='img'/>
                    </a>
                </div>
                <button className='btn' onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}
