import React from 'react';

class BootAlert extends React.Component {
    
        constructor(props) {
            super();
            this.state = {
                hidden : 'true'
            };
            let alertClass;
        }

        hide () {
            document.getElementById(this.props.id).hidden = true;
        }

        typeChanger = () => {

            switch(this.props.alertType){
                case 'success':
                    this.alertClass = 'alert alert-success alert-dismissable fade in';
                break;
                case 'warning':
                this.alertClass = 'alert alert-warning alert-dismissable fade in';
                break;
                case 'danger':
                this.alertClass = 'alert alert-danger alert-dismissable fade in'
                break;
                case 'neutral':
                this.alertClass = 'alert alert-info alert-dismissable fade in'
                break;
                default:
                this.alertClass = 'alert alert-success alert-dismissable fade in';
                break;
            }
        }

        render() {
            this.typeChanger();
            return (
                <div class={this.alertClass} id={this.props.id} hidden={"true"}>
                    <button class="close" onClick={() => this.hide()} aria-label="close" >&times;</button>
                    <strong>{this.props.title}</strong> {this.props.message}  
                        <a onClick={() => this.props.clicked()}> {this.props.link}</a>
                </div>
            );
        }

};

export default BootAlert;