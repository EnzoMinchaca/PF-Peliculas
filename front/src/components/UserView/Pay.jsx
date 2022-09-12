import React from 'react'
import "./Pay.css"
import mp from '../../../src/img/mercadopago.jpg'
import pp from '../../../src/img/paypal.png'

export default function Pay({children, isOpen, closeModal, linkMP, linkPP}) {

    const handleModalContainerClick = (e) => {
        e.stopPropagation()
    }

    return (
        <div className={`content ${isOpen && "modal"}`} onClick={closeModal}>
            <div className='modal-container' onClick={handleModalContainerClick}>
                {children}
                <div>
                    <a href={linkMP}>
                        <img src={mp} alt="mercadopago" className='img'/>
                    </a>
                </div>
                <div>
                    <a href={linkPP}>
                        <img src={pp} alt="paypal" className='img'/>
                    </a>
                </div>
                <button className='btn' onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}
