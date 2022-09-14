import React from "react";
import styles from "../../styles/styles.module.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillFacebook, AiFillTwitterSquare, AiFillYoutube } from "react-icons/ai";


const Footer = () => {
  return (
    <div className={styles.piePagina}>
            <div className={styles.grupo1}>
            <div className={styles.box}>
                <figure>  
                <a href="#">
                        <img src={require("../../img/rollo.png")} alt="HMovies"/>
                    </a>  
                </figure>
            </div>
            <div className={styles.box}>
                <h2>Support</h2>
                <p><BsFillTelephoneFill/> 0800-HMOVIE</p>
                <h2>Location</h2>
                <p>Buenos Aires, Argentina</p>
            </div>
            <div className={styles.box}>
                <h2>Follow us</h2>
                

                <div className={styles.redSocial}>
                <a><AiFillFacebook classname={styles.fafaFacebook}/></a>
                <a><AiFillTwitterSquare/></a>
                <a><AiFillYoutube/></a>
                </div>
            </div>
        </div>
        <div className={styles.grupo2}>
            <small>&copy; 2022 <b>Group Nro. 9  </b> Henry- All rights reserved.</small>
        </div>
        </div>
  );
};

export default Footer;