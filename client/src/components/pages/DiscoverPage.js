import React, { Component } from "react";
import {withStyles} from "@material-ui/core/styles";
import {Route, withRouter} from "react-router-dom";

const styles = theme => ({

})

class DiscoverPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <h1>Discover Page</h1>
                <h1>Discover Page</h1>
                <h1>Discover Page</h1>
                <h1>Discover Page</h1>
                <h1>Discover Page</h1>
                <h1>Discover Page</h1>
                <h1>Discover Page</h1>
                <h1>Discover Page</h1>
                <h1>Discover Page</h1>
                <h1>Discover Page</h1>
                <h1>Discover Page</h1>
                <h1>Discover Page</h1>
                <h1>Discover Page</h1>
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(DiscoverPage));