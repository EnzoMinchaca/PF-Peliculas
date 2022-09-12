import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardsUser from "./visPrueba";
import Header from "../Presentational/header";
import Footer from "../Presentational/footer";
import styles from "../../styles/styles.module.css";
import { filterStatus} from "../AdmidView/Filter";
import { useDispatch, useSelector } from "react-redux";
import { filterBStatus, allUsers } from "../../redux/Slice/userAction";
import NavHome from "../AdmidView/NavBar";

import Pagination, { objIndexPagination } from "../AdmidView/Pagination";



export default function AdminModifyUser() {

    const dispatch = useDispatch();
    const [ setOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1); 
    const users=useSelector(state=>state.users.users);
    const quantityXPage = 6; 

      //Paginado
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const { lastItemIndex, firstItemIndex } = objIndexPagination(
    currentPage,
    quantityXPage
  );
 

    const handleStatusFilter = (status) => {
        dispatch(filterBStatus(status));
        setOrder(status);
        setCurrentPage(1);
      };


    return(
        <div>
            <Header></Header>
            <div className={styles.title}>
                <p className={styles.span}> Admin Panel -- Users</p>
            </div>
           
            <NavHome 
            handleStatusFilter={handleStatusFilter}/>
          
            <CardsUser
            lastItemIndex={lastItemIndex}
            firstItemIndex={firstItemIndex}/>

            <Pagination
            items={users}
            quantityXPage={quantityXPage}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />

          <Footer></Footer>
            
            
            
            
        </div>
    )
}