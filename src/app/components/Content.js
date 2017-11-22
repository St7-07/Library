import React from "react";
import "../styles/content.css";
import  SubMenu  from "./SubMenu";
import ApplicantForm from "../containers/ApplicantForm";
import TableHandler from "../containers/TableHandler";
import EquipmentForm from "../containers/EquipmentForm";

class Content extends React.Component {
    render(){
        console.log("Content rendered");        
        let subContent;
        
        console.log(this.props.subcontentType + " tipo de subcontenido******************");
        switch(this.props.subcontentType){
            case "applicantForm":
            subContent= <ApplicantForm function="CREATE" />
            break;
            case "applicantTable":
            subContent= <TableHandler/>
            break;
            case "tableDefaulters":
            subContent= <TableHandler/>
            break;
            case "updateApplicant":
            subContent= <ApplicantForm function="UPDATE"/>
            break;
            case "añadirAudio":
            subContent= <EquipmentForm function="CREATE"/>
            break;
        }

        let contentHtml = (
            <div className="contentDiv container">
                <div className="row">
                    <div className="col-xs-12">
                        {subContent}
                        
                    </div>
                </div>
    
                <div className="row">
                    <SubMenu subMenuType={this.props.sectionType}/>
                </div>
            </div>
        );

        return(
            <div>{contentHtml}</div>
        );
    }
}

export default Content;