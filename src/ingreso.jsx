import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';


const FormularioTareas = ({tareas, cambiarTareas}) => {
	const [inputTarea, cambiarInputTarea] = useState('');

	const handleInput = (e) => {
		cambiarInputTarea(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		cambiarTareas(
			[
				...tareas, 
				{
					id: uuidv4(),
					texto: inputTarea,
					completada: false
				}
			]
		);
		cambiarInputTarea('');
	}

	return (
		<form action="" className="formulario-tareas" onSubmit={handleSubmit}>
			<input
				type="text"
				className="formulario-tareas__input"
				placeholder="Agregar Tarea +"
				value={inputTarea}
				onChange={(e) => handleInput(e)}
			/>
			
		</form>
	);
}
 
export default FormularioTareas;