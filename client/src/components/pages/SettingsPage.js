import React, { Component } from "react";
import {withStyles} from "@material-ui/core/styles";
import {Route, withRouter} from "react-router-dom";

const styles = theme => ({

})

class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <h1>Settings Page</h1>
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(SettingsPage));