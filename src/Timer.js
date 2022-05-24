import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import axios from './instances/axiosInstance';
import { v4 as uuidv4 } from 'uuid';
import {useContext, useState, useEffect, useRef} from "react";
import SettingsContext from "./SettingsContext";
import userEvent from '@testing-library/user-event';
import { UserContext } from './userContext';
import { Howl } from "howler";

const red = '#f54e4e';
const green = '#4aec8c';

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work'); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [tareas, cambiarTareas] = useState([]);
  const [pomodoro, setPomodoro] = useState([]);
  const [pomodori, setPomodori] = useState(0);
  const [pomId, setPomId] = useState("");
  const [selected, setSelected] = useState("");
  const [cambio, setCambio] = useState(false)
  const [pausas, setPausas] = useState(0)
  const [workMinutes, setWorkMinutes] = useState(0)
  const [terminar, setTerminar] =useState(false)

  const soundSrc = "https://www.myinstants.com/media/sounds/boxing-bell.mp3"

  const { user, changeUser} = useContext(UserContext)

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const pomodoriRef = useRef(pomodori);
  const pomIdRef = useRef(pomId);
  const selectedRef = useRef(selected);
  const pausasRef = useRef(pausas);
  const workMinutesRef = useRef(workMinutes);
  const terminarRef = useRef(terminar);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  const callMySound = (src) => {
    const sound = new Howl({
      src,
      html5: true
    });
    sound.play()
  }

  useEffect(() => {
    axios("tasksPerUser/"+ user.id).then((response) => {
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

    function switchMode() {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;

    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    workMinutesRef.current = settingsInfo.workMinutes;
    setWorkMinutes(settingsInfo.workMinutes)

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        //condicional para la creación de objetos pomodoro al finalizar ciclos pomodori y de descanso
        if (modeRef.current === "work" && pomodoriRef.current === 0 && terminarRef.current === false){ //entra solo en el primer pomodori de un pomodoro
          callMySound(soundSrc)
          pomodoriRef.current++ //se aumenta la cuenta pomodori 
          pomIdRef.current = uuidv4() //creamos y guardamos el id del nuevo objeto pomodoro
          //creamos el nuevo objeto pomodoro
          const nuevoPomodoro = {id: pomIdRef.current, pomodori_quantity:pomodoriRef.current, work_time:settingsInfo.workMinutes, short_rest:settingsInfo.breakMinutes, id_task:selectedRef.current, pauses:pausasRef.current,}
          setPomodoro([...pomodoro, nuevoPomodoro]) //añadimos el nuevo objeto pomodoro al array de pomodoros
          console.log("Empieza pomodoro " + pomodoriRef.current)
          console.log(nuevoPomodoro)
          console.log(pomodoro)
        } else if (modeRef.current === "work" && pomodoriRef.current<4 && terminarRef.current === false){ //entra en los pomodori intermedios
          pomodoriRef.current++ //se aumenta la cuenta pomodori 
          callMySound(soundSrc)
          const nuevosPomodoro = pomodoro.map((pomodoro) => { //update de los objetos pomodoro con el valor actual de pomodori (por si termina)
            if (pomodoro.id === pomIdRef.current){
              return{...pomodoro, pomodori_quantity:pomodoriRef.current}
            }
            return pomodoro
          });
          setPomodoro(nuevosPomodoro)
          console.log(pomodoriRef.current)
          console.log(pomodoro)
        } else if (modeRef.current === "break" && pomodoriRef.current===4 && terminarRef.current === false){
          callMySound(soundSrc) //entra al finalizar el ultimo descanso del pomodoro
          const pomodoroPost = pomodoro[pomodoro.length -1];
            axios.post('pomodoros/'+pomodoroPost.id_task, {
              pomodoro_id:pomodoroPost.id,
              work_time: pomodoroPost.work_time,
              short_rest: pomodoroPost.short_rest,
              pomodori_quantity: pomodoroPost.pomodori_quantity,
              pauses_quantity: pomodoroPost.pauses
            })
            .then((response) => {
              console.log(response);
          }, (error) => {
              console.log(error);
          });
          pausasRef.current = 0
          pomodoriRef.current = 0 //reinicio contador pomodori
          console.log("Finaliza pomodoro "+pomodoriRef.current)
        } else if (terminarRef.current === true){
          if (modeRef.current === "work") {
            pomodoriRef.current++ //se aumenta la cuenta pomodori 
            callMySound(soundSrc)
            console.log(pomodoriRef.current)
            const nuevosPomodoro = pomodoro.map((pomodoro) => { //update de los objetos pomodoro con el valor actual de pomodori (por si termina)
            if (pomodoro.id === pomIdRef.current){
              return{...pomodoro, pomodori_quantity:pomodoriRef.current}
            }
            return pomodoro
          });
          setPomodoro(nuevosPomodoro)
          }
          
          let numeroPom = pomodoriRef.current

          const pomodoroPost = pomodoro[pomodoro.length -1];
            axios.post('pomodoros/'+pomodoroPost.id_task, {
              pomodoro_id:pomodoroPost.id,
              work_time: pomodoroPost.work_time,
              short_rest: pomodoroPost.short_rest,
              pomodori_quantity: numeroPom,
              pauses_quantity: pomodoroPost.pauses
            })
            .then((response) => {
              console.log(response);
          }, (error) => {
              console.log(error);
          });
          setIsPaused(true)
          isPausedRef.current = true
          setMode("break")
          modeRef.current = "break"
          pausasRef.current = 0
          pomodoriRef.current = 0
          setTerminar(false)
          terminarRef.current = false

        }
        return switchMode();
      }

      tick();
    },1000);

    return () => clearInterval(interval);
  }, [pomodoro]);

  const totalSeconds = mode === 'work'
    ? settingsInfo.workMinutes * 60
    : settingsInfo.breakMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if(seconds < 10) seconds = '0'+seconds;

  const handleChange = e => {
    setSelected(e.target.value);
    selectedRef.current = e.target.value
    setCambio(true)
  }

  function handlePlay(bool){
    if (bool === true){
      setIsPaused(false)
      isPausedRef.current = false
    }
  }

  function aumentarPausas(){
    pausasRef.current=(pausasRef.current+1)
    console.log(pausasRef.current)
  }

  function handleReiniciar(){
    setIsPaused(true)
    isPausedRef.current = true
    setMode("work")
    modeRef.current = "work"
    setSecondsLeft(workMinutes*60)
    secondsLeftRef.current = workMinutes*60
  }

  function handleTerminar() {
    setTerminar(true)
    terminarRef.current = true
  }

  return (
    <div id="pomodoroTimer" style={{marginTop:'100px', display: 'block'}}>
      <select onChange={handleChange} required class="selectTareas" style={{height:'35px',width:'150%',left:'-80px' , position:'relative', fontSize:'18px',background:'#ffffff', borderRadius:'5px', border:'1px solid rgb(109, 19, 27) '}}>
        <option value="ListaTareas" disabled selected> Seleccione Tarea </option>
        {tareas.length > 0 ? tareas.map((tarea) => {
          return <option value={tarea.id}>{tarea.texto}</option>
        }):<></>}
        </select>
      <CircularProgressbar
        value={percentage}
        text={minutes + ':' + seconds}
        styles={buildStyles({
        textColor:'rgba(73, 50, 52, 1)',
        pathColor:mode === 'work' ? red : green,
        tailColor:'rgba(255,255,255,.2)',
      })} />
      <div style={{marginTop:'30px'}}>
        {isPaused
          ? <PlayButton onClick={() => handlePlay(cambio)} />
          : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; aumentarPausas()}} />}
        <button onClick={() => handleReiniciar()}> Reiniciar </button>
        <button onClick={() => handleTerminar()}> Terminé la Tarea </button>
      </div>
      <div style={{marginTop:'20px'}}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;