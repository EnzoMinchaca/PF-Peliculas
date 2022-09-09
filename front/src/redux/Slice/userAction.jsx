import axios from "axios";
import Swal from "sweetalert2";
import {
    userLogin,
    loginUser, 
    getUsers, 
    logout,
    createUser,
    editUser,
    getUserByToken,
    putUserPassword,
    addbys
}from "./userSlice";


//Acción para logearse cuando ya este registrado 
export const postLogin=(data)=>(dispatch)=>{
    return axios.post({
           url: `http://localhost:3001/loginUser`,
           data: data})

        .then(res => {
            return{
                payload: dispatch(userLogin(res.data.token))
            }
        }
        );     
}
////////---- Menú Usuario ----//////
//Acción para revisar la autorización e ingresar - almacena los datos en el localStorage 
export const getUser=()=>(dispatch)=>{
    return axios.get({
        url: `http://localhost:3001/autorización`,}) // Revisar ruta

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
                payload: dispatch(getUsers(res.data.token))
            }
        })

        .catch(err => {
            if (err.message === "Cannot read property 'data' of undefined") {
                return console.log('err:: ', err.message);
            }
            localStorage.setItem('statusToken', 'Token expirado.');
            console.error('detalle error:', err.message);
        })
    }

    //Acción para cerrar la sesión y limpiar el localstorage 
    export const logOut=()=>(dispatch)=>{ 
             dispatch(logout(localStorage.clear()))
             window.location.assign('http://localhost:3000')

        }

        ///// Menú Usuario  1.Verificar ingreso 2. Cerrar sesión//// 

        // Acción ingreso de usuario 
        export const loginUsers=(loginData)=>(dispatch)=>{

            console.log(loginData)
            axios.post('http://localhost:3001/loginUser', loginData)

                .then(res => {
                    console.log(res)
                    localStorage.setItem('user', JSON.stringify(res.data))
                    return{
                        payload: dispatch(loginUser(res.data))
                    }
                })
                .then(res => {
                    console.log(res)
                    
                    Swal.fire({
                        text: "You have successfully logged in",
                        icon: "success",
                        timer: "2000",
                    });
                    window.location.reload(false);
            
                })
                .catch((e) => {
                    console.log(e.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'The data entered is incorrect -- LoginUser',
                    })
                })
        }

        //Acción para crear usuario 
       /*export const postCreateUser=(newData)=>(dispatch)=>{
            return axios.post({
                url: `http://localhost:3001/registerUser`,
                
                data: {
                    name: newData.firstName,
                    lastname: newData.lastName,
                    email: newData.email,
                    password: newData.password,   
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
                    window.location.assign("http://localhost:3000/login/loginuser") // Sería el componente a donde puede ingresar el usuario
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
        */
        export const postCreateUser=(user)=>(dispatch)=>{
            axios.post('http://localhost:3001/registerUser', user)
            .then(resp=>dispatch(createUser(resp.data)))
            Swal.fire({
                //position: 'top-end',
                //position: 'top-end',
                icon: 'success',
                title: 'You have successfully logged in',
                showConfirmButton: false,
                timer: 5000
            })
            window.location.assign("http://localhost:3000/Home")
            .catch((e) => console.log(e))
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'the email entered is already registered',
            })
            
        }


        //Acción para verificar token
        export const getToken=(token)=>(dispatch)=>{
            axios.get(`http://localhost:3001/confirmUser/${token}`)
            .then(resp=>dispatch(getUserByToken(resp.data)))
            .catch((e) => {
                console.log(e);
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "User Not found.! -- GetByToken",
                  });
              });
        }

        //Acción para modificar perfil (opcional - panel de usuario)
        export const editUsers=(bodyFormData, id)=>(dispatch)=>{
            console.log(bodyFormData)
            console.log(id)
            axios.put(`http://localhost:3001/editUser/${id}`, bodyFormData)
            
            .then(resp=>dispatch(editUser(resp.data)))
            .then(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `The user was successfully modified`,
                })
                const user = JSON.parse(localStorage.getItem('user'))
                user.name=bodyFormData.nameUser
                user.lastname=bodyFormData.lastname
                localStorage.setItem('user', JSON.stringify(user))
                window.location.reload(false);
            })
            .catch((e) => {
                console.log(e);
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Could not modify user.! -- EditUser",
                  });
              });
          
        }

        //Modifica solo el password
        export const UserPassword=(email)=>(dispatch)=>{
            console.log(email)
            axios.put(`http://localhost:3001/putUserPassword`, email)
            
            .then(resp=>dispatch(putUserPassword(resp.data)))
            .then(()=>{
                console.log("entra")
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `
                    The password has been changed successfully`,
                })
                window.location.reload(false);
            })
           
            .catch((e) => {
                console.log(e);
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "The user data is not correct",
                  });
              });
        }

        export const getPayment=(info)=>(dispatch)=>{
            axios.get('http://localhost:3001/payment', info)
                .then(response=>console.log(response))
        }

        /// Ruta para agregar la compra al carrito 
        export const putBuy=(newData, idUser)=>(dispatch)=>{
            axios.put({
                url: `http://localhost:3001/addBuy/${idUser}`, 
                data: newData})
            
            .then(resp=>dispatch(addbys(resp.data)))
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Added purchase`,
            })
            .catch((e) => {
                console.log(e);
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "can't add purchase! -- Addbuy",
                  });
              });
        }








