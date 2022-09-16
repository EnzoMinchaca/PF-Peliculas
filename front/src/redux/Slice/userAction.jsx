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
    comfirmPassword,
    addbys,
    getAllUsers,
    toPayPay,
    deleteUserById,
    toPay, 
    toExecute,
    theUser,
    filterByStatus,
    editUserSt,
    getUserName,
    addFav,
    removeFav

}from "./userSlice";


export const allUsers=()=>(dispatch)=>{
    axios.get("http://localhost:3001/getUsers")
    .then(resp=> {
        return{
            payload:dispatch(getAllUsers(resp.data))            
        }})
    
    .catch((e) => {
        console.log(e);
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! -- GetUsers",
          });
      });
}



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

    export const oneUser = (id) => (dispatch) => {
        console.log(id)
        return axios.get(`http://localhost:3001/userId/${id}`)
            .then(response=> {
                console.log(response)
                dispatch(theUser(response.data))
                // dispatch(addFav(response.data.favorites))
                localStorage.setItem('user', JSON.stringify(response.data))
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
                    if(res.data.status==="Active"){
                        localStorage.setItem('user', JSON.stringify(res.data))
                    return{
                        payload: dispatch(loginUser(res.data))
                    }
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'User not active, check your email',
                        })
                        throw TypeError("User no activate")
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

                    if(e.response.data==="No user fount"){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No user fount',
                        })
                    }else if(e.response.data==="The email or password entered is not correct"){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'The email or password entered is not correct',
                        })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'The data entered is incorrect -- LoginUser',
                        })
                    }
                   
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
            .then(()=>{
                Swal.fire({
                    //position: 'top-end',
                    //position: 'top-end',
                    icon: 'success',
                    title: 'User was registered successfully! Please check your email',
                    showConfirmButton: false,
                    timer: 5000
                })
                window.location.assign("http://localhost:3000/Home")
                
            })
            .catch((e) => {
                console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'the email entered is already registered',
                })
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
                    text: "Could not modify user",
                  });
              });
          
        }

        //Modifica solo el password
        export const UserPassword=(email)=>(dispatch)=>{
            console.log(email)
            axios.put(`http://localhost:3001/putUserPassword`, {email: email})
            
            .then(resp=>dispatch(putUserPassword(resp.data)))
            .then(()=>{
                console.log("entra")
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `
                    Check the email to change the password`,
                })
                
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

        export const confiPassword=(token, password)=>(dispatch)=>{
            console.log(token)
            console.log(password)
            axios.post(`http://localhost:3001/confirmPassword/${token}`,{password:password})
            .then(resp=>dispatch(comfirmPassword(resp.data)))
            .then(()=>{
                Swal.fire({
                    //position: 'top-end',
                    //position: 'top-end',
                    icon: 'success',
                    title: 'Success pasword change',
                    showConfirmButton: false,
                    timer: 5000
                })
                window.location.assign("http://localhost:3000/Home")
            })
            .catch((e) => console.log(e))
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to change password',
            })
        }

        //Para los pagos
        export const getPayment=(info)=>(dispatch)=>{
            axios.post('http://localhost:3001/payment', info)
                .then(response=>{
                    // console.log(response.data.init_point)
                    dispatch(toPay(response.data.init_point))
                })
        }

        export const postPaymentPay=(info)=>(dispatch)=>{
            axios.post('http://localhost:3001/paymentPay', info)
                .then(response=>{
                    // console.log(response.data.data.links[1].href)
                    dispatch(toPayPay(response.data.data.links[1].href))
                })
        }

        export const postExecutePay=(info)=>(dispatch)=>{
            axios.post('http://localhost:3001/executePay', info)
                .then(response=>{
                    // console.log(response.data.data.status)
                    dispatch(toExecute(response.data.data.status))
                })
        }

        /// Ruta para agregar la compra al carrito 
        export const putBuy=(newData, idUser)=>(dispatch)=>{
            axios.put(`http://localhost:3001/addBuy/${idUser}`, {buyMovie: newData})
            
            .then(resp=>{
                // console.log(resp)
                dispatch(addbys(resp.data))
            })
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Success',
            //     text: `Added purchase`,
            // })
            .catch((e) => {
                console.log(e);
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "can't add purchase! -- Addbuy",
                  });
              });
        }

        export const addMovieToFavs = (id) => (dispatch) => {
            axios.get(`http://localhost:3001/movieDetails/${id}`)
                .then(resp => dispatch(addFav([resp.data])))
                .catch((e) => {
                    console.log(e);
                    return Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Movie has beed added",
                    });
                });
        }

        export const deleteFromFavs =(id) => (dispatch) => {
            // localStorage.setItem('favs', JSON.stringify([]))
            dispatch(removeFav(id))
        }

        export const putFavToUser=(movieFav, idUser) => (dispatch) => {
            axios.put(`http://localhost:3001/addFavorite/${idUser}`, [movieFav])
                .then(resp => {
                    localStorage.setItem('user', JSON.stringify(resp.data))
                })
                .catch((e) => console.log(e))
        }

        export const deleteFavToUser=(movieFav, idUser) => (dispatch) => {
            axios.put(`http://localhost:3001/deleteFavorite/${idUser}`, [movieFav])
                .then(resp => {
                    console.log(resp.data)
                    localStorage.setItem('user', JSON.stringify(resp.data))
                })
                .catch((e) => console.log(e))
        }


        export const deleteUsers=(id)=>(dispatch)=>{
            axios.delete(`http://localhost:3001/deletUsers/${id}`)
            .then(resp=>console.log(resp.data))
            return Swal.fire({
                icon: "success",
                title: "Delete...",
            text: "Successfully deleted user",
              })
              
            .catch((e) => {
                console.log(e);
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                text: "Something went wrong! -- deleteUsers",
                  });
              });  
           dispatch(deleteUserById(id))
        }

        export const filterBStatus = (status) => (dispatch) => {
            dispatch(filterByStatus(status))
        }

        export const editUsersStatus=(roleUser)=>(dispatch)=>{
            console.log(roleUser)
            axios.put(`http://localhost:3001/promoveUsers/${roleUser.id}`, roleUser)
            
            .then(resp=>dispatch(editUserSt(resp.data)))
            .then(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `The user was successfully modified`,
                })
            })
            .catch((e) => {
                console.log(e);
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Could not modify user.! -- PromoveUser",
                  });
              });
        }
  //busca un usuarion por nombre
  export const getSearchUser=(name)=>(dispatch)=>{
    axios.get(`http://localhost:3001/getUsersName?nameUser=${name}`)
    .then(resp=> {
        return{
            payload:dispatch(getUserName(resp.data))            
        }})
    
    .catch((e) => {
        console.log(e);
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! -- GetUsers",
          });
      });
}

    export const sendMailAfterBuy=(email, moviesBuy)=>(dispatch)=>{
        axios.post('http://localhost:3001/sendPuchase', {email: email, moviesBuy: moviesBuy})
            .then(resp => console.log(resp))
    }



        








