import React from 'react'
import Style from "./AboutUs.module.css"
import Footer from './footer'
import Header from './header'
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';


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
          <span>Hola!, Esta es una pagina de muestra y sin fines de lucro, en la cual ofrecemos servicios de venta de peliculas de multiplataforma
            por unidad, sin nesecidad de una subscripcion, tenemos catalogos de Netflix, Amazon Prime Video, DisneyPlus, HBOMax y Paramount.
          </span>
        </div>
      </Link>
      <Footer />
    </div>
  )
}

export default AboutUs