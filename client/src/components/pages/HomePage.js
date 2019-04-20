import React, { Component } from "react";
import {withStyles} from "@material-ui/core/styles";
import {Route, withRouter} from "react-router-dom";

const styles = theme => ({

})

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <h1>Home Page</h1>
            </React.Fragment>
        )
    }
}

export default withStyles(styles, { withTheme: true })(HomePage);