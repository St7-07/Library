import React from "react";
import "../styles/content.css";
import  SubMenu  from "./SubMenu";
import ApplicantForm from "../containers/ApplicantForm";
import TableHandler from "../containers/TableHandler";

class Content extends React.Component {

    render(){
        let subContent;
        
        
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
        )
    }


    
    // switch(state.subcontent){

    // }

}

export default Content;