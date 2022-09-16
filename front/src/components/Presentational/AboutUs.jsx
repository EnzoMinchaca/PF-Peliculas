import React from 'react'
import Style from "./AboutUs.module.css"
import Footer from './footer'
import Header from './header'
import InfoIcon from '@mui/icons-material/Info';
import ButtonHome from "./ButtonHome"
import styles from "../../styles/styles.module.css"


const AboutUs = () => {
  return (
    <div>
      <Header />
      <div className={styles.ubButton}><ButtonHome /> </div>
      <div className={Style.card}>
        <div className={Style.icon}>
            <InfoIcon/>
        </div>
        <strong> Sobre Nosotros
        </strong>
        <div className={Style.cardBody}>
          Tocame para saber mas!
        </div>
        <span>Hola!, Esta es una pagina de muestra y sin fines de lucro, en la cual ofrecemos servicios de venta de peliculas de multiplataforma
          por unidad, sin nesecidad de una subscripcion, tenemos catalogos de Netflix, Amazon Prime Video, DisneyPlus, HBOMax y Paramount.
        </span>
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs