import React, {useState, useEffect} from "react";
import Helmet from "react-helmet";
import axios from './instances/axiosInstance';

import './App.css'

const Estadisticas=()=>{

    const [tareas, cambiarTareas] = useState([])
  
  useEffect(() => {
    axios("tasks").then((response) => {
      const tareasGuardadas = response.data.map((tarea)=> {
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

  function calculoDificultad() {
        let dificultadTotal = 0;
        for (let i = 0; i < tareas.length; i++) {
            dificultadTotal += tareas[i].dificultad;
        }
        return dificultadTotal;
  }

  function dificultadMedia() {
      let difMedia = calculoDificultad()
      let total = difMedia/(tareas.length)
      return total
  }

    return(
       
       <><Helmet>
            <title>Estadísticas</title>
        </Helmet>
        <h1 style={{fontSize: '100px', left:'-80px', top: '-100px', position:'relative', color:'#2A1215'}}>Estadisticas</h1>
        <h3 style={{fontSize: '20px', top: '-60px', position:'relative', fontWeight:'normal', color:'#2A1215'}}>Número de tareas: {tareas.length}</h3><br></br>
        <h3 style={{fontSize: '20px', top: '-40px', position:'relative', fontWeight:'normal', color:'#2A1215'}}>Dificultad total: {calculoDificultad()}</h3><br></br>
        <h3 style={{fontSize: '20px', top: '-20px', position:'relative', fontWeight:'normal', color:'#2A1215'}}>Dificultad media: {dificultadMedia()}</h3>
    </>
    )
}
export default Estadisticas;