import React, {useContext, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from '../../instances/axiosInstance';
import { UserContext } from '../../Context/userContext';
import agregar from '../../Images/agregar.svg'


const FormularioTareas = ({tareas, cambiarTareas}) => {
	const [inputTarea, cambiarInputTarea] = useState('');
	const [inputDificultad, cambiarInputDif] = useState();
	const [inputDate, cambiarInputDate] = useState('');
	const [inputTiempo, cambiarInputTiempo] = useState("");
	const {user, changeUser} = useContext(UserContext)

	const handleSubmit = (e) => {
		e.preventDefault();

		cambiarTareas(
			[
				...tareas, 
				{
					id: uuidv4(),
					texto: inputTarea,
					dificultad: inputDificultad,
					dueDate: inputDate,
					tiempoEst: inputTiempo,
					completada: "Pendiente",
				}
			]
		);
		cambiarInputTarea('');
		cambiarInputDif('');
		cambiarInputDate('');
		cambiarInputTiempo('')

		axios.post('tasks', {
            task_id: uuidv4(),
    		user_id: user.id,
    		title: inputTarea,
    		category: "Ejecución",
    		stimated_time: inputTiempo,
    		difficulty: inputDificultad,
    		effort: 0,
    		state: "Pendiente",
    		due_date: inputDate,
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
	}

	return (
		<form action="" className="formulario-tareas" onSubmit={handleSubmit}>
			<input
		style={{height:'58px'}}
				type="text"
				className="formulario-tareas__input"
				placeholder="Título tarea"
				value={inputTarea}
				onChange={(e) => cambiarInputTarea(e.target.value)}
				required
			/>
			<input
			style={{height:'58px'}}
				type="number"
				min = "1"
				max= "10"
				className="formulario-tareas__input"
				placeholder="Dificultad (1-10)"
				value={inputDificultad}
				onChange={(e) => cambiarInputDif(e.target.value)}
				required
			/>
			<input
			style={{ cursor:'pointer'}}
				type="Date"
				min = "2022-05-18"
				className="formulario-tareas__input"
				placeholder="Fecha fin"
				value={inputDate}
				onChange={(e) => cambiarInputDate(e.target.value)}
				required
			/>
			<select
			style={{ cursor:'pointer'}}
				type="text"
				className="formulario-tareas__input"
				placeholder="Tiempo estimado"
				onChange={(e) => cambiarInputTiempo(e.target.value)} 
				value={inputTiempo}
				required
			>
				<option value="" disabled selected> Duración Estimada </option>
				<option value="2" name="Corta"> Corta </option>
				<option value="8" name="Media"> Media </option>
				<option value="20" name="Larga"> Larga </option>
			</select>
			<button type='Submit' style={{ position:'relative',textAlign: 'center', fontSize:'32px', left:'10px'}}><img src={agregar}/></button>
		</form>
	);
}
 
export default FormularioTareas;