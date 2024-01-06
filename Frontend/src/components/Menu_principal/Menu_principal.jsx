import React from 'react';
import './Menu_principal.css';
import imagen_torno from './Imagenes_Menu/Torno.jpg';
import imagen_cnc from './Imagenes_Menu/Cnc.jpg';
import imagen_esmeril from './Imagenes_Menu/esmeril.jpg';
import imagen_fresadora from './Imagenes_Menu/fresadora.jpg';
import imagen_sierra from './Imagenes_Menu/sierra.jpg';
import imagen_aprendices from './Imagenes_Menu/aprendices.jpg';
import imagen_informes from './Imagenes_Menu/informes.jpg';
import imagen_almacen from './Imagenes_Menu/almacen.jpg';
import imagen_compresor from './Imagenes_Menu/compresor_de_tornillo.jpg';



export const Menu_principal = () => {
  return (
      <div className='Menu_p'>
  <div className="menu-principal">
  

<div className='tarjetas'>
  <div className='TCE-tarjetas'>
 <div className='TFSA-tarjetas'>
    <div className='tornos-tarjeta'><img src={imagen_torno} className="img-torno"></img></div>
    <div className='fresadoras-tarjeta'><img src={imagen_fresadora} className="img-fresadora"></img></div>
    <div className='sierra-tarjeta'><img src={imagen_sierra} className="img-sierra"></img></div>
    <div className='almacen-tarjeta'><img src={imagen_almacen} className="img-almacen"></img></div>
    </div>
    <div className='cnc-y-comp-tarjetas'>
    <div className='cnc-tarjeta'><img src={imagen_cnc} className="img-cnc"></img></div>
    <div className='compresor-tarjeta'><img src={imagen_compresor} className="img-compresor"></img></div>
    </div>
    <div className='EAI-tarjetas'>
    <div className='esmeriles-tarjeta'><img src={imagen_esmeril} className="img-esmeril"></img></div>
    <div className='aprendices-tarjeta'><img src={imagen_aprendices} className="img-aprendices"></img></div>
    <div className='informes-tarjeta'><img src={imagen_informes} className="img-informes"></img></div>
    </div>
  </div>
  
    
</div>

    




      <div className="animacion" >
            <ul className="cuadros">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
      </div>
      </div>
      
  )
}
