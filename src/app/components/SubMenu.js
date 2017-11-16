import React from "react";
import "../styles/SubMenu.css";

export const SubMenu = (props) => {

    return (
        <div className="row">
            <div className="col-xs-12 col-md-offset-2">
                <div className="grids_1_of_3">
                    <div className="grid_1_of_3 images_1_of_3">
                        <a href="#"><img src="images/Prestar.png" /></a>
                        <h3>Crear nuevo</h3>
                    </div>
                    <div className="grid_1_of_3 images_1_of_3">
                        <a href="#"><img src="images/renovar.png" /></a>
                        <h3>Renovar</h3>
                    </div>
                    <div className="grid_1_of_3 images_1_of_3">
                        <a href="#"><img src="images/devolver.png" /></a>
                        <h3>Devolver</h3>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        </div>
    )
}