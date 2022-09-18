import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Header from '../Presentational/header'
import Footer from '../Presentational/footer'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieToView } from '../../redux/Slice/movieSlice'
import { BiDetail } from "react-icons/bi"
import ButtonHome from '../Presentational/ButtonHome'
import buton from "../../styles/Buttons.module.css"
import s from './ViewMovie.module.css'
import CommentsVM from './CommentsViewMovie'


export default function ViewMovie() {

    const rat = [1, 2, 3, 4, 5]
   
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user === null) {
            console.log(user)
            navigate("/home")
        }
        const themovie = JSON.parse(localStorage.getItem('movie'))
        dispatch(getMovieToView(themovie))
    }, [])

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const movie = useSelector((state) => state.movies.movieView)
    console.log(movie)
    

  return (
    <div>
        <Header/>
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
                title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
            </iframe>
            <div className={s.com}>
            <h3 className={s.comments} >Comments</h3> 
                <div >
                     <h2>Add your comment!</h2> 
                   <textarea className={s.textareaForm} ></textarea> 
                    
                    <button>Send</button>
                </div>
                <div>
                    <label> Rate the movie!: </label>
                    <select>
                        {
                            rat?.map((r, i) => {
                                return(
                                    <option value={r} key={i}>{r}</option>
                                )
                            })
                        }
                    </select>
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
            
            {/* <video src={movie.trailer} controls ></video> */}
        </div>
        <Footer/>
    </div>
  )
}
