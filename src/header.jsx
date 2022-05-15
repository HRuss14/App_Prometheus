import React from "react";

const Header = ({mostrarCompletadas, cambiarMostrarCompletadas}) => {
	const toggleCompletadas = () => {
		cambiarMostrarCompletadas(!mostrarCompletadas);
	}

	return (
		<header className="header">
			<h1 className="header__titulo">Mis Tareas</h1>
			{mostrarCompletadas ?
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