import React, { useState } from "react";
import css from "./Login.module.css";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Swal from "sweetalert2";

export default function Login({closeModal}){
    const [login,setLogin]=useState(true)
    const [similarPassword,setSimilarPassword]=useState(true)
    const [input, setInput] = useState({
        email: "",
        password: "",
        name:"",
        comfirmPassword:"",
        lastName:""
    })
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
    }
    function handleSubmit(e) {
        if(login){
            if(!input.email || !input.password) {
                e.preventDefault()
                closeModal()
                Swal.fire({
                    icon: "error",
                    title: "Ohhh!",
                    text: "Plis check and complete the fields",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#0b132b"
                });
                console.log("error")
            } 
            else {
                e.preventDefault()
                closeModal()
                localStorage.setItem('user',JSON.stringify({
                    email:input.email,
                    token:"vhunhosighiohoiaehoiahao"
                }))
                console.log(input)
                setInput({
                    email: "",
                    password: ""
                })
            }
        }else{
            if(!input.email || !input.password || !input.name || !input.comfirmPassword || !input.lastName) {
                e.preventDefault()
                closeModal()
                Swal.fire({
                    icon: "error",
                    title: "Ohhh!",
                    text: "Plis check and complete the fields",
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
            }else if(input.password===input.comfirmPassword){
                setSimilarPassword(true)
            }
            else {
                e.preventDefault()
                console.log(input)
                setInput({
                    email: "",
                    password: "",
                    name:"",
                    comfirmPassword:"",
                    lastName:""
                })
            }
        }
    }

    const handleLogin= ()=>{
        setLogin(true)
    }
    const handleSingUp= ()=>{
        setLogin(false)
    }
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
                </div>
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
                        value={input.lastName}
                        name="lastName"
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
        </form>
            }
        </div>
        </div>
    )
}