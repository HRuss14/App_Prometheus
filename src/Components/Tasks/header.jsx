import React from "react";

const Header = ({mostrarCompletadas, cambiarMostrarCompletadas}) => {
	const toggleCompletadas = () => {
		if(mostrarCompletadas === "Pendiente"){
			cambiarMostrarCompletadas("Completada");
		}else if(mostrarCompletadas === "Completada"){
			cambiarMostrarCompletadas("Pendiente");
		}
	}

	return (
		<header className="header">
			<h1 className="header__titulo">Lista de Tareas</h1>
			{mostrarCompletadas === "Completada" ?
				<button 
					className="header__boton"
					onClick={() => toggleCompletadas()}
				>
					Pendientes
				
				</button>
			:
				<button 
					className="header__boton"
					onClick={() => toggleCompletadas()}
				>
					      Todas
					
				</button>
			}	
		</header>
	);
}
 
export default Header;