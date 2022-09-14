import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { getMovies, getSearch } from "../../redux/Slice/movieAction";
import CardAdmin from "./Card";
import './AdminModify.css';

import styles from "../../styles/Admin.module.css"
import { BsFillHouseDoorFill} from "react-icons/bs";
import { AiFillLeftSquare } from "react-icons/ai";
import { Link } from "react-router-dom";


export default function AdminModifyMovies() {


    const navigate = useNavigate()
    const [isUser, setisUser] = useState(true)

    const dispatch=useDispatch()
    const movies=useSelector(state=>state.movies.movies)

   
       React.useEffect(()=>{
         dispatch(getMovies())
         const user = JSON.parse(localStorage.getItem('user'))
        if(user === null) {
            console.log(user)
            // setisUser(true)
            navigate("/home")
        }
        if(user) {
            const flag = user.isUser ? true : false
            // setisUser(true)
            if(flag) {
                navigate("/home")
            }
        }
        setisUser(false)
       },[])


    return(
        <div>
          <div className={styles.title1}>
           <p className={styles.span1}>Admin Panel - View Movies</p>
           <div className={styles.home} >
            <Link to="/Home">   
               <BsFillHouseDoorFill className={styles.icon}/> 
            </Link>
            </div>
            <div className={styles.home1}><Link to="/panel"><AiFillLeftSquare className={styles.icon2}/></Link></div>
          </div>

                      <CardAdmin/>
            
           
        </div>
    )

}