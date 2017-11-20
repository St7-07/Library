import React from "react";
import "../styles/content.css";
import { SubMenu } from "./SubMenu";

export const Content = (props) => {

    let contentHtml = (
        <div className="contentDiv container">
            <div className="row">
                <div className="col-xs-12">
                </div>
            </div>

            <div className="row">
                <SubMenu subMenuType={props.sectionType}/>
            </div>
        </div>
    );

    return contentHtml;
}