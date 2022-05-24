import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckSquare, faEdit, faSquare, faTimes} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Tarea = ({tarea, toggleCompletada, editarTarea, borrarTarea}) => {
	const [editandoTarea, cambiarEditandoTarea] = useState(false);
	const [nuevaTarea, cambiarNuevaTarea] = useState(tarea.texto);

	const handleSubmit = (e) => {
		e.preventDefault();
		editarTarea(tarea.id, nuevaTarea, tarea.tiempoEst, tarea.dificultad, tarea.dueDate);
		cambiarEditandoTarea(false);
	}

	const formatEstTime = (num, nom) => {
		if (num === 2) {
			return "Corta";
		} else if (num === 8){
			return "Media";
		} else if(num === 20){
			return "Larga";
		}
		console.log(num, nom);
	}

	return (
		<li className="lista-tareas__tarea" style={{height:'75px'}}>
			<FontAwesomeIcon 
				icon={tarea.completada === "Completada" ? faCheckSquare : faSquare}
				className="lista-tareas__icono lista-tareas__icono-check"
				onClick={() => toggleCompletada(tarea.id)}
			/>
			<div className="lista-tareas__texto">
				{editandoTarea ? 
				<form action="" className="formulario-editar-tarea" onSubmit={handleSubmit} >
					<input 
						type="text"
						className="formulario-editar-tarea__input"
						value={nuevaTarea}
						onChange={(e) => cambiarNuevaTarea(e.target.value)}
						
					/>
					<button 
						type="submit" 
						className="formulario-editar-tarea__btn"
					>
						Actualizar
					</button>
				</form>
				: <p style={{margin:'10px'}}><h4 style={{ marginBottom:'5px', fontSize:'18px'}}>{tarea.texto}</h4> Dificultad: {tarea.dificultad}  -   Fecha: {tarea.dueDate} -  Tiempo Estimado: {formatEstTime(tarea.tiempoEst, tarea.texto)}</p>
				}
			</div>
			<div className="lista-tareas__contenedor-botones">
				<FontAwesomeIcon 
					icon={faEdit} 
					className="lista-tareas__icono lista-tareas__icono-accion"
					onClick={() => cambiarEditandoTarea(!editandoTarea)}
				/>
				<FontAwesomeIcon 
					icon={faTimes} 
					className="lista-tareas__icono lista-tareas__icono-accion" 
					onClick={() => borrarTarea(tarea.id)}
				/>
			</div>
		</li>
	);
}
 
export default Tarea;