import React from "react";
import "../styles/content.css";
import SubMenu from "./SubMenu";
import ApplicantForm from "../containers/ApplicantForm";
import TableHandler from "../containers/TableHandler";
import EquipmentForm from "../containers/EquipmentForm";
import LoanForm from "../containers/LoanForm";
class Content extends React.Component {

    render() {
  
        let subContent;
        

        switch(this.props.subcontentType){
            case "applicantForm":
                subContent = <ApplicantForm function="CREATE" />
                break;
            case "studentsTable":
                subContent = <TableHandler tableType='students' />
                break;
            case "clerksTable":
                subContent = <TableHandler tableType='clerks' />
            break;
            case "tableDefaulters":
                subContent = <TableHandler tableType='defaulters'/>
                break;
            case "tableAV":
                subContent = <TableHandler tableType='av_equipment'/>
            break;
            case "tableLoans":
            subContent = <TableHandler tableType='loans'/>
            break;
            case "updateApplicant":
            subContent= <ApplicantForm function="UPDATE"/>
            break;
            case "añadirAudio":
            subContent= <EquipmentForm function="CREATE"/>
            break;
            case "añadirPrestamo": 
            subContent= <LoanForm function="CREATE"/>
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
                    <SubMenu subMenuType={this.props.sectionType} />
                </div>
            </div>
        );

        return (
            <div>{contentHtml}</div>
        );
    }


}

export default Content;