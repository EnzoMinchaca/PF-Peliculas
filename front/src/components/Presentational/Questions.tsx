import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Header from './header';
import ButtonHome from "./ButtonHome"
import Style from "./Questions.module.css"
import styles from "../../styles/styles.module.css"
import Footer from './footer';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
        <Header/>
        <div className={styles.ubButton}><ButtonHome /> </div>
        <div className={Style.back}><img src="https://media0.giphy.com/media/IdgOIVyE5jy6vPaLBM/giphy.gif?cid=6c09b952coe78c6a9vpb53z8oc8d0abu9b6i19pzjiqzve7u&rid=giphy.gif&ct=s"></img></div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Precio</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <font color="green">¿El precio que figura en la web es el precio final?</font>
            <p>Todos los precios en la web incluyen el IVA, y se encuentran expresados en dolares Americanos.</p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Formas de pago</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <font color="green" >¿Cuáles son las formas de pago?</font>
          <p>Contamos con dos formas de pago: a través de depósito/transferencia bancaria via Pay pay, con la cual obtenés el precio especial, o bien, a través de los métodos Pago o MercadoPago con los cuales podés abonar en cuotas, al precio de lista.</p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Facturación</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <font color="green">¿Cómo tramito la factura de mi compra?</font>
            <p>En todas las compras efectuadas en la web, brindamos sin excepción alguna, la factura de compra. Una vez que realiza y abona el pedido, enviamos a tu dirección de correo electrónico la factura correspondiente.</p> 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Garantías</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <font color="green">¿Cómo utilizo el servicio de PosVenta y garantías?</font> 
            <p>Para realizar consultas/reclamos relacionadas con la garantía o devolución de alguna de tus compras, al final de esta sección contamos con el apartado “Compra Hmovie te ayuda. ¿Cuál es tu consulta?” donde debes exponer tu caso, seleccionando el motivo de “Posventa” que se adapte a tu requerimiento y uno de nuestros representantes te ofrecerá la información correspondiente sobre cómo proceder.</p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Footer/>
    </div>
  );
}
