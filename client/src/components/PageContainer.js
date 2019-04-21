import React, { Component } from "react";
import {withStyles} from "@material-ui/core/styles";
import {Route, withRouter} from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import DiscoverPage from "./pages/DiscoverPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import LeakPage from "./pages/LeakPage";
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
                <Route path="/" exact render={(props) => createRoute(props)} />
                <Route path="/leak" exact render={(props) => leakRoute(props)} />
                <Route path="/leak/:leakHash" exact render={(props) => leakRoute(props)} />
                <Route path="/discover" exact render={(props) => discoverRoute(props)} />
                <Route path="/settings" exact render={(props) => settingsRoute(props)} />
                <Route path="/whistleblower/:username" exact render={(props) => profileRoute(props)} />
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

const leakRoute = ({match}, props) => {
    if(match && match.params && match.params.leakHash) {
        const leakHash = match.params.leakHash;
        return <LeakPage leakHash={leakHash}/>
    }else{
        return <LeakPage/>
    }
}

const profileRoute = ({match}, props) => {
    if(match && match.params && match.params.username) {
        const username = match.params.username;
        return <ProfilePage address={username} />
    }else{
        return <ProfilePage/>
    }   
}

const discoverRoute = (props) => {
    return <DiscoverPage/>
}

const settingsRoute = (props) => {
    return <SettingsPage/>
}

export default withRouter(withStyles(styles, { withTheme: true })(PageContainer));