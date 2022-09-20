import { Rating } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsMovie } from "../../redux/Slice/movieAction";
import './CommentsUser.css'


export default function CommentsUser ({username, rating, created_at, content, avatar_path}) {
 
    let date= created_at.slice(0, -14);
    let stars;
    let image;
    if(avatar_path !== null){
        if(avatar_path[0]+ avatar_path[1]+ avatar_path[2]+avatar_path[3]+avatar_path[4] ==='/http'){
            image=avatar_path.slice(1);
           
        }else if(avatar_path[0]+ avatar_path[1]+ avatar_path[2]+avatar_path[3] ==='http'){
            image=avatar_path;
        } 
        else{
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

    return(
       

          <div class="wrapperd">
          <ul>
              {/* <!-- una vez que se responde a un mensaje --> */}
             <li>
                 <div class="responded">
                   <div class="boxd">
                                                        
                      <img src={image}/>
                
                      <article>
                      <div class="headd">
                        <h6>User {username} <Rating  name="read-only" size="small" value={stars} readOnly ></Rating></h6>
                        <a>{date}</a>
                        
                      </div>
                      <p>{content}.</p>
                      </article>
                   </div>
                 </div>
             </li>
          </ul>
            </div>
     
    )
};