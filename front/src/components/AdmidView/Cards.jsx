import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../redux/Slice/movieAction";
import CardAdmin from "./Card";


export default function CardsAdmin(){
    const dispatch=useDispatch();
    const movies=useSelector(state=>state.movies.movies)
  
       React.useEffect(()=>{
         dispatch(getMovies())
       },[])
      return (
          
          <div>
             {movies.length? movies.map((movie)=>{
                  return (
                    
                      <CardAdmin
                      key={movie.id}
                      title={movie.title}
                      image={movie.image}
                      price={movie.price}
                      genres={movie.genres}
                      platform={movie.platform}
                      id={movie._id}/>
    
                )
              }):null}
          </div>
       
      )
  }