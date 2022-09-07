import axios from "axios";
import Swal from "sweetalert2";
import {
    userLogin,
    loginUser, 
    getUser, 
    logout,
    createUser,
    editUser,
    getUserByToken,
    putUserPassword 
}from "./userSlice";

// Nota: hay datos temporales que deben ajustarse a lo que venga del back pero la estructura esta. 


//Acción para logearse cuando ya este registrado 
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

    //Acción para cerrar la sesión
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
        ///// Menú Usuario  1.Verificar ingreso 2. Cerrar sesión//// 

        // Acción ingreso de usuario 
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
                    window.location.assign("http://localhost:3000/checkuser/auth/login") // Crear ruta para direccionar al usuario
                    Swal.fire({
                        icon: 'success',
                        title: 'Ingreso Exitoso...',
                        text: 'Bienvenido a Henry Movie',
                    })
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Los datos ingresados son erroneos, Intente de nuevo',
                    })
                })
        }

        //Acción para crear usuario 
       export const postCreateUser=(newData)=>(dispatch)=>{
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

        //Acción para modificar perfil 
        export const EditUser=(bodyFormData, id)=>(dispatch)=>{
            axios.put({
                url: `http://localhost:3001/editUser/${id}`, 
                data: bodyFormData})
            
            .then(resp=>dispatch(editUser(resp.data)))
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `The user was successfully modified`,
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
        export const putUserPassword=(token, password)=>(dispatch)=>{
            axios.put({
                url: `http://localhost:3001/putUserPassword/${token}`, 
                data: password})
            
            .then(resp=>dispatch(putUserPassword (resp.data)))
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `
                The password has been changed successfully`,
            })
            window.location.assign("http://localhost:3000/")
            .catch((e) => {
                console.log(e);
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "The user data is not correct",
                  });
              });
        }









