import React, {useContext, useState, useRef} from "react";
import Helmet from "react-helmet";
import logoGrande from '../Images/Logo_Grande.svg'
import Boton from "../Components/Boton";
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from '../instances/axiosInstance';
import { UserContext } from "../Context/userContext";

const InicioSesion = () =>{

const [mail, changeMail] = useState("User");
const [password, changePassword] = useState("User");
let navigate = useNavigate();
const { user, changeUser } = useContext(UserContext)
let userRef = useRef(user)

const handleSubmit = (e) => {
    e.preventDefault();
    /* axios.post('users/'+mail+"/"+password)
    .then((response) => {
        console.log(response);
        changeSuccess(response);
    }, (error) => {
        console.log(error);
    });

    if (loginSuccess) {
        navigate("/inicio");
    } */
    axios.post('users/'+mail+"/"+password).then((response) => {
        let userLog = response.data
        changeUser({id: userLog.id, name: userLog.name})
        userRef.current = {id: userLog.id, name: userLog.name}
        if (userRef.current.id !== null && userRef.current.id !== undefined) {
            navigate("/inicio");
        }
      }, (error) => {
        console.log(error);
        });
    
    
}

    return(
    <>
        <Helmet>
            <title>Inicio Sesión</title>
        </Helmet>
        <img class="logo_grande" src={logoGrande} />
        <form style={{ position:'relative', alignItems:'center', left:'-20px'}} onSubmit={handleSubmit}>
            
            <input class="inputs"style={{display:'flex',alignItems:'flex-start', padding:'8px 12px', width:'471px',height:'40px', background:'#ffffff'}} 
            type="email" onChange={e => changeMail(e.target.value)} placeholder="Correo"></input>
            <br></br>
            <input class="inputs" style={{ marginTop:'40px',display:'flex',alignItems:'flex-start', padding:'8px 12px', width:'471px',height:'40px', background:'#ffffff'}}
            type="password" onChange={e => changePassword(e.target.value)} placeholder="Contraseña"></input>

       <button as="button"  class="botInicio" primario type="submit">Iniciar Sesión</button>
        
       <label class="textRegistro">¿Aun no tienes cuenta?</label>
        <Boton to="/registro" class="botRegistro">Registrate</Boton>
        </form>
        
    </>
    );
}
export default InicioSesion;
