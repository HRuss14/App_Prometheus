import './App.css';
import Timer from "./Timer";
import Settings from "./Settings";
import {useState, useEffect} from "react";
import SettingsContext from "./SettingsContext";
import ListaTareas from './lista';
import axios from './instances/axiosInstance';
import Helmet from 'react-helmet';

import React from 'react';

function Tempo() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
  const [tareas, cambiarTareas] = useState([]);

  useEffect(() => {
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
 
  return ( 
    <div>
      <Helmet>
        <title>Temporizador</title>
      </Helmet>
      <select class="selectTareas" style={{height:'35px',width:'150%',left:'-80px' , position:'relative', fontSize:'18px',background:'#ffffff', borderRadius:'5px', border:'1px solid rgb(109, 19, 27) '}}>
        <option value="ListaTareas"> Seleccione Tarea </option>
        {tareas.length > 0 ? tareas.map((tarea) => {
          return <option value={tarea.id}>{tarea.texto}</option>
        }):<></>}
        </select>
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
      </div>
  );
}

export default Tempo;