import React from "react";
import Helmet from "react-helmet";
import logoInicio from './logo-inicio.svg'
import './App.css'

const PaginaInicio=()=>{
    return(
        <>
         <Helmet>
            <title>Inicio</title>
        </Helmet>
        <img class="logo_inicio" src={logoInicio}/>
        </>
       
        
    )
}
export default PaginaInicio;