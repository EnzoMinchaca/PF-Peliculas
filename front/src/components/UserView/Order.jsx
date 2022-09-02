import React from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import css from "./Order.module.css";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import { filterGenre, getGenres } from "../../redux/Slice/movieAction";

export default function Order() {

  const dispatch = useDispatch();
  let allGenres= useSelector(state => state.movies.genres)
  useEffect(()=>{
    dispatch(getGenres());
  },[dispatch]);
  console.log(allGenres)

  const handleAscRating = () => {
    console.log("Rating Ascendent");
  };

  const handleDesRating = () => {
    console.log("Rating Descendent");
  };

  const handleAscYear = () => {
    console.log("Year Ascendent");
  };

  const handleDesYear = () => {
    console.log("Year Descendent");
  };
  const handleGenre = (e) => {
    dispatch(filterGenre(e.target.innerText))
    console.log(e.target.innerText);
  };

  return (
    <div className={css.content}>
      <List className={css.rating}
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" className={css.red}>
            Order by Rating
          </ListSubheader>
        }
      >
        <ListItemButton className={css.redH}>
          <ListItemText primary="1-5" onClick={() => handleAscRating()} />
        </ListItemButton>
        <ListItemButton className={css.redH}>
          <ListItemText primary="5-1" onClick={() => handleDesRating()} />
        </ListItemButton>
      </List>


<List className={css.year}
sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
component="nav"
aria-labelledby="nested-list-subheader"
subheader={
  <ListSubheader component="div" id="nested-list-subheader" className={css.red}>
    Order by Year
  </ListSubheader>
}
>
<ListItemButton className={css.redH}>
  <ListItemText primary="1900-2022" onClick={()=>handleAscYear()} />
</ListItemButton>
<ListItemButton className={css.redH}>
  <ListItemText primary="2022-1900" onClick={()=>handleDesYear()}/>
</ListItemButton>
</List>

<List className={css.year}
sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
component="nav"
aria-labelledby="nested-list-subheader"
subheader={
  <ListSubheader component="div" id="nested-list-subheader" className={css.red}>
    Order by genres
  </ListSubheader>
}>
  {
    allGenres.length>0?
    allGenres.map(genre=>{
      return <ListItemButton className={css.redH}>
      <ListItemText primary={genre.name} onClick={(genre)=>handleGenre(genre)} />
    </ListItemButton>
    }):
    <p>loading...</p>
  }
</List>
</div>

  );
}