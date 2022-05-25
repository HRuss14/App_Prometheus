import React, {useState, useEffect, useCallback, useContext} from "react";
import Helmet from "react-helmet";
import axios from '../instances/axiosInstance';
import NavBar from "../Components/navbar";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Sector} from "recharts";
import '../App.css'
import { UserContext } from '../Context/userContext';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Cantidad ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Porcentaje ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const Estadisticas=()=>{

    const [tareas, cambiarTareas] = useState([])
    const { user, changeUser } =useContext(UserContext)
  
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
          esfuerzo: tarea.effort,
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

  function calcularTareas(num){
    let cantTareas = 0
    const totalTareas = tareas.map((tarea) => {
        if(tarea.tiempoEst === num){
          cantTareas++
          console.log(cantTareas)
        }
    })
    return cantTareas
  }

  function esfuerzoTotal(){
    let esfuTotal = 0
    const totalTareas = tareas.map((tarea) => {
        esfuTotal = esfuTotal + tarea.esfuerzo
    })
    return esfuTotal
  }

  const data = [
    {
      name: "Dificultad de la Tareas",
      DificultadTotal: calculoDificultad(),
      DificultadMedia: dificultadMedia(),
    
    },  
   
  ]; 

  const esfuerzo = [
    {
      name: "Esfuerzo Total",
      Esfuerzo: esfuerzoTotal(),
      EsfuerzoP: (esfuerzoTotal()/tareas.length)
    },  
   
  ];
  const numTareas =[
    { name: "Group A", value: tareas.length }
  ];
  
  const dist = [
    { name: "Cortas", value: calcularTareas(2) },
    { name: "Medias", value: calcularTareas(8) },
    { name: "Largas", value: calcularTareas(20) },
  
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
    return(
    
    
       <><Helmet>
            <title>Estadísticas</title>
        </Helmet>
        <NavBar></NavBar>
        <div>
          <div style={{backgroundColor:'#f54e4e',top: '-70px',position:'relative',left:'-300px', width:'950px', borderRadius:'15px', height:'50px'}}>
        <h2 style={{fontSize: '42px', color:'#f0f5ff',fontWeight:'normal', width:'500px', fontFamily:'Helvetica',position:'relative', left:'230px'}}>
          Informe Estadístico</h2>
          </div>
        <div style={{position:'relative',  left:'-250px'}}>     
        <h3 style={{fontSize: '24px',  fontWeight:'normal', color:'#2A1215'}}>Número de tareas:</h3>
        <p style={{position:'absolute', top:'97px', left:'195px', color:'#1765ad', fontSize:'20px'}}>Tareas</p>
        <PieChart width={400} height={400} style={{position:'relative', right:'20px', fontSize:'24px',top:'10px'}}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={numTareas}
        outerRadius={100}
        fill="#1765ad"
        label
      />
    </PieChart>
        </div>  
        <div style={{position:'relative',  left:'250px', top:'-430px'}}>
        <h3 style={{fontSize: '24px', fontWeight:'normal', color:'#2A1215'}}>Distribuición de tareas:</h3> 
        <PieChart width={500} height={400} style={{position:'relative', right:'75px'}}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={dist}
        innerRadius={80}
        outerRadius={100}
        fill="#e8b339"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
    </div>
    <div style={{top: '-420px',left:'-250px', position:'relative', fontWeight:'normal', color:'#2A1215'}} >
        <h3 style={{fontSize: '24px', fontWeight:'normal', color:'#2A1215'}}>Índice de Dificultad:</h3>
        
        <BarChart width={500} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}} style={{position:'relative' , left:'-100px', top:'50px'}}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="DificultadTotal" fill="#e8b339" />
      <Bar dataKey="DificultadMedia" fill="#854eca" />
      </BarChart>
      </div>
      <div style={{position:'relative',  left:'250px', top:'-750px'}} >
        <h3 style={{fontSize: '24px', fontWeight:'normal', color:'#2A1215'}}>Cálculo de esfuerzo:</h3>
        
        <BarChart width={400} height={300} data={esfuerzo} margin={{top: 5, right: 30, left: 20, bottom: 5}} style={{position:'relative' , left:'0px', top:'50px'}}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Esfuerzo" fill="#8fd460" />
      <Bar dataKey="EsfuerzoP" fill="#6f9412" />
      
      </BarChart>
      </div>
    
     
        </div>
    </>
    )
}
export default Estadisticas;