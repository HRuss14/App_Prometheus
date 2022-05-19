import React from "react";
import Helmet from "react-helmet";

import './App.css'
import logoGrande from './Logo_Grande.svg'
import ficha from './texto.png'
import ficha2 from './texto2.png'
import ficha3 from './texto3.png'


const PaginaInicio=()=>{
    return(
        <>
         <Helmet>
            <title>Inicio</title>
        </Helmet>
        <img class="logo_inicio" style={{position:'relative', left:'0px',marginTop:'-100px'}} src={logoGrande}/>
        <div class="slide">
			<div class="slide-inner">
				<input class="slide-open" type="radio" id="slide-1" 
			 	     name="slide" aria-hidden="true" hidden="" checked="checked"></input>
				<div class="slide-item">
					<img src={ficha2}></img>
				</div>
				<input class="slide-open" type="radio" id="slide-2" 
			 	     name="slide" aria-hidden="true" hidden=""></input>
				<div class="slide-item">
                <img src={ficha3}></img>
				</div>
				<input class="slide-open" type="radio" id="slide-3" 
			 	     name="slide" aria-hidden="true" hidden=""></input>
				<div class="slide-item">
                <img src={ficha}></img>
				</div>
				<label for="slide-3" class="slide-control prev control-1">‹</label>
				<label for="slide-2" class="slide-control next control-1">›</label>
				<label for="slide-1" class="slide-control prev control-2">‹</label>
				<label for="slide-3" class="slide-control next control-2">›</label>
				<label for="slide-2" class="slide-control prev control-3">‹</label>
				<label for="slide-1" class="slide-control next control-3">›</label>
				<ol class="slide-indicador">
					<li>
						<label for="slide-1" class="slide-circulo">•</label>
					</li>
					<li>
						<label for="slide-2" class="slide-circulo">•</label>
					</li>
					<li>
						<label for="slide-3" class="slide-circulo">•</label>
					</li>
				</ol>
			</div>
   </div>
			
        </>
       
        
    )
}
export default PaginaInicio;