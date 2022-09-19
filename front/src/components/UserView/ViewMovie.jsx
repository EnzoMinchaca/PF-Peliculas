import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Header from '../Presentational/header'
import Footer from '../Presentational/footer'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieToView } from '../../redux/Slice/movieSlice'
import { BiDetail } from "react-icons/bi"
import ButtonHome from '../Presentational/ButtonHome'
import buton from "../../styles/Buttons.module.css"
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import s from './ViewMovie.module.css'
import CommentsVM from './CommentsViewMovie'
import { clearComments, getCommentsMovie, getMovies, postComment } from '../../redux/Slice/movieAction'
import Swal from 'sweetalert2'

export default function ViewMovie() {

    const [value, setValue] = useState(1);
    const [comment, setComment] = useState('')
    const [user, setUser] = useState()
    const [flag, setFlag] = useState(false)
    const [isThat, setisThat] = useState(false)
    let movie= useSelector(state => state.movies.movieView)
    // let comments =useSelector(state=> state.movies.commentsMovie)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user === null) {
            navigate("/home")
        }
        setUser(user)
        console.log(user)
        const themovie = JSON.parse(localStorage.getItem('movie'))
        dispatch(getMovieToView(themovie))
    }, [])
    
    // if(Object.entries(comments).length > 0) {
    //     let isComment = comments.allComments.find(e => e.username === user.name)
    //     console.log(isComment)
    //     if(isComment.length > 0) {
    //         setisThat(true)
    //     }
    // }
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setComment(e.target.value)
        // console.log(comment)
    }

    const handleSubmit = (e) => {
        if(comment.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Add a comment to send!',
                showConfirmButton: false,
                timer: 1000
            })
        } else if(isThat) {
            Swal.fire({
                icon: 'error',
                title: 'You already commented on this movie',
                showConfirmButton: false,
                timer: 1000
            })
            } else {
                // e.preventDefault()
                let send = {
                    titleMovie: movie.title,
                    name: user.name,
                    imgProfile: user.image,
                    rating: value * 2,
                    content: comment
                }
                dispatch(postComment(send, movie))
                Swal.fire({
                    icon: 'success',
                    title: 'Comment added!',
                    showConfirmButton: false,
                    timer: 1000
                })
                // dispatch(getMovies())
                dispatch(clearComments())
                setValue(1)
                setComment('')
                setFlag(!flag)
                const themovie = JSON.parse(localStorage.getItem('movie'))
                dispatch(getMovieToView(themovie))
                dispatch(getCommentsMovie(movie.title))
            }
    } 
    // dispatch(getMovies())

  return (
    <div>
        <Header/>
        {
            movie?
        <div className={s.content}>
            <div className={s.btns}>
                <div className={s.btn}>
                    <ButtonHome/>
                </div>
                <NavLink to={`/Details/${movie._id}`} className={s.btn}>
                    <button className={buton.btn}><BiDetail/> View Details</button>
                </NavLink>
            </div>
            <iframe width="1300" height="650" src={movie.trailer}
                title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                className={s.mov}>
            </iframe>
            <div className={s.com}>
                <div className={s.person}>
                    <h2>Add your comment and rate the movie!</h2>
                    <div>
                        <Box component="fieldset" mb={3} borderColor="transparent" marginTop={1}>
                            <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                                // console.log(value)
                                if(newValue === null) {
                                    setValue(1)
                                }
                            }}
                            />
                        </Box>
                    </div>
                    <div className={s.sub}>
                        <textarea className={s.textareaForm} name="comment" onChange={(e)=>handleChange(e) } value={comment} required ></textarea>
                        <button className={s.but} onClick={(e)=>handleSubmit(e)}>Send</button>
                    </div>
                </div>
                    {
                        movie.title?
                        <div  >
                            <CommentsVM titleMovies={movie.title} ></CommentsVM>
                          
                        </div>
                        :
                        <p></p>
                    }
            </div>
        </div>
        :
        <div>
        </div>
        }
        <Footer/>
    </div>
  )
}
