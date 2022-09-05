import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Buttons.module.css";
import { FiHome } from "react-icons/fi" 

const ButtonHome = () => {
  return (
    <div>
      <Link to="/Home">
        {" "}
        <button className={styles.btn}><FiHome/>  Home </button>
      </Link>
 
    </div>
  );
};

export default ButtonHome;