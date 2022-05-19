import React, {useState} from "react";
import Helmet from "react-helmet";
import logoRegistro from './Logo_Registro.svg';
import './App.css';
import axios from './instances/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Registro=()=>{

const [counterId, changeCounter] = useState("User");
const [counter, changeNumber] = useState(4)
const [name, changeName] = useState("");
const [mail, changeMail] = useState("");
const [gender, changeGender] = useState(false);
const [phone, changePhone] = useState("");
const [password, changePassword] = useState("");
const [passwordConfirm, changePwdConfirm] = useState("");
let navigate = useNavigate();

function postInfo() {

    /* axios({
            method: 'post',
            url: 'users',
            data: {
                client_id: counterId + counter,
                email: "test2@gmail.com",
                password: "89893898936",
                genero: true,
                telefono: "3143341001",
                nombre: "Alvaro Tovar"
            
            }
          }); */
    
    if (password === passwordConfirm){
        axios.post('users', {
            client_id: counterId + counter,
            email: mail,
            password: password,
            genero: gender,
            telefono: phone,
            nombre: name,
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
        navigate("/login");
    } else {
        console.log("Las contraseñas no coinciden")
    }
}

    return(
        <>
        <Helmet>
            <title>Registro</title>
        </Helmet>
        <form>
        <img class="logo_grande" src={logoRegistro} style={{position:'relative',marginTop:'-150px', left:'-100px'}}/>
        <div style={{ position:'absolute', left: '780px', alignItems:'center',marginTop:'-20px'}} >
            <input class="inputs"style={{display:'flex',alignItems:'flex-start', padding:'8px 12px', width:'471px',height:'40px', background:'#ffffff'}} 
            type="text" onChange={e => changeName(e.target.value)} placeholder="Nombre*" required ></input>

            <input class="inputs"style={{marginTop:'40px', display:'flex',alignItems:'flex-start', padding:'8px 12px', width:'471px',height:'40px', background:'#ffffff'}} 
x
            type="email" onChange={e => changeMail(e.target.value)} placeholder="Correo*" required></input>

            <br></br>
            <select id="genP"class="inputs" onChange={e => changeGender(e.target.value)} style={{alignItems:'center', padding:'8px 12px', width:'220px',height:'40px', background:'#ffffff'}}>
                <option value="" disabled selected>Género</option>
                <option value={true}>Hombre</option>
                <option value={false}>Mujer</option>
            </select>

            <input class="inputs" style={{marginTop:'40px',alignItems:'flex-start', padding:'8px 12px', width:'220px',height:'40px', background:'#ffffff', marginLeft:'31px'}}
             type="number" min="1111111111" max="9999999999" onInput="validity.valid||(value='');" onChange={e => changePhone(e.target.value)} placeholder="Teléfono*" pattern="[0-11]{9}" required></input>
            <br></br>

            <input class="inputs" id = "con1" style={{ marginTop:'60px',display:'flex',alignItems:'flex-start', padding:'8px 12px', width:'471px',height:'40px', background:'#ffffff'}}
            type="password" onChange={e => changePassword(e.target.value)} placeholder="Contraseña*" required></input>
            <br></br>

            <input class="inputs" id = "con2" style={{ marginTop:'40px',display:'flex',alignItems:'flex-start', padding:'8px 12px', width:'471px',height:'40px', background:'#ffffff'}}
            type="password" onChange={e => changePwdConfirm(e.target.value)} placeholder="Confirmar Contraseña*" required></input>
            

            <button class="botInicio" onClick={() => {changeNumber(counter+1); postInfo()}}>Confirmar</button>
            
     
        </div>
      
        </form>
        
    </>
    );

}
export default Registro;