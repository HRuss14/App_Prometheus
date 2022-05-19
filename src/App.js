import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import React from 'react';
import AgendaTareas from './listatareas';
import Tempo from './temporizador';
import logo from './Logo_Final.svg';
import logout from './logout.svg'
import InicioSesion from './login'
import Registro from './register';
import PaginaInicio from './inicio';
import Estadisticas from './estadisticas';

function App() {

function hideTemp(){
  document.getElementById("pomodoroTimer").style.display = 'none';
}

function showTemp(){
  document.getElementById("pomodoroTimer").style.display = 'block';
}

  return (
   
    <BrowserRouter>
      <div>
        <header>
          <nav  id="navbar" style={{ textAlign: 'center', fontSize: '24px', backgroundColor: '#f54e4e' , width:'1920px', height:'60px', position:'relative', top:'-50px', padding:'15px'}}>
            <NavLink to='/inicio' onClick={() => hideTemp()}><img class="logo_prometheus" src={logo}/> </NavLink>
            <NavLink to='/inicio' onClick={() => hideTemp()}>Inicio</NavLink>
            <NavLink to='/tareas' onClick={() => hideTemp()}>Mis Tareas</NavLink>
            <NavLink to='/temporizador' onClick={() => hideTemp()}>Temporizador</NavLink>
            <NavLink to='/estadisticas' onClick={() => hideTemp()}>Estadísticas</NavLink>
            <NavLink style={{position:'absolute', right:'0px'}} to='/login'> <img class="logout" src={logout}></img></NavLink>
            
          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<div>Error 404 not found</div>} />
            <Route path='/inicio' element={<PaginaInicio/>} />
            <Route path='/tareas' element={<AgendaTareas />} />
            <Route path='/temporizador' element={<Tempo />} />
            <Route path='/estadisticas' element={<Estadisticas/>} />
            <Route path="/login" element={<InicioSesion/>}/>
            <Route path="/registro" element={<Registro/>}/>
          </Routes>
         
        </main>
      </div>
    </BrowserRouter>
  );
}



export default App;
