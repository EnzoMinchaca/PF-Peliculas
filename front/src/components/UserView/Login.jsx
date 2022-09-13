import React, { useEffect, useState } from "react";
import css from "./Login.module.css";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {GoogleLogin} from "react-google-login"
import { gapi } from 'gapi-script';

import { loginUsers, postCreateUser, UserPassword } from "../../redux/Slice/userAction";


export default function Login({closeModal}){
    const [rememberPassword,setRememberPassword]=useState(true)
    const [login,setLogin]=useState(true)
    const [similarPassword,setSimilarPassword]=useState(true)
    const [input, setInput] = useState({
        email: "",
        password: "",
        name:"",
        comfirmPassword:"",
        lastname:""
    })

    const dispatch=useDispatch();
    const clientId = '386932037035-k8v833noqjk************.apps.googleusercontent.com';
    useEffect(()=>{
        const initClient = () => {
            gapi.client.init({
            clientId: clientId,
            scope: ''
          });
       };
       gapi.load('client:auth2', initClient);
    })
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
    }
    function googleSingUp(response){
        console.log(response)
        console.log(response.profileObj.email)
        console.log(response.profileObj.familyName)
        console.log(response.profileObj.givenName)
        console.log(response.profileObj.googleId)
        closeModal()
        dispatch(postCreateUser({email: response.profileObj.email,
            password: response.profileObj.googleId,
            name:response.profileObj.givenName,
            lastname:response.profileObj.familyName}))
    }
    function googleLogin(response){
        console.log(response)
        console.log(response.profileObj.email)
        console.log(response.profileObj.familyName)
        console.log(response.profileObj.givenName)
        console.log(response.profileObj.googleId)
        closeModal()
        dispatch(loginUsers({email: response.profileObj.email,
            password: response.profileObj.googleId }))
    }
    function handleSubmit(e) {
        if(login){
            if(!input.email || !input.password) {
                e.preventDefault()
                closeModal()
                Swal.fire({
                    icon: "error",
                    title: "Ohhh!",
                    text: "Please check and complete the fields",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#0b132b"
                });
                console.log("error")
            } 
            else {
                e.preventDefault()
                closeModal()
                dispatch(loginUsers({email: input.email, password: input.password }))

                //window.location.reload(false);

                console.log(input)
                setInput({
                    email: "",
                    password: ""
                })

                //window.location.reload(false);

            }
        }else{
            if(!input.email || !input.password || !input.name || !input.comfirmPassword || !input.lastname) {
                e.preventDefault()
                closeModal()
                Swal.fire({
                    icon: "error",
                    title: "Ohhh!",
                    text: "Please check and complete the fields",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#0b132b"
                });
                console.log("error")
            } 
            else if(input.password!==input.comfirmPassword){
                closeModal()
                Swal.fire({
                    icon: "error",
                    title: "Ohhh!",
                    text: "Passwords are not the same",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#0b132b"
                });
            }else {
                e.preventDefault()
                closeModal()
                dispatch(postCreateUser({email: input.email,
                password: input.password,
                name:input.name,
                lastname:input.lastname}))
                console.log(input)
                setInput({
                    email: "",
                    password: "",
                    name:"",
                    comfirmPassword:"",
                    lastname:""
                })
            }
        }
    }

    const handleSubmitPassword=(e)=>{
        e.preventDefault()
        if(!input.email){
            closeModal()
            Swal.fire({
                icon: "error",
                title: "Ohhh!",
                text: "Please check and complete the field",
                confirmButtonText: "Ok",
                confirmButtonColor: "#0b132b"
            });
        }else{
            e.preventDefault()
            closeModal()
            dispatch(UserPassword(input.email))
            // dispatch(({email: input.email,
            // password: input.password,
            // name:input.name,
            // lastname:input.lastname}))
        }
    }

    const handleLogin= ()=>{
        setLogin(true)
    }
    const handleSingUp= ()=>{
        setLogin(false)
    }
    const handleRemember=()=>{
        setRememberPassword(false)
    }
    if(rememberPassword){
        return(
    
            <div className={css.content}>
                <BottomNavigation
                    showLabels
                    className={css.content}
                >
                    <BottomNavigationAction className={css.contentItems} label="Login" onClick={()=>handleLogin()} />
                    <BottomNavigationAction className={css.contentItems} label="Sign Up" onClick={()=>handleSingUp()}/>
                </BottomNavigation>
                <div className={css.contentForm}>
                {login? 
                    <form onSubmit={(e) => handleSubmit(e)} className={css.form}>
                    <div className={css.containerInputs}>
                        <div>
                            <label>Email: </label>
                            <input 
                                className={css.input}
                                placeholder="Email"
                                type="email" 
                                value={input.email}
                                name="email"
                                required
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div >
                            <label> Password: </label>
                            <input 
                                className={css.input}
                                placeholder="Password"
                                type="password" 
                                required
                                value={input.password}
                                name="password"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        {/* <input type={"submit"} value={"Create"}/> */}
                        <input className={css.btn} type="submit" value="Login"/>
                        <button onClick={handleRemember} className={css.btnpassword}>Don't remember password</button>
                    </div>
                    <GoogleLogin
                        clientId="789693821904-sf3fdgl0ih103ad95ruro29ka5238gds.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={(response)=>googleLogin(response)}
                        onFailure={(response)=>googleLogin(response)}
                        cookiePolicy={'single_host_origin'}
                        />
                </form> :
                <form onSubmit={(e) => handleSubmit(e)} className={css.form}>
                <div className={css.containerInputs}>
                <div>
                        <label>Name: </label>
                        <input 
                            className={css.input}
                            placeholder="Name"
                            type="text" 
                            required
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Last Name: </label>
                        <input 
                            className={css.input}
                            placeholder="Last Name"
                            type="text" 
                            required
                            value={input.lastname}
                            name="lastname"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input 
                            className={css.input}
                            placeholder="Email"
                            type="email" 
                            required
                            value={input.email}
                            name="email"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div >
                        <label> Password: </label>
                        <input 
                            className={css.input}
                            placeholder="Password"
                            type="password" 
                            required
                            value={input.password}
                            name="password"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div >
                        <label> Comfirm password: </label>
                        <input 
                            className={css.input}
                            placeholder="Comfirm Password"
                            type="password" 
                            required
                            value={input.comfirmPassword}
                            name="comfirmPassword"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    {/* <input type={"submit"} value={"Create"}/> */}
                    <input className={css.btn} type="submit" value="Login"/>
                </div>
                <GoogleLogin
                        clientId="789693821904-sf3fdgl0ih103ad95ruro29ka5238gds.apps.googleusercontent.com"
                        buttonText="Sing up with Google"
                        onSuccess={(response)=>googleSingUp(response)}
                        onFailure={(response)=>googleSingUp(response)}
                        cookiePolicy={'single_host_origin'}
                        />
            </form>
                }
            </div>
            </div>)
    }else{
        return(
    
            <div className={css.content}>
                <div className={css.contentForm}> 
                    <form onSubmit={(e) => handleSubmitPassword(e)} className={css.form}>
                    <div className={css.containerInputs}>
                        <div>
                            <label>Enter the email to which a new password will be sent: </label>
                            <input 
                                className={css.input}
                                placeholder="Email"
                                type="email" 
                                value={input.email}
                                name="email"
                                required
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                       
                        {/* <input type={"submit"} value={"Create"}/> */}
                        <input className={css.btn} type="submit" value="Recover password"/>
                    </div>
                </form> 
            </div>
            </div>)
    }

    
}