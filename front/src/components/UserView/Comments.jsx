import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearComments, getCommentsMovie } from "../../redux/Slice/movieAction";
import './Comments.css'
import CommentsUser from "./CommentsUser";


export default function Comments ({titleMovies}) {
 
    let comments =useSelector(state=> state.movies.commentsMovie)
   
    console.log(comments)
 const dispatch= useDispatch();
  useEffect(() => {
    if(titleMovies){
      dispatch(getCommentsMovie(titleMovies))
    }
    return() => {dispatch(clearComments())}
  }, [])
    return(
        
         <scroll-container>
            {
                Object.keys(comments).length>0?
                comments.allComments.map(comment =>{
                    return(
                        <scroll-page id={`page${comments.allComments.indexOf(comment)}`}> <CommentsUser username={comment.username} rating={comment.rating} created_at
                            ={comment.created_at} content={comment.content} avatar_path={comment.avatar_path}></CommentsUser>
                        </scroll-page>
                    )
                }):
                null
            }
        </scroll-container>
       
    )
};