import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import InicioSesion from './login'
import Registro from './register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Index =()=>{
  return(
<BrowserRouter>
<Routes>
    <Route path="/" element={<InicioSesion/>}/>
    <Route path="/registro" element={<Registro/>}/>
    
    </Routes>
</BrowserRouter>
  );
}
ReactDOM.render(<Index/>, document.getElementById('root'));

