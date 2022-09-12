//Componente que renderizara todos los botones de filtrado y busqueda
import { useSelector } from "react-redux";
import Filter from "../AdmidView/Filter";
import styles from "../../styles/Admin.module.css";
import ButtonHome from "../Presentational/ButtonHome";
import { Link } from "react-router-dom";

function NavHome({
    handleStatusFilter,
}) 

{
  const status = useSelector((state) => state.users.users.status);
  console.log(status)
  return (
    <>
      <ul className={styles.navhome_ul}>
       
        
        

        <li>
        <button className={styles.btnClear} onClick={() => window.location.reload()}> Reload </button>
        
        </li>
        <li>
        <Link to="/panel">
       
        <button className={styles.btnClear}> Back </button></Link>
        
        </li>
        <li>
        <ButtonHome></ButtonHome>
        
        </li>
       
        
      </ul>
      <hr/>
    </>
  );
}

export default NavHome;