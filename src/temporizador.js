import './App.css';
import Timer from "./Timer";
import Settings from "./Settings";
import {useState, useEffect} from "react";
import SettingsContext from "./SettingsContext";
import ListaTareas from './lista';
import Helmet from 'react-helmet';

import React from 'react';

function Tempo() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(0.05);
  const [breakMinutes, setBreakMinutes] = useState(0.05);
  const [tareas, cambiarTareas] = useState([]);

  useEffect(() => {
    
  }, []);
 
  return ( 
    <div>
      <Helmet>
        <title>Temporizador</title>
      </Helmet>
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