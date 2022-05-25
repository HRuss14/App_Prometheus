import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import Header from '../Components/Tasks/header';
import FormularioTareas from '../Components/Tasks/ingreso';
import ListaTareas from '../Components/Tasks/lista';
import axios from '../instances/axiosInstance';
import Helmet from 'react-helmet';
import { UserContext } from '../Context/userContext';
import NavBar from '../Components/navbar';


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
          esfuerzo: tarea.effort
        };
      });
      cambiarTareas(tareasGuardadas);
    });
  }, []);

  let configMostrarCompletadas = '';
  if (localStorage.getItem('mostrarCompletadas') === null) {
    configMostrarCompletadas = "Completada";
  } else {
    configMostrarCompletadas = localStorage.getItem('mostrarCompletadas') === "Pendiente";
  }
  const [mostrarCompletadas, cambiarMostrarCompletadas] = useState(configMostrarCompletadas);


  return (
    <div>
      <NavBar></NavBar>
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
    </div>
  );
}

export default AgendaTareas;