import axios from "axios";
import Swal from "sweetalert2";
import {
    userLogin,
    loginUser, 
    getUser, 
    logout,
    createUser  
}from "./userSlice";

// Nota: hay datos temporales que deben ajustarse a lo que venga del back pero la estructura esta. 


export const postLogin=(data)=>(dispatch)=>{
    return axios.post({
           url: `http://localhost:3001/auth/login`, //ruta temporal para esperar la del back
           data: data})

        .then(res => {
            return{
                payload: dispatch(userLogin(res.data.token))
            }
        }
        );     
}

export const getUser=()=>(dispatch)=>{
    return axios.get({
        url: `http://localhost:3001/auth`,}) // ruta temporal para esperar la del back 

        .then((res) => {
            console.log(res.data.message)
            localStorage.setItem('idUser', res.data.user.id)
            localStorage.setItem('name', res.data.user.name)
            localStorage.setItem('lastName', res.data.user.lastName)
            localStorage.setItem('fullName', res.data.user.fullName)
            localStorage.setItem('rol', res.data.user.rol)
            localStorage.setItem('statusToken', res.data.message)
            localStorage.setItem('email', res.data.user.email)
        })
        .the((res)=>{
            return{
                payload: dispatch(getUser(res.data.token))
            }
        })

        .catch(err => {
            if (err.message == "Cannot read property 'data' of undefined") {
                return console.log('err:: ', err.message);
            }
            localStorage.setItem('statusToken', 'Token expirado.');
            console.error('detalle error:', err.message);
        })
    }

    export const logOut=()=>(dispatch)=>{
        return axios.get({
            url: `http://localhost:3001/auth/logout`,}) //// ruta temporal para esperar la del back

            .then((res) => {
                localStorage.clear()
                return res
            })

            .then((res) => {
                return{
                    payload: dispatch(logout(res.data))
                }
            })
            
            .then(() =>
                window.location.assign('http://localhost:3000'))

            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err}`,
                })
            })
        }

        export const loginUser=(loginData)=>(dispatch)=>{
            axios.post({
                url: `http://localhost:3001/auth/login`,
                data: {
                    email: loginData.email,
                    password: loginData.password,
                }
            })
                .then(res => {
                    return{
                        payload: dispatch(loginUser(res.data))
                    }
                })
                .then(res => {
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('statusToken', 'Usted está autorizado correctamente!')
                    window.location.assign("http://localhost:3000/checkuser/auth/login")// ruta temporal para esperar la del back
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Los datos ingresados son erroneos',
                    })
                })
        }

       export const postCreateUser=(newData)=>(dispatch)=>{
            return axios.post({
                url: `http://localhost:3001/registerUser`,
                
                data: {
                    name: newData.firstName,
                    lastname: newData.lastName,
                    email: newData.email,
                    password: newData.password,
                    token: newData.token
                }
             
            })
                .then(res => {
                    return{
                        payload: dispatch(createUser(res.data))
                    } 
                }
                
                ).then((res) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Se creo la cuenta correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    console.log(res)
                    window.location.assign("http://localhost:3000/login/loginuser")
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El mail ingresado ya tiene cuenta creada',
                    })
                }
                )
        }








