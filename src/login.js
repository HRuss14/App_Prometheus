import React from "react";
import Helmet from "react-helmet";
import logoGrande from './Logo_Grande.svg'
import Boton from "./elementos/Boton";
import './App.css';

const InicioSesion = () =>{
    return(
    <>
        <Helmet>
            <title>Inicio Sesión</title>
        </Helmet>
        <img class="logo_grande" src={logoGrande} style={{marginTop:'90px'}}/>
        <form style={{ position:'absolute', marginTop:'520px', alignItems:'center'}} >
            <input class="inputs"style={{display:'flex',alignItems:'flex-start', padding:'8px 12px', width:'471px',height:'40px', background:'#ffffff'}} 
            type="email" placeholder="Correo"></input>
            <br></br>
            <input class="inputs" style={{ marginTop:'40px',display:'flex',alignItems:'flex-start', padding:'8px 12px', width:'471px',height:'40px', background:'#ffffff'}}
            type="password" placeholder="Contraseña"></input>

       <button as="button"  class="botInicio" primario type="submit">Iniciar Sesión</button>
        
       <label class="textRegistro">¿Aun no tienes cuenta?</label>
        <Boton to="/registro" class="botRegistro">Registrate</Boton>
        </form>
    </>
    );
}
export default InicioSesion;
