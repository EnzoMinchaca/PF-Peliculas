import { Rating } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { clearComments, deleteComment, getCommentsMovie } from "../../redux/Slice/movieAction";
import './CommentsUserViewM.css'
import Swal from "sweetalert2";


export default function CommentsUserVM({ username, rating, created_at, content, avatar_path, titleMovies }) {

    const [show, setShow] = React.useState(false)
    const dispatch = useDispatch()
    // console.log(titleMovies)
    React.useEffect(() => {
        const theuser = JSON.parse(localStorage.getItem('user'))
        if (theuser.name === username) {
            setShow(true)
        }
        if (theuser.isAdmin) {
            setisAdmin(true)
        }

    }, [])

    const handleClick = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Do you really want to delete your comment?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: "#0b132b"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteComment({
                    titleMovie: titleMovies,
                    name: username,
                    rating: rating,
                    content: content
                }))
                dispatch(clearComments())
                dispatch(getCommentsMovie(titleMovies))
                dispatch(getCommentsMovie(titleMovies))
                dispatch(getCommentsMovie(titleMovies))
                dispatch(getCommentsMovie(titleMovies))
                Swal.fire({
                    icon: 'success',
                    title: 'Comment deleted!',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }

    let date = created_at.slice(0, -14);
    let stars;
    let image;
    // console.log(user)

    if(avatar_path !== null){
        if(avatar_path[0]+ avatar_path[1]+ avatar_path[2]+avatar_path[3]+avatar_path[4] ==='/http'){
            image=avatar_path.slice(1);
           
         }else{
             image='https://us.123rf.com/450wm/alekseyvanin/alekseyvanin1705/alekseyvanin170500978/77418653-usuario-icono-de-cuenta-plana-bot%C3%B3n-redondo-simple-signo-circular-vector-dise%C3%B1o-de-estilo-plano.jpg';
     
         }
    }else{
        image='https://us.123rf.com/450wm/alekseyvanin/alekseyvanin1705/alekseyvanin170500978/77418653-usuario-icono-de-cuenta-plana-bot%C3%B3n-redondo-simple-signo-circular-vector-dise%C3%B1o-de-estilo-plano.jpg';
    }
   
    if(rating===0){
       stars=0
    }else if(rating===1 || rating===2){
        stars=1
    }else if(rating===3 || rating===4){
        stars=2
    }else if(rating===5 || rating===6){
        stars=3
    }else if(rating===7 || rating===8){
        stars=4
    }else if(rating===9 || rating===10){
        stars=5
    }

        return (
            <div class="wrapper">
                <ul>
                    {/* <!-- una vez que se responde a un mensaje --> */}
                    <li>
                        <div class="responde">
                            <div class="box">

                                <img src={image} />

                                <article>
                                    <div class="head">
                                        <h6>User {username} <Rating name="read-only" size="small" value={stars} readOnly ></Rating></h6>
                                        <a>{date}</a>

                                    </div>
                                    <p class="cont">{content}.</p>
                                    <div class="bt">
                                        {
                                            show || isAdmin ?
                                                <button onClick={(e) => handleClick(e)} class="butn">Delete</button>
                                                :
                                                null
                                        }
                                    </div>
                                </article>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        )
    }
}