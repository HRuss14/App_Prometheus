import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import React, {useMemo, useState} from 'react';
import AgendaTareas from './Pages/listatareas';
import Tempo from './Pages/Timer/temporizador';
import InicioSesion from './Pages/login'
import Registro from './Pages/register';
import PaginaInicio from './Pages/inicio';
import Estadisticas from './Pages/estadisticas';
import { UserContext } from './Context/userContext';

function App() {

const [user, changeUser] = useState({});



  return (
    <UserContext.Provider value={{user, changeUser}}>
    <BrowserRouter>
      <div>
    
     {/*      <nav  id="navbar" style={{ textAlign: 'center', fontSize: '24px', backgroundColor: '#f54e4e' , width:'1920px', height:'60px', position:'relative', top:'-50px', padding:'15px'}}>
            <NavLink to='/inicio'><img class="logo_prometheus" src={logo}/> </NavLink>
            <NavLink to='/inicio'>Inicio</NavLink>
            <NavLink to='/tareas'>Mis Tareas</NavLink>
            <NavLink to='/temporizador'>Temporizador</NavLink>
            <NavLink to='/estadisticas'>Estadísticas</NavLink>
            <NavLink style={{position:'absolute', right:'0px'}} to='/login' onClick={() => refresh()}> <img class="logout" src={logout}></img></NavLink>
            <p>Usted ha entrado como: {user.name}</p>
          </nav> */}
      
        <main>
          <Routes>
            <Route path='/' element={<InicioSesion/>} />
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
    </UserContext.Provider>
  );
}



export default App;