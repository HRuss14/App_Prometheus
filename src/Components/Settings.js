import ReactSlider from 'react-slider';
import './slider.css'
import SettingsContext from "../Context/SettingsContext";
import {useContext} from "react";
import BackButton from "./BackButton";


function Settings() {
  const settingsInfo = useContext(SettingsContext);
  return(
    <div style={{textAlign:'left', marginTop:"40px"}}>
    <label style={{color:'rgba(73, 50, 52, 1)'}}>Trabajo: {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.workMinutes}
        onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label  style={{color:'rgba(73, 50, 52, 1)'}}>Descanso: {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className={'slider green'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.breakMinutes}
        onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <div style={{textAlign:'center', marginTop:'20px'}}>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>

    </div>
  );
}

export default Settings;