import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';


const FormularioTareas = ({tareas, cambiarTareas}) => {
	const [inputTarea, cambiarInputTarea] = useState('');
	const [inputDificultad, cambiarInputDif] = useState(0);
	const [inputDate, cambiarInputDate] = useState('');
	const [inputTiempo, cambiarInputTiempo] = useState("");

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
					completada: false
				}
			]
		);
		cambiarInputTarea('');
	}

	return (
		<form action="" className="formulario-tareas" onSubmit={handleSubmit}>
			<input
		style={{height:'58px'}}
				type="text"
				className="formulario-tareas__input"
				placeholder="Titulo tarea"
				value={inputTarea}
				onChange={(e) => cambiarInputTarea(e.target.value)}
				
			/>
			<input
			style={{height:'58px'}}
				type="number"
				min = "1"
				max= "10"
				className="formulario-tareas__input"
				placeholder="Dificultad (1-10)"
				//value={inputDificultad}
				onChange={(e) => cambiarInputDif(e.target.value)}
			/>
			<input
				type="Date"
				min = "2022-05-18"
				className="formulario-tareas__input"
				placeholder="Fecha fin"
				value={inputDate}
				onChange={(e) => cambiarInputDate(e.target.value)}
			/>
			<select
				type="text"
				className="formulario-tareas__input"
				placeholder="Tiempo estimado"
				onChange={(e) => cambiarInputTiempo(e.target.value)}
			>
				<option value="" disabled selected> Duración Estimada </option>
				<option value="Corta"> Corta </option>
				<option value="Media"> Media </option>
				<option value="Larga"> Larga </option>
			</select>
			<button type='Submit' style={{ textAlign: 'center', fontSize:'24px', marginLeft:'20px'}}>✔</button>
		</form>
	);
}
 
export default FormularioTareas;