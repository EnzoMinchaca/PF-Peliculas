import React from "react";
import { Link } from "react-router-dom";
import CardsAdmin from "./Cards";





export default function AdminModifyMovies() {


    return(
        <div>

         <div>
            <Link to="/Create">Create movies</Link>
         </div>

            <CardsAdmin></CardsAdmin>
            
        </div>
    )
}