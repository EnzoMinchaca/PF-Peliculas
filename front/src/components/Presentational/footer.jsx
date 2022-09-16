import React from "react";
import styles from "../../styles/styles.module.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillFacebook, AiFillTwitterSquare, AiFillYoutube } from "react-icons/ai";
import { Link } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';


const Footer = () => {
    return (
        <div className={styles.piePagina}>
            <div className={styles.grupo1}>
                <div className={styles.box}>
                    <figure>
                        <a href="#">
                            <img src={require("../../img/rollo.png")} alt="HMovies" />
                        </a>
                    </figure>
                </div>
                <div className={styles.box}>
                    <Link to="/FreqQuestions"><h2><ContactSupportIcon />  Frequent Questions</h2></Link>
                    <Link to="/AboutUs"><h2><InfoIcon />  About Us</h2></Link>
                    <p><BsFillTelephoneFill /> 0800-HMOVIE</p>
                    <p>Location <br />Buenos Aires, Argentina</p>
                </div>
                <div className={styles.box}>
                    <h2><AutoAwesomeIcon/>Follow Us</h2>


                    <div className={styles.redSocial}>
                        <a  href="https://www.facebook.com"><AiFillFacebook classname={styles.fafaFacebook} /></a>
                        <a  href="https://www.twitter.com"><AiFillTwitterSquare /></a>
                        <a  href="https://www.youtube.com"><AiFillYoutube /></a>
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