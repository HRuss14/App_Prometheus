import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const Index =()=>{
  return(
    <App/>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<InicioSesion/>}/>
    //     <Route path="/registro" element={<Registro/>}/>
    //   </Routes>
    // </BrowserRouter>
  );
}
ReactDOM.render(<Index/>, document.getElementById('root'));

