import React from "react";
import { connect } from "react-redux"

//Components 
import { User } from "../components/User";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";
import { Content } from "../components/Content";

import NavBar from "../components/NavBar";
import LogIn from "../components/Login";
//Actions
import { setName } from "../actions/userActions";
import { setSection } from "../actions/sectionActions";
import { setType } from "../actions/logInActions";


class App extends React.Component {

    render() {
        console.log("renderApp");
        switch (this.props.logInReducer.typeUser) {
            case "Administrator":
                return (
                    <div id="admin" className="container-flow" style={{ display: "none" }}>
                        <NavBar onClick={this.props.setSection} section={this.props.sectionReducer.actualSection} />
                        <Content sectionType={this.props.sectionReducer.actualSection} />
                        <Footer />
                    </div>
                );
                break;

            case "NormalUser":
                return (
                    <div id="admin" className="container-flow" style={{ display: "none" }}>
                        <NavBar onClick={this.props.setSection} section={this.props.sectionReducer.actualSection} />
                        <Content sectionType={this.props.sectionReducer.actualSection} />
                        <Footer />
                    </div>
                );
                break;
            default:
                return (
                    <div className="container-flow">
                        <LogIn setType={this.props.setType} />
                    </div>
                );
                break;
        }




    }

    componentDidUpdate() {
        $("#admin").slideDown("slow");
    }



}



// <Main changerUsername={() => this.props.setName("Anna")}/>
// User username={this.props.user.name}/>
//   <NavBar onClick={this.props.setSection} section={this.props.sectionReducer.actualSection}/>
//<Content sectionType={this.props.sectionReducer.actualSection}/>
//<Footer/>
const mapStateToProps = (state) => {
    return {
        sectionReducer: state.sectionReducer,
        logInReducer: state.logInReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setName(name));
        },
        setAge: (age) => {
            dispatch(setAge(age));
        },
        setSection: (section) => {
            
            dispatch(setSection(section));
        },
        setType: (type, name) => {
            dispatch(setType(type, name));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

