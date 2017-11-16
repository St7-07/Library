import React from "react";
import "../styles/footer.css";

export const Footer = (props) => {

    return (
        <div className="footerDiv container-flow">
            <div className="wrap">
                <div className="row footer">

              

                <div className="col-xs-5">

                <img className="logoUCR" src="../images/ucr.svg"/>
                <img className="logoUCR" src="../images/UCRlogo.png"/>
                
                </div>
                
                <div className="col-xs-5">

                <p >© Biblioteca Recinto de Grecia, Universidad de Costa Rica</p>

                </div>

              
                     
                </div>
            </div>
        </div>
    )
}
