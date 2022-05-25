import '../../App.css';
import Timer from "./Timer";
import Settings from "../../Components/Settings";
import {useState, useEffect, useContext} from "react";
import SettingsContext from "../../Context/SettingsContext";
import Helmet from 'react-helmet';
import NavBar from '../../Components/navbar';
import React from 'react';
import { UserContext } from '../../Context/userContext';

function Tempo() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const {user, changeUser} = useContext(UserContext)

  useEffect(() => {
    
  }, []);
 
  return ( 
    <div>
      <Helmet>
        <title>Temporizador</title>
      </Helmet>
      <NavBar></NavBar>
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