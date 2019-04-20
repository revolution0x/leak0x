import React, { Component } from "react";
import {withStyles} from "@material-ui/core/styles";
import {Route, withRouter} from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import DiscoverPage from "./pages/DiscoverPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import { connect } from "react-redux";

const styles = theme => ({
    pageContainer: {
        padding: theme.spacing.unit * 4
    }
})

class PageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // store.subscribe(() => {

    // });

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.pageContainer}>
                <Route path="/" exact render={(props) => homeRoute(props)} />
                <Route path="/create" exact render={(props) => createRoute(props)} />
                <Route path="/discover" exact render={(props) => discoverRoute(props)} />
                <Route path="/settings" exact render={(props) => settingsRoute(props)} />
                {/* Profile default: <Route path="/:username" render={(props) => profileRoute} /> */}
            </div>
        )
    }
    
}

const homeRoute = (props) => {
    return <HomePage/>
}

const createRoute = (props) => {
    return <CreatePage/>
}

const discoverRoute = (props) => {
    return <DiscoverPage/>
}

const settingsRoute = (props) => {
    return <SettingsPage/>
}

export default withRouter(withStyles(styles, { withTheme: true })(PageContainer));