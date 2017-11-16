import React from "react";
import "../styles/navBar.css";

export const NavBar = (props) => {

    return (
        <div className="divHeader container-fluid">
            <div className="row">
                <div className="btm_border">
                    <div className="h_bg">
                        <div className="wrap">
                            <div className="header">
                                <div className="logo">
                                    <h1><a href="index.html"><img src="../images/BRGlogo.png" alt=""/></a></h1>
                                </div>
                                    <div className="clear"></div>
                                </div>

                                <div className='h_btm'>
                                    <div className='cssmenu'>
                                        <ul>
                                            <li className='active'><a><span>Prestamos</span></a></li>
                                            <li><a ><span>Solicitantes</span></a></li>
                                            <li><a ><span>Audiovisuales</span></a></li>
                                            <li><a ><span>Historial</span></a></li>
                                            <li><a ><span>Estadisticas</span></a></li>
                                          
                                        </ul>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    )
}
