import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { clearDetails, clearGenres, getGenres, getMovieById, getMovies, getPlatform, modifyMovies} from "../../redux/Slice/movieAction";
import Swal from "sweetalert2";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import Header from "../Presentational/header";
import Footer from "../Presentational/footer";
import s from './Form.module.css'

export default function ModifyMovies() {
    
    const dispatch = useDispatch();

    const movie = useSelector((state) => state.movies.movie)
    const { id } = useParams()
   
    const rat = [1, 2, 3, 4, 5]
    const year = []
    function years() {
        for(let i = 1900; i<=2022; i++) {
            year.push(i)
        }
    }
    years()

    
    const genres = useSelector(state => state.movies.genres)
    const platform = useSelector(state => state.movies.platform)
    const [input, setInput] = useState({
        id:id,
        title: "",
        date: "",
        description: "",
        rating: "",
        platform: "",
        image: "",
        durationView: "",
        duration: "",
        castName: "",
        cast: [],
        director: "",
        trailer: "",
        genres: [],
        price: 0
    })

    useEffect(() => {
        dispatch(getMovieById(id))
        dispatch(getGenres())
        dispatch(getPlatform())
        return() => {
            dispatch(clearGenres())
            dispatch(clearDetails())
        }
    }, [dispatch])
    console.log(input)
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSelectPlatform(e) {
        if(e.target.value !== "Select...") {
            setInput({
                ...input,
                platform: e.target.value
            })
        }
    }

    function handleChangeDuration(e) {
        let value = e.target.value
        let hours = value.split("").slice(0,2).join("")
        let minutes = value.split("").slice(3).join("")
        let union = hours + "h " + minutes + "min"
        let view = union.charAt(0) === "0" ? union.split("").slice(1).join("") : union
        setInput({
            ...input,
            duration: view,
            durationView: value
        })
    }

    function addCast(e) {
        if(input.castName.length > 0) {
            setInput({
                ...input,
                cast: [...input.cast, input.castName],
                castName: ""
            })
        }
        e.preventDefault()
    }

    function handleDeleteCast(option) {
        setInput({
            ...input,
            cast: input.cast.filter(c => c !== option)
        })
    }

    function handleChangeGenre(e) {
        if(e.target.value !== "Select...") {
            if(!input.genres.includes(e.target.value)) {
                setInput({
                    ...input,
                    genres: [...input.genres, e.target.value]
                })
            }
        }
    }

    function handleDeleteGenre(option) {
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== option)
        })
    }

    function checkUrlImage(image) {
        let checkType = image.split("").reverse().slice(0, 3).join("")
        // let checkUrl = image.split("").slice(0, 5).join("")
        console.log(checkType)       
        if(checkType === "gpj" || checkType === "gnp") {
            return false
        } else {
            return true
        }
    }

    function checkName(title) {
        if(title.length > 50) {
            return true
        } else {
            return false
        }
    }

    function handleSubmit(e) {
      if(input.image){
         if(checkUrlImage(input.image)) {
             console.log("no funka")
             e.preventDefault()
             Swal.fire({
                 icon: "error",
                 title: "Ohhh!",
                 text: "Plis check the format of URL Image",
                 confirmButtonText: "Ok",
                 confirmButtonColor: "#0b132b"
             });
         }
      }
    
     if(checkName(input.title)) {
      console.log("tampoco funka")
      e.preventDefault()
      Swal.fire({
         icon: "error",
         title: "Ohhh!",
         text: "The title can't have more than 50 characters",
         confirmButtonText: "Ok",
         confirmButtonColor: "#0b132b"
      });
     }
    
            e.preventDefault()
            dispatch(modifyMovies(input))
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Successfully modify movie",
                confirmButtonText: "Ok",
                confirmButtonColor: "#0b132b"
            });
            setInput({
                id:id,
                title: "",
                date: "",
                description: "",
                rating: "",
                platform: "",
                image: "",
                durationView: "",
                duration: "",
                castName: "",
                cast: [],
                director: "",
                trailer: "",
                genres: [],
                price: 0
            })
            dispatch(getMovies())
            dispatch(getGenres())
            dispatch(getPlatform())
            dispatch(getMovieById(id))
    }

    return (
        <div className={s.content}>
            <div className={s.link}>
                <NavLink to="/modifyMovies" key={"modifyMovies"} className={s.text}>
                    Back
                </NavLink>
            </div>
            <div className={s.all}>
                <form onSubmit={(e) => handleSubmit(e)} className={s.modifyForm}>
                    <h2>Modify Movie</h2>
                    <div className={s.containerInputs}>
                        <div className={s.order}>
                            <label>Title: </label>
                            <input 
                                className={s.input}
                                
                                type="text" 
                                defaultValue={movie.title}
                                name="title"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className={s.order}>
                            <label> Date: </label>
                            <select onChange={(e) => handleChange(e)}  name="date" defaultValue={`${movie.date}`} className={s.select}>
                                {
                                    year?.map((y, i) => {
                                        return(
                                            <option selected={y===movie.date? `${movie.date}` : '' } value={y} key={i}>{y}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label>Description: </label>
                            <textarea 
                                className={s.textareaForm}
        
                                type="text" 
                                defaultValue={movie.description}
                                name="description"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className={s.order}>
                            <label> Rating: </label>
                            <select onChange={(e) => handleChange(e)} defaultValue={`${movie.rating}`} name="rating" className={s.select}>
                                {
                                    rat?.map((r, i) => {
                                        return(
                                            <option selected={r===movie.rating? `${movie.rating}` : '' } value={r} key={i}>{r}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className={s.order}>
                            <label>Platform: </label>
                            <select onChange={(e) => handleSelectPlatform(e)} defaultValue={`${movie.platform}`} name="platform" className={s.select}>
                               
                                {
                                    platform?.map(p => {
                                        return(
                                            <option selected={p.name===movie.platform? `${movie.platform}` : '' } value={p.name} key={p._id}>{p.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className={s.order}>
                            <label>Duration (hours:minutes): {`(actual ${movie.duration})`} </label>
                            <input
                                className={s.select} 
                                type="time" 
                                name="duration"
                                defaultValue={""}
                                value={input.durationView}
                                onChange={(e) => handleChangeDuration(e)}
                            />
                        </div>
                        <div>
                            <label>URL Image: </label>
                            <input
                                className={s.input}
                                
                                type="text" 
                                defaultValue={movie.image}
                                name="image"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <label>Casting: </label>
                            <input 
                                className={s.input}
                                type="text" 
                               
                                defaultValue={movie.cast}
                                name="castName"
                                onChange={(e) => handleChange(e)}
                            />
                            <button onClick={(e) => addCast(e)} className={s.add}>Add</button>
                            <div className={s.cast}>
                                {
                                    input.cast?.map(name => {
                                        return(
                                            <p onClick={() => handleDeleteCast(name)} className={s.p}>{name}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div>
                            <label>Director: </label>
                            <input 
                                className={s.input}
                                
                                type="text" 
                                defaultValue={movie.director}
                                name="director"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <label>Trailer: </label>
                            <input 
                                className={s.input}
                                
                                type="text" 
                                defaultValue={movie.trailer}
                                name="trailer"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className={s.order}>
                            <label>Genres: {`(actuals ${movie.genres})`}</label>
                            <select onChange={(e) => handleChangeGenre(e)} name="genres" className={s.select}>
                                <option selected>Select...</option>
                                {
                                    genres?.map(g => {
                                        return(
                                            <option value={g.name} key={g._id} className={s.option}>{g.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className={s.cast}>
                                {
                                    input.genres?.map(genre => {
                                        return(
                                            <p onClick={() => handleDeleteGenre(genre)} className={s.p}>{genre}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={s.order}>
                            <label>Price: {`(actual value ${movie.price})`}</label>
                            <input 
                                className={s.select}
                                type="number" 
                                name="price"
                                step={"0.01"}
                                min={0}
                                value={input.price}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        {/* <input type={"submit"} value={"Create"}/> */}
                        <button className={s.btn}>Modify</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}