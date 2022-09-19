import React from 'react'
import Style from "./AboutUs.module.css"
import Footer from './footer'
import Header from './header'
import InfoIcon from '@mui/icons-material/Info';
import styles from "../../styles/styles.module.css"
import { Link } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const AboutUs = () => {
  return (
    <div>

      <Header />
      <Link to="/Home">
        <div className={Style.card}>
          <div className={Style.icon}>
            <InfoIcon />
          </div>
          <strong> Sobre Nosotros
          </strong>
          <div className={Style.cardBody}>
            Tocame para saber mas!
          </div>
          <span>Hola!, Esta es una página de muestra sin fines de lucro, que ofrece servicios de venta de películas por unidad de multiplataforma como:
            <br></br>Netflix, Amazon Prime Video, DisneyPlus, HBOMax y Paramount sin  subscripción.           
          </span>
        </div>
      </Link>
      <Footer />

    </div>
  )
}

export default AboutUs