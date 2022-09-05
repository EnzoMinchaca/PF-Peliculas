import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearGenres, getGenres, getMovies, getPlatform, postMovies } from "../../redux/Slice/movieAction";
import Swal from "sweetalert2";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import Header from "../Presentational/header";
import Footer from "../Presentational/footer";
import s from './Form.module.css'

export default function Form() {

    const rat = [1, 2, 3, 4, 5]
    const year = []
    function years() {
        for(let i = 1900; i<=2022; i++) {
            year.push(i)
        }
    }
    years()

    const dispatch = useDispatch()
    const genres = useSelector(state => state.movies.genres)
    const platform = useSelector(state => state.movies.platform)
    const [input, setInput] = useState({
        title: "",
        date: 2022,
        description: "",
        rating: 1,
        platform: "",
        image: "",
        durationView: "00:00",
        duration: "00:00",
        castName: "",
        cast: [],
        director: "",
        trailer: "",
        genres: [],
        price: 0
    })

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatform())
        return() => {dispatch(clearGenres())}
    }, [dispatch])
    // console.log(genres)
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
    }

    function handleSelectPlatform(e) {
        if(e.target.value !== "Select...") {
            setInput({
                ...input,
                platform: e.target.value
            })
        }
        console.log(input)
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
        console.log(input)
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
        console.log(input)
    }

    function handleDeleteCast(option) {
        setInput({
            ...input,
            cast: input.cast.filter(c => c !== option)
        })
        console.log(input)
    }

    function handleChangeGenre(e) {
        if(e.target.value !== "Select...") {
            if(!input.genres.includes(e.target.value)) {
                setInput({
                    ...input,
                    genres: [...input.genres, e.target.value]
                })
            }
            console.log(input)
        }
    }

    function handleDeleteGenre(option) {
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== option)
        })
        console.log(input)
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
        if(!input.title || !input.description || !input.platform || !input.image || !input.director || !input.trailer || input.duration === "00:00" || input.cast.length === 0 || input.genres === 0 || input.price === 0) {
            e.preventDefault()
            Swal.fire({
                icon: "error",
                title: "Ohhh!",
                text: "Plis check and complete the field with *",
                confirmButtonText: "Ok",
                confirmButtonColor: "#0b132b"
            });
            console.log("error")
        } 
        else if(checkUrlImage(input.image)) {
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
        else if(checkName(input.title)) {
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

        else {
            e.preventDefault()
            console.log(input)
            dispatch(postMovies({
                title: input.title,
                date: input.date,
                description: input.description,
                rating: input.rating,
                platform: input.platform,
                image: input.image,
                duration: input.duration,
                cast: input.cast,
                director: input.director,
                trailer: input.trailer,
                genres: input.genres,
                price: input.price
            }))
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Successfully created movie",
                confirmButtonText: "Ok",
                confirmButtonColor: "#0b132b"
            });
            setInput({
                title: "",
                date: 2022,
                description: "",
                rating: 1,
                platform: "",
                image: "",
                durationView: "00:00",
                duration: "00:00",
                castName: "",
                cast: [],
                director: "",
                trailer: "",
                genres: [],
                price: 0
            })
            dispatch(getGenres())
            dispatch(getPlatform())
            dispatch(getMovies())
        }
    }

    return (
        <div className={s.content}>
            <Header/>
            <div className={s.link}>
                <NavLink to="/Home" key={"Home"} className={s.text}>
                    Back
                </NavLink>
            </div>
            <div className={s.all}>
                <form onSubmit={(e) => handleSubmit(e)} className={s.form}>
                    <h2>Create Movie</h2>
                    <div className={s.containerInputs}>
                        <div>
                            <label>*Title: </label>
                            <input 
                                className={s.input}
                                placeholder="Movie's title"
                                type="text" 
                                value={input.title}
                                name="title"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className={s.order}>
                            <label> Date: </label>
                            <select onChange={(e) => handleChange(e)} defaultValue={2022} name="date" value={input.date} className={s.select}>
                                {
                                    year?.map((y, i) => {
                                        return(
                                            <option value={y} key={i}>{y}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label>*Description: </label>
                            <input 
                                className={s.input}
                                placeholder="Movie's description"
                                type="text" 
                                value={input.description}
                                name="description"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className={s.order}>
                            <label> Rating: </label>
                            <select onChange={(e) => handleChange(e)} defaultValue={1} name="rating" value={input.rating} className={s.select}>
                                {
                                    rat?.map((r, i) => {
                                        return(
                                            <option value={r} key={i}>{r}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className={s.order}>
                            <label>*Platform: </label>
                            <select onChange={(e) => handleSelectPlatform(e)} name="platform" className={s.select}>
                                <option selected>Select...</option>
                                {
                                    platform?.map(p => {
                                        return(
                                            <option value={p.name} key={p._id}>{p.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className={s.order}>
                            <label>*Duration (hours:minutes): </label>
                            <input
                                className={s.select} 
                                type="time" 
                                name="duration"
                                defaultValue={"00:00"}
                                value={input.durationView}
                                onChange={(e) => handleChangeDuration(e)}
                            />
                        </div>
                        <div>
                            <label>*URL Image: </label>
                            <input
                                className={s.input}
                                placeholder="http/https:.................jpg/png" 
                                type="text" 
                                value={input.image}
                                name="image"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <label>*Casting: </label>
                            <input 
                                className={s.input}
                                type="text" 
                                placeholder="Introduce a name and add"
                                value={input.castName}
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
                            <label>*Director: </label>
                            <input 
                                className={s.input}
                                placeholder="Director's name"
                                type="text" 
                                value={input.director}
                                name="director"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <label>*Trailer: </label>
                            <input 
                                className={s.input}
                                placeholder="<iframe..................></iframe>"
                                type="text" 
                                value={input.trailer}
                                name="trailer"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className={s.order}>
                            <label>*Genres: </label>
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
                            <label>*Price: </label>
                            <input 
                                className={s.select}
                                type="number" 
                                name="price"
                                step={"0.01"}
                                min={0}
                                defaultValue={0}
                                value={input.price}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        {/* <input type={"submit"} value={"Create"}/> */}
                        <button className={s.btn}>Create</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}