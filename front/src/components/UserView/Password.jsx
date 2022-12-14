import React, { useEffect } from "react";
import styles from "../../styles/styles.module.css";
import ButtonHome from "../Presentational/ButtonHome";
import css from "./EditUser.module.css";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { confiPassword, editUsers } from "../../redux/Slice/userAction";
import { useParams } from "react-router";

export default function Password(){
    const [input, setInput] = React.useState({
        password: "",
        comfirmPassword: ""
        // password:"",
        // comfirmPassword:""
    })
    const dispatch=useDispatch();
    const {token} =useParams();

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
    }
    // const handleClickLastName = () => {
    //     setOpenLastName(!openLastName);
    //   };
    //   const handleClickPassword = () => {
    //     setOpenPassword(!openPassword);
    //   };

      function handleSubmitName(e) {
            if(!input.password || !input.comfirmPassword){
                e.preventDefault()
                Swal.fire({
                    icon: "error",
                    title: "Ohhh!",
                    text: "Plis check and complete the fields",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#0b132b"
                });
            }else if(input.password!==input.comfirmPassword){
                Swal.fire({
                    icon: "error",
                    title: "Ohhh!",
                    text: "Passwords are not the same",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#0b132b"
                });
            }else{
                e.preventDefault()
                dispatch(confiPassword(token,input.password))
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Successfully changes",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#0b132b"
                });
            }
           
        }
        // function handleSubmitLastName(e) {
        //     if(!input.lastName){
        //         e.preventDefault()
        //         Swal.fire({
        //             icon: "error",
        //             title: "Ohhh!",
        //             text: "Plis check and complete the field",
        //             confirmButtonText: "Ok",
        //             confirmButtonColor: "#0b132b"
        //         });
        //     }
        //     e.preventDefault()
        //     console.log(input.lastName)
        //     Swal.fire({
        //         icon: "success",
        //         title: "Success",
        //         text: "Successfully save Last name",
        //         confirmButtonText: "Ok",
        //         confirmButtonColor: "#0b132b"
        //     });
        // }
        // function handleSubmitPassword(e) {
        //     if(!input.password || !input.comfirmPassword){
        //         e.preventDefault()
        //         Swal.fire({
        //             icon: "error",
        //             title: "Ohhh!",
        //             text: "Plis check and complete the fields",
        //             confirmButtonText: "Ok",
        //             confirmButtonColor: "#0b132b"
        //         });
        //     }else if(input.password !== input.comfirmPassword){
        //         e.preventDefault()
        //         Swal.fire({
        //             icon: "error",
        //             title: "Ohhh!",
        //             text: "Passwords not same",
        //             confirmButtonText: "Ok",
        //             confirmButtonColor: "#0b132b"
        //         });
        //     }else{
        //         e.preventDefault()
        //         console.log(input.password)
        //         console.log(input.comfirmPassword)
        //         Swal.fire({
        //             icon: "success",
        //             title: "Success",
        //             text: "Successfully save name",
        //             confirmButtonText: "Ok",
        //             confirmButtonColor: "#0b132b"
        //         });
        //     }
          
        // }
    return(
        <div>
            <div className={styles.title}>
                <p className={styles.span}>Edit Profile</p></div>
                <div className={styles.ubButton}><ButtonHome/> </div>
            <div className={css.generalContainer}></div>
        <form onSubmit={(e)=>handleSubmitName(e)} className={css.form}>
            <div className={css.containerInputs}>
                    <div>
                        <label>Password: </label>
                        <input 
                            className={css.input}
                            placeholder="password"
                            type="password" 
                            value={input.password}
                            name="password"
                            required
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Comfirm Password: </label>
                        <input 
                            className={css.input}
                            placeholder="Cofirm password"
                            type="password" 
                            value={input.comfirmPassword}
                            name="comfirmPassword"
                            required
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    {/* <input type={"submit"} value={"Create"}/> */}
                    <input className={css.btn} type="submit" value="Save"/>
                </div>
        </form>
      {/* <ListItemButton onClick={handleClickLastName}>
        <ListItemIcon>
          <PersonIcon/>
        </ListItemIcon>
        <ListItemText primary="Edit Last Name" />
        {openLastName ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openLastName} timeout="auto" unmountOnExit>
        <form onSubmit={(e)=>handleSubmitLastName(e)} className={css.form}>
            <div className={css.containerInputs}>
                    <div>
                        <label>Last Name: </label>
                        <input 
                            className={css.input}
                            placeholder="Last Name"
                            type="text" 
                            value={input.lastName}
                            name="lastName"
                            required
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <input className={css.btn} type="submit" value="Save"/>
                </div>
        </form>
      </Collapse>
      <ListItemButton onClick={handleClickPassword}>
        <ListItemIcon>
          <PasswordIcon/>
        </ListItemIcon>
        <ListItemText primary="New password" />
        {openPassword ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openPassword} timeout="auto" unmountOnExit>
        <form onSubmit={(e)=>handleSubmitPassword(e)} className={css.form}>
            <div className={css.containerInputs}>
                    <div>
                        <label>New password: </label>
                        <input 
                            className={css.input}
                            placeholder="New password"
                            type="password" 
                            value={input.password}
                            name="password"
                            required
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Comfirm password: </label>
                        <input 
                            className={css.input}
                            placeholder="Comfirm password"
                            type="password" 
                            value={input.comfirmPassword}
                            name="comfirmPassword"
                            required
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <input className={css.btn} type="submit" value="Save"/>
                </div>
        </form>
      </Collapse> */}
        </div>
    )
}