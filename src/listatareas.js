import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './header';
import FormularioTareas from './ingreso';
import ListaTareas from './lista';
import axios from './instances/axiosInstance';


const AgendaTareas = () => {
  const [tareas, cambiarTareas] = useState([])

  useEffect(() => {
    //https://my-json-server.typicode.com/juan2409/HTTPdbp/tareas
    axios("/users").then((response) => {
      const tareasGuardadas = response.data.map((tarea)=> {
        return {
          id: tarea.client_id,
          texto: tarea.email,
          completada: tarea.completada,
        };
      });
      cambiarTareas(tareasGuardadas);
    });
  }, []);

  let configMostrarCompletadas = '';  
  if(localStorage.getItem('mostrarCompletadas') === null){
    configMostrarCompletadas = true;
  } else {
    configMostrarCompletadas = localStorage.getItem('mostrarCompletadas') === 'true';
  }
  const [mostrarCompletadas, cambiarMostrarCompletadas] = useState(configMostrarCompletadas);

  

  return (
    <div className="contenedor">
      <Header 
        mostrarCompletadas={mostrarCompletadas} 
        cambiarMostrarCompletadas={cambiarMostrarCompletadas}
      />
      <FormularioTareas tareas={tareas} cambiarTareas={cambiarTareas} />
      <ListaTareas 
        tareas={tareas}
        cambiarTareas={cambiarTareas}
        mostrarCompletadas={mostrarCompletadas}
      />
    </div>
  );
}

export default AgendaTareas;