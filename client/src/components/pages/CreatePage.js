import React, { Component } from "react";
import {withStyles} from "@material-ui/core/styles";
import CreateLeakForm from "../CreateLeakForm";
import Card from '@material-ui/core/Card';

const styles = theme => ({
    cardPadding: {
        padding: theme.spacing.unit * 2,
    }
})

class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <div className="text-align-center">
                    <Card className={"max-page-width auto-margins " + classes.cardPadding}>
                        <h1>Create Leak</h1>
                        <CreateLeakForm/>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(styles, { withTheme: true })(CreatePage);