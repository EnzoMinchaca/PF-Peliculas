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
import { filterGenre, getGenres, sortRatings, sortYears } from "../../redux/Slice/movieAction";

export default function Order() {

  const dispatch = useDispatch();
  let allGenres= useSelector(state => state.movies.genres)
  useEffect(()=>{
    dispatch(getGenres());
  },[dispatch]);
  console.log(allGenres)

  const handleAscRating = (type) => {
    dispatch(sortRatings(type));
  };

  const handleDesRating = (type) => {
    dispatch(sortRatings(type));
  };

  const handleAscYear = (type) => {
    dispatch(sortYears(type));
  };

  const handleDesYear = (type) => {
    dispatch(sortYears(type));
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
        <ListItemButton className={css.redH} onClick={() => handleAscRating("1-5")}>
          <ListItemText primary="1-5" />
        </ListItemButton>
        <ListItemButton className={css.redH} onClick={() => handleDesRating("5-1")}>
          <ListItemText primary="5-1"/>
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
<ListItemButton className={css.redH} onClick={()=>handleAscYear("1900-2022")}>
  <ListItemText primary="1900-2022"  />
</ListItemButton>
<ListItemButton className={css.redH} onClick={()=>handleDesYear("2022-1900")}>
  <ListItemText primary="2022-1900"/>
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
      return <ListItemButton className={css.redH} onClick={(genre)=>handleGenre(genre)}>
      <ListItemText primary={genre.name}  />
    </ListItemButton>
    }):
    <p>loading...</p>
  }
</List>
</div>

  );
}