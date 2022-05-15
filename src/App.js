import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import React from 'react';
import AgendaTareas from './listatareas';
import Tempo from './temporizador';
import logo from './Logo_Final.svg'
import InicioSesion from './login'
import Registro from './register';

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
          <nav style={{ textAlign: 'center', fontSize: '24px', backgroundColor: '#f54e4e' , width:'1920px', height:'60px', position:'relative', top:'-50px', padding:'15px'}}>
            <NavLink to='/inicio' onClick={() => hideTemp()}><img class="logo_prometheus" src={logo}/></NavLink>
            <NavLink to='/inicio' onClick={() => hideTemp()}>Inicio</NavLink>
            <NavLink to='/tareas' onClick={() => hideTemp()}>Mis Tareas</NavLink>
            <NavLink to='/temporizador' onClick={() => hideTemp()}>Temporizador</NavLink>
            <NavLink to='/estadisticas' onClick={() => hideTemp()}>Estadisticas</NavLink>
            
          </nav>
        </header>
        
        <main>
          <Routes>
            <Route path='/' element={<div>Error 404 not found</div>} />
            <Route path='/inicio' element={<div>Error 404 not found</div>} />
            <Route path='/tareas' element={<AgendaTareas />} />
            <Route path='/temporizador' element={<Tempo />} />
            <Route path='/estadisticas' element={<div>Aqui irán la estadisticas del usuario</div>} />
          </Routes>
         
        </main>
      </div>
    </BrowserRouter>
  );
}



export default App;
