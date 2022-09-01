import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import css from "./Card.module.css";
import { Link } from "react-router-dom";

export default function CardIndividual(props){
    return(
    //     <Card sx={{ maxWidth: 345 }} className={props.platform.toLowerCase()==="amazon" ? css.amazon :
    //     props.platform.toLowerCase()==="netflix" ? css.netflix:
    //     props.platform.toLowerCase()==="disney+" ? css.disney:
    //     props.platform.toLowerCase()==="hbo" ? css.hbo: css.paramount}>
    //     <CardActionArea>
    //       <CardMedia
    //         component="img"
    //         image={props.image}
    //         alt={props.title}
    //         className={css.image}
    //       />
    //       <CardContent>
    //         <Typography gutterBottom variant="h5" component="div">
    //           {props.title}
    //         </Typography>
    //         <Typography variant="body2">
    //            || {props.genres?.map((genre)=>{
    //             return ` ${genre} ||`
    //           })}
    //         </Typography>
    //       </CardContent>
    //     </CardActionArea>
    //   </Card>


//////////////////////////////////////////////////////////////////////////////
    <Link to={`/Details/${props.id}`}>
    <div className={props.platform.toLowerCase()==="amazon" ? css.cardA :
                  props.platform.toLowerCase()==="netflix" ? css.cardN:
                  props.platform.toLowerCase()==="disney+" ? css.cardD:
                  props.platform.toLowerCase()==="hbomax" ? css.cardH: css.cardP}>
    <div className={css.blob}></div>
      <span className={css.image}><img src={props.image} className={css.img}/></span>
      <h2 className={css.title}><span>{props.title}</span></h2>
      <p className={css.flex}>
       {props.genres?.map(genre=>{
        return (<p className={css.icon}>
        | {genre} |
      </p>)
      })}
      </p>
    </div>
    </Link>

    //////////////////////////////////////////////////////////////////////////////

//     <div className={props.platform.toLowerCase()==="amazon" ? css.cardA :
//            props.platform.toLowerCase()==="netflix" ? css.cardN:
//            props.platform.toLowerCase()==="disney+" ? css.cardD:
//            props.platform.toLowerCase()==="hbo" ? css.cardH: css.cardP}>
//   <div className={css.img}>
//     <img src={props.image} alt={props.image} className={css.image}/>
//   </div>
//   <h1>{props.title}</h1>
//   <p>
//     |{props.genres?.map(genre=>{
//         return ` ${genre} |`
//     })}
//   </p>
// </div>
    )
}