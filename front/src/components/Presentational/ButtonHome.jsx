import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Buttons.module.css";

const ButtonHome = () => {
  return (
    <div>
      <Link to="/Home">
        {" "}
        <button className={styles.btn}> Back to Home</button>
      </Link>
 
    </div>
  );
};

export default ButtonHome;