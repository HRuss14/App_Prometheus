import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Header from './header';
import FormularioTareas from './ingreso';
import ListaTareas from './lista';
import axios from './instances/axiosInstance';
import Helmet from 'react-helmet';
import { UserContext } from './userContext';


const AgendaTareas = () => {

  const [tareas, cambiarTareas] = useState([])
  const { user, changeUser } = useContext(UserContext)

  useEffect(() => {
    axios("tasksPerUser/" + user.id).then((response) => {
      const tareasGuardadas = response.data.map((tarea) => {
        return {
          id: tarea.task_id,
          texto: tarea.title,
          dificultad: tarea.difficulty,
          completada: tarea.state,
          tiempoEst: tarea.stimated_time,
          dueDate: tarea.due_date,
        };
      });
      cambiarTareas(tareasGuardadas);
    });
  }, []);

  let configMostrarCompletadas = '';
  if (localStorage.getItem('mostrarCompletadas') === null) {
    configMostrarCompletadas = true;
  } else {
    configMostrarCompletadas = localStorage.getItem('mostrarCompletadas') === 'true';
  }
  const [mostrarCompletadas, cambiarMostrarCompletadas] = useState(configMostrarCompletadas);


  return (
    <div className="contenedor">
      <Helmet>
        <title>Tareas</title>
      </Helmet>
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