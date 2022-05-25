import React, {useContext} from 'react';
import Tarea from './tareas';
import axios from'../../instances/axiosInstance';
import { UserContext } from '../../Context/userContext';

const ListaTareas = ({tareas, cambiarTareas, mostrarCompletadas}) => {

	const {user, changeUser} = useContext(UserContext)

	const toggleCompletada = (id) => {
		cambiarTareas(tareas.map((tarea) => {
			if(tarea.id === id && tarea.completada==="Pendiente"){
				return {...tarea, completada: tarea.completada = "Completada"}
			} else if(tarea.id === id && tarea.completada==="Completada"){
				return {...tarea, completada: tarea.completada = "Pendiente"}
			}
			return tarea;
		}));
	}

	const editarTarea = (id, nuevoTexto, tiempoE, dificultad, dueDate, effort) => {
		axios.put('tasks', {
            task_id: id,
    		user_id: user.id,
    		title: nuevoTexto,
    		category: "Ejecución",
    		stimated_time: tiempoE,
    		difficulty: dificultad,
    		effort: effort,
    		state: "Pendiente",
    		due_date: dueDate,
        })
        .then((response) => {
            console.log(response, id);
        }, (error) => {
            console.log(error);
        });
		cambiarTareas(tareas.map((tarea) => {
			if(tarea.id === id){
				return {...tarea, texto: nuevoTexto}
			}
			return tarea;
		}));
	}

	const borrarTarea = (email) => {
		axios.delete('tasks/'+email)	
		.then((response) => {
            console.log(response, email);
        }, (error) => {
            console.log(error);
        });
		cambiarTareas(tareas.filter((tareas2 => tareas2.id !== email)));
	}

	return (
		<ul className="lista-tareas">
			{tareas.length > 0 ? tareas.map((tarea) => {
				if(mostrarCompletadas === "Completada"){
					return <Tarea 
								key={tarea.id}
								tarea={tarea}
								toggleCompletada={toggleCompletada}
								editarTarea={editarTarea}
								borrarTarea={borrarTarea}
							/>
				
				} else if(mostrarCompletadas === "Pendiente" && tarea.completada === "Pendiente"){
					return <Tarea 
								key={tarea.id}
								tarea={tarea}
								toggleCompletada={toggleCompletada}
								editarTarea={editarTarea}
								borrarTarea={borrarTarea}
							/>
				}
			})
			:<div className="lista-tareas__mensaje"></div>
			}
		</ul>
	);
}
 
export default ListaTareas;