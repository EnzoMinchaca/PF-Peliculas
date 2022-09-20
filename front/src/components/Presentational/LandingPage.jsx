import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Landing.module.css";;

function LandingPage() {
  return (
    <div className={styles.background}>
      <Link to="/Home">
        <div className={styles.homeBtn}></div>
        <span className={styles.home_span2}>Enjoy the best movies!</span>
        <span className={styles.home_span}>HMovies</span>
      </Link>
        <h1></h1>
        <div className={styles.containerImg}>
          <div className={styles.cara}>
            <span className={styles.cara1}></span>
            
          </div>
          <div className={styles.cara}>
          <span className={styles.cara2}></span>
           
          </div>
        </div>
    </div>
  );
}

export default LandingPage;