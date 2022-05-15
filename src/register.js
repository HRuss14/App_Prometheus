import React from "react";
import Helmet from "react-helmet";
import logoRegistro from './Logo_Registro.svg'
import './App.css';
const Registro=()=>{
    return(
        <>
        <Helmet>
            <title>Registro</title>
        </Helmet>
        <img class="logo_grande" src={logoRegistro} style={{marginTop:'0px'}}/>
        <div style={{ position:'absolute', marginTop:'370px', alignItems:'center'}} >
            <input class="inputs"style={{display:'flex',alignItems:'flex-start', padding:'8px 12px', width:'471px',height:'40px', background:'#ffffff'}} 
            type="email" placeholder="Correo*" required></input>
            <br></br>
            <select id="genP"class="inputs" style={{alignItems:'center', padding:'8px 12px', width:'220px',height:'40px', background:'#ffffff'}}>
                <option value="" disabled selected>Género</option>
                <option value="H">Hombre</option>
                <option value="M">Mujer</option>
            </select>
            <input class="inputs" style={{marginTop:'40px',alignItems:'flex-start', padding:'8px 12px', width:'220px',height:'40px', background:'#ffffff', marginLeft:'31px'}}
             type="tel" placeholder="Teléfono*" pattern="[0-11]{9}" required></input>
            <br></br>
            <input class="inputs" style={{ marginTop:'60px',display:'flex',alignItems:'flex-start', padding:'8px 12px', width:'471px',height:'40px', background:'#ffffff'}}
            type="password" placeholder="Contraseña*" required></input>
            <br></br>
            <input class="inputs" style={{ marginTop:'40px',display:'flex',alignItems:'flex-start', padding:'8px 12px', width:'471px',height:'40px', background:'#ffffff'}}
            type="password" placeholder="Confirmar Contraseña*" required></input>
            

        <button class="botInicio">Confirmar</button>
       
        </div>
    </>
    );
}
export default Registro;