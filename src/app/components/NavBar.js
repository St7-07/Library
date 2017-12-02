import React from "react";
import "../styles/navBar.css";

//export const NavBar = (props) => {
export default class NavBar extends React.Component {

    constructor(props) {
        super();
    }
//reminder para sebastian(IO), se puede editar los 5 case si uso la misma tecnica para estadisticas!! dejar para despues no hay tiempo 
    render() {
        console.log(this.props.userName);
        let userName = this.props.userName;
        let typeUser = this.props.typeUser;
        let type = this.props.section;
        let subMenuHTML;

        let statistics = (type === "Estadisticas") ? (<li className="active"><a onClick={() => this.props.onClick("Estadisticas")}><span>Estadisticas</span></a></li>) 
        : (<li><a onClick={() => this.props.onClick("Estadisticas")}><span>Estadisticas</span></a></li>)  ;

        switch (type) {
            case "Prestamos":
                subMenuHTML = (
                    <div className="divHeader container-fluid">
                        <div className="row">
                            <div className="btm_border">
                                <div className="h_bg">
                                    <div className="wrap">
                                        <div className="header">
                                            <div className="logo">
                                                <h1><a href="index.html"><img src="../images/BRGlogo.png" alt="" /></a></h1>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                        <div className='h_btm'>
                                            <div className='cssmenu'>
                                                <ul>
                                                    <li className="active"><a onClick={() => this.props.onClick("Prestamos", "loanForm")}><span>Prestamos</span></a></li>
                                                    <li><a onClick={() => this.props.onClick("Solicitantes", "applicantForm")}><span>Solicitantes</span></a></li>
                                                    <li><a onClick={() => this.props.onClick("Audiovisuales", "añadirAudio")}><span>Audiovisuales</span></a></li>
                                                    <li><a onClick={() => this.props.onClick("Historial", "tableLoans")}><span>Historial</span></a></li>
                                                    {(typeUser === "Administrator") ? statistics : ""}
                                                    <li><span><img id="imgUser" src={(typeUser === "Administrator") ? "../images/administrador1.0.png" : "../images/normalUser2.0.png"} />{userName}</span></li>
                                                </ul>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                break;

            case "Solicitantes":
                subMenuHTML = (
                    <div className="divHeader container-fluid">
                        <div className="row">
                            <div className="btm_border">
                                <div className="h_bg">
                                    <div className="wrap">
                                        <div className="header">
                                            <div className="logo">
                                                <h1><a href="index.html"><img src="../images/BRGlogo.png" alt="" /></a></h1>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                        <div className='h_btm'>

                                            <div className='cssmenu'>
                                                <ul>
                                                    <li><a onClick={() => this.props.onClick("Prestamos", "loanForm")}><span>Prestamos</span></a></li>
                                                    <li className="active"><a onClick={() => this.props.onClick("Solicitantes", "applicantForm")}><span>Solicitantes</span></a></li>
                                                    <li><a onClick={() => this.props.onClick("Audiovisuales", "añadirAudio")}><span>Audiovisuales</span></a></li>
                                                    <li><a onClick={() => this.props.onClick("Historial", "tableLoans")}><span>Historial</span></a></li>
                                                    {(typeUser === "Administrator") ? statistics : ""}
                                                    <li><span><img id="imgUser" src={(typeUser === "Administrator") ? "../images/administrador1.0.png" : "../images/normalUser2.0.png"} />{userName}</span></li>
                                                </ul>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                break;

            case "Audiovisuales":
                subMenuHTML = (
                    <div className="divHeader container-fluid">
                        <div className="row">
                            <div className="btm_border">
                                <div className="h_bg">
                                    <div className="wrap">
                                        <div className="header">
                                            <div className="logo">
                                                <h1><a href="index.html"><img src="../images/BRGlogo.png" alt="" /></a></h1>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                        <div className='h_btm'>

                                            <div className='cssmenu'>
                                                <ul>
                                                    <li><a onClick={() => this.props.onClick("Prestamos", "loanForm")}><span>Prestamos</span></a></li>
                                                    <li><a onClick={() => this.props.onClick("Solicitantes", "applicantForm")}><span>Solicitantes</span></a></li>
                                                    <li className="active"><a onClick={() => this.props.onClick("Audiovisuales", "añadirAudio")}><span>Audiovisuales</span></a></li>
                                                    <li><a onClick={() => this.props.onClick("Historial", "tableLoans")}><span>Historial</span></a></li>
                                                    {(typeUser === "Administrator") ? statistics : ""}
                                                    <li><span><img id="imgUser" src={(typeUser === "Administrator") ? "../images/administrador1.0.png" : "../images/normalUser2.0.png"} />{userName}</span></li>
                                                </ul>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                break;

            case "Historial":
                subMenuHTML = (
                    <div className="divHeader container-fluid">
                        <div className="row">
                            <div className="btm_border">
                                <div className="h_bg">
                                    <div className="wrap">
                                        <div className="header">
                                            <div className="logo">
                                                <h1><a href="index.html"><img src="../images/BRGlogo.png" alt="" /></a></h1>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                        <div className='h_btm'>

                                            <div className='cssmenu'>
                                                <ul>
                                                    <li><a onClick={() => this.props.onClick("Prestamos", "loanForm")}><span>Prestamos</span></a></li>
                                                    <li><a onClick={() => this.props.onClick("Solicitantes", "applicantForm")}><span>Solicitantes</span></a></li>
                                                    <li><a onClick={() => this.props.onClick("Audiovisuales", "añadirAudio")}><span>Audiovisuales</span></a></li>
                                                    <li className="active"><a onClick={() => this.props.onClick("Historial", "tableLoans")}><span>Historial</span></a></li>
                                                    {(typeUser === "Administrator") ? statistics : ""}
                                                    <li><span><img id="imgUser" src={(typeUser === "Administrator") ? "../images/administrador1.0.png" : "../images/normalUser2.0.png"} />{userName}</span></li>
                                                </ul>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                break;

            case "Estadisticas":
                subMenuHTML = (
                    <div className="divHeader container-fluid">
                        <div className="row">
                            <div className="btm_border">
                                <div className="h_bg">
                                    <div className="wrap">
                                        <div className="header">
                                            <div className="logo">
                                                <h1><a href="index.html"><img src="../images/BRGlogo.png" alt="" /></a></h1>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                        <div className='h_btm'>

                                            <div className='cssmenu'>
                                                <ul>
                                                    <li><a onClick={() => this.props.onClick("Prestamos", "loanForm")}><span>Prestamos</span></a></li>
                                                    <li><a onClick={() => this.props.onClick("Solicitantes", "applicantForm")}><span>Solicitantes</span></a></li>
                                                    <li><a onClick={() => this.props.onClick("Audiovisuales", "añadirAudio")}><span>Audiovisuales</span></a></li>
                                                    <li><a onClick={() => this.props.onClick("Historial", "tableLoans")}><span>Historial</span></a></li>
                                                    {(typeUser === "Administrator") ? statistics : ""}
                                                    <li><span><img id="imgUser" src={(typeUser === "Administrator") ? "../images/administrador1.0.png" : "../images/normalUser2.0.png"} />{userName}</span></li>
                                                </ul>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                break;

            default:
                break;
        }


        return subMenuHTML;



    }


}
