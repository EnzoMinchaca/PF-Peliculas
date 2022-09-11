import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function CancelPay() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/home")
    })

  return (
    <div>CancelPay</div>
  )
}
