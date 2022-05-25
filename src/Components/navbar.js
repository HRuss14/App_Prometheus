import '../App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import React, {useMemo, useState} from 'react';
import { UserContext } from '../Context/userContext';
import { useContext } from 'react';
import logo from '../Images/Logo_Final.svg';
import logout from '../Images/logout.svg';
import logoU from '../Images/logo_user.svg';


const NavBar=()=>{
	const {user, changeUser} = useContext(UserContext)

    function refresh(){
        document.getElementById("pomodoroTimer").style.display = 'none';}

    return(
        <div>
     
        <nav  id="navbar" style={{ textAlign: 'center', fontSize: '24px', backgroundColor: '#f54e4e' , width:'1920px', height:'60px', position:'relative', top:'-130px',left:'-790px', padding:'15px'}}>
            <NavLink to='/inicio'><img class="logo_prometheus" src={logo}/> </NavLink>
            <NavLink to='/inicio'>Inicio</NavLink>
            <NavLink to='/tareas'>Mis Tareas</NavLink>
            <NavLink to='/temporizador'>Temporizador</NavLink>
            <NavLink to='/estadisticas'>Estadísticas</NavLink>
            <NavLink style={{position:'absolute', right:'0px'}} to='/' onClick={() => refresh()}> <img class="logout" src={logout}></img></NavLink>
            <p style={{position:'absolute', right:'80px', marginTop:'-55px', color:'#f0f5ff', fontSize:'28px', fontWeight:'bold'}}>
                <img src={logoU} class="logo-user"/>{user.name}</p>
          </nav>
        
        </div>
        
    )
}
export default NavBar;