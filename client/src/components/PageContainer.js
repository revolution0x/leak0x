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

})

class PageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // store.subscribe(() => {

    // });

    render() {
        return (
            <React.Fragment>
                <Route path="/" exact render={(props) => homeRoute(props)} />
                <Route path="/create" exact render={(props) => createRoute(props)} />
                <Route path="/discover" exact render={(props) => discoverRoute(props)} />
                <Route path="/settings" exact render={(props) => settingsRoute(props)} />
                {/* Profile default: <Route path="/:username" render={(props) => profileRoute} /> */}
            </React.Fragment>
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