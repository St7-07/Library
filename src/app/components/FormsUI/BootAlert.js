import React from 'react';

class BootAlert extends React.Component {
    
        constructor(props) {
            super();
            this.state = {
                hidden : 'true'
            };
        }

        hide () {
            document.getElementById('alert').hidden = true;
        }

        render() {
            return (
                <div class="alert alert-success alert-dismissable fade in" id="alert" hidden={"true"}>
                    <button class="close" onClick={() => this.hide()} aria-label="close" >&times;</button>
                    <strong>{this.props.title}</strong> {this.props.message}
                </div>
            );
        }

};

export default BootAlert;