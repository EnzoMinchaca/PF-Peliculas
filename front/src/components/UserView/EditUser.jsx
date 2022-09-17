import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles.module.css";
import buton from "../../styles/Buttons.module.css"
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
import { useDispatch, useSelector } from "react-redux";
import { editUsers, oneUser, editUsersImage} from "../../redux/Slice/userAction";
import styless from "../../styles/styles.module.css"
import { BiDetail } from "react-icons/bi"
import { FiPlay } from "react-icons/fi" 
import { getMovieById, movieToView } from "../../redux/Slice/movieAction";
import ImageIcon from '@mui/icons-material/Image';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



export default function EditUser(){
    const [openName, setOpenName] = React.useState(false);
    const [openLastName, setOpenLastName] = React.useState(false);
    const [openImage, setOpenImage] = React.useState(false);
    const [openPassword, setOpenPassword] = React.useState(false);
    const [image,setImage]=React.useState("");
    const [input, setInput] = React.useState({
        nameUser: "",
        lastname: ""
        // password:"",
        // comfirmPassword:""
    })
    const navigate = useNavigate()
    const dispatch=useDispatch();
    const theUser = useSelector(state => state.users.user)
    console.log(theUser)
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    const details = useSelector((state) => state.movies.movie)

    const handleClick = (id) => {
      dispatch(getMovieById(id))
      dispatch(movieToView(details))
      localStorage.setItem('movie', JSON.stringify(details))
      navigate("/viewMovie")
    }

    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('user'))
      dispatch(oneUser(user._id))
      if(user){
        if(user.name && user.lastname && user._id){
          setInput({nameUser: user.name, lastname: user.lastname})
        }
      }
      localStorage.setItem('user',JSON.stringify(user))
    },[])

    const handleSubmitImage=()=>{
      if(image===""){
        Swal.fire({
            icon: "error",
            title: "Ohhh!",
            text: "Plis check and complete the fields",
            confirmButtonText: "Ok",
            confirmButtonColor: "#0b132b"
        });
    }else{
        const user = JSON.parse(localStorage.getItem('user'))
        // console.log(user._id)
        dispatch(editUsersImage(image,user._id))
        // console.log(input)
        // console.log(input)
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Successfully changes",
            confirmButtonText: "Ok",
            confirmButtonColor: "#0b132b"
        });
    }
   
    }

    const handleImage=(img)=>{
      setImage(img);
      console.log(image)
    }
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
    }
    const handleClickName = () => {
      setOpenName(!openName);
    };
    const handleClickImage = () => {
      setOpenImage(!openImage);
    };
    const handleClickLastName = () => {
        setOpenLastName(!openLastName);
      };
      // const handleClickPassword = () => {
      //   setOpenPassword(!openPassword);
      // };

      function handleSubmitName(e) {
            if(!input.nameUser || !input.lastname){
                e.preventDefault()
                Swal.fire({
                    icon: "error",
                    title: "Ohhh!",
                    text: "Plis check and complete the fields",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#0b132b"
                });
            }else{
                e.preventDefault()
                const user = JSON.parse(localStorage.getItem('user'))
                // console.log(user._id)
                dispatch(editUsers(input,user._id))
                // console.log(input)
                // console.log(input)
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
                <p className={styles.span}>Profile</p></div>
                <div className={styles.ubButton}><ButtonHome/> </div>
            <div className={css.generalContainer}></div>
            <List
      sx={{ width: '100%',bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Profile settings
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClickName}>
        <ListItemIcon>
          <PersonIcon/>
        </ListItemIcon>
        <ListItemText primary="Edit Name" />
        {openName ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openName} timeout="auto" unmountOnExit>
        <form onSubmit={(e)=>handleSubmitName(e)} className={css.form}>
            <div className={css.containerInputs}>
                    <div>
                        <label>Name: </label>
                        <input 
                            className={css.input}
                            placeholder="Name"
                            type="text" 
                            value={input.nameUser}
                            name="nameUser"
                            required
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Last Name: </label>
                        <input 
                            className={css.input}
                            placeholder="Last Name"
                            type="text" 
                            value={input.lastname}
                            name="lastname"
                            required
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    {/* <input type={"submit"} value={"Create"}/> */}
                    <input className={css.btn} type="submit" value="Save"/>
                </div>
        </form>
      </Collapse>
      <ListItemButton onClick={handleClickImage}>
        <ListItemIcon>
          <ImageIcon/>
        </ListItemIcon>
        <ListItemText primary="Profile Image" />
        {openName ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openImage} timeout="auto" unmountOnExit>
        <FormControl className={css.form}>
          <FormLabel id="demo-radio-buttons-group-label">Images:</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Img1"
            name="radio-buttons-group"
          >
            <FormControlLabel onClick={()=> handleImage("https://res.cloudinary.com/pruebadatos/image/upload/v1663356626/user_c6frby.png")} value="Img1" control={<Radio />} label={<img src="https://res.cloudinary.com/pruebadatos/image/upload/v1663356626/user_c6frby.png" alt="https://res.cloudinary.com/pruebadatos/image/upload/v1663356626/user_c6frby.png" />} />
            <FormControlLabel onClick={()=> handleImage("https://res.cloudinary.com/pruebadatos/image/upload/v1663356225/userDefault_eqk2uh.jpg")} value="Img2" control={<Radio />} label={<img src="https://res.cloudinary.com/pruebadatos/image/upload/v1663356225/userDefault_eqk2uh.jpg" alt="https://res.cloudinary.com/pruebadatos/image/upload/v1663356225/userDefault_eqk2uh.jpg" />} />
            <FormControlLabel onClick={()=> handleImage("https://res.cloudinary.com/pruebadatos/image/upload/v1663356225/userDefault4_eqxjar.jpg")}  value="Img3" control={<Radio />} label={<img src="https://res.cloudinary.com/pruebadatos/image/upload/v1663356225/userDefault4_eqxjar.jpg" alt="https://res.cloudinary.com/pruebadatos/image/upload/v1663356225/userDefault4_eqxjar.jpg" />} />
            <FormControlLabel onClick={()=> handleImage("https://res.cloudinary.com/pruebadatos/image/upload/v1663356225/userDefault3_qghdxi.jpg")} value="Img4" control={<Radio />} label={<img src="https://res.cloudinary.com/pruebadatos/image/upload/v1663356225/userDefault3_qghdxi.jpg" alt="https://res.cloudinary.com/pruebadatos/image/upload/v1663356225/userDefault3_qghdxi.jpg" />} />
            <FormControlLabel onClick={()=> handleImage("https://res.cloudinary.com/pruebadatos/image/upload/v1663356225/userDefault2_pzh0bn.png")} value="Img5" control={<Radio />} label={<img src="https://res.cloudinary.com/pruebadatos/image/upload/v1663356225/userDefault2_pzh0bn.png" alt="https://res.cloudinary.com/pruebadatos/image/upload/v1663356225/userDefault2_pzh0bn.png" />} />
          </RadioGroup>
          <button onClick={()=>handleSubmitImage()} className={css.btn}>Save</button>
        </FormControl>
      </Collapse>
      <ListItemButton onClick={handleClickLastName}>
        <ListItemIcon>
          <PersonIcon/>
        </ListItemIcon>
        <ListItemText primary="My movies" />
        {openLastName ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openLastName} timeout="auto" unmountOnExit>
        <div className={css.contentList}>
          {
            user.buy.length > 0 ? user.buy.map(m => {
              return(
                <div className={css.direction}>
                  <img src={m.image} alt="image" className={css.port} />
                  <p className={css.list}>{m.title}</p>
                  <p className={css.list}>{m.platform}</p>
                  <Link to={`/Details/${m._id}`}>
                    <button className={buton.btn}><BiDetail/> View Details</button>
                  </Link>
                  <button className={buton.btn} onClick={() => handleClick(m._id)} ><FiPlay/> Play</button>
                </div>
              )
            })
            :
            <h2 className={css.text}>No movies</h2>
          }
        </div>
      </Collapse>
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
      
    </List>
    </div>
   
    )
}