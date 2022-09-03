import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Landing.module.css";;

function LandingPage() {
  return (
    <div className={styles.background}>
      <Link to="/Home">
        <div className={styles.homeBtn}></div>
        <button className={styles.button}>HOME</button>
        <span className={styles.home_span}>HMovies</span>
      </Link>
        <h1></h1>
    </div>
  );
}

export default LandingPage;