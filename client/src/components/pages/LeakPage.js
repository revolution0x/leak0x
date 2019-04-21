import React, { Component } from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import {getLeakFromIpfsHash} from '../../services/leak0x';
import {withRouter} from "react-router-dom";
import {downloadFromIPFS} from '../../utils/ipfs';

const styles = theme => ({
    cardPadding: {
        padding: theme.spacing.unit * 2,
    }
})

class LeakPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (this.props.leakHash) {
            this.getLeakFromLeakHash(this.props.leakHash);
        }
    }

    getLeakFromLeakHash = async (leakHash) => {
        const leakRaw = await getLeakFromIpfsHash(leakHash);
        if (leakRaw && leakRaw[1] && leakRaw[3] && leakRaw[4]) {
            const leakIpfsHash = leakRaw[1];
            const leakTitle = leakRaw[3];
            const mimeType = leakRaw[4];
            const leak = {
                title: leakTitle,
                hash: leakIpfsHash,
                mimeType: mimeType
            }
            this.setState({
                leak
            })
        }
    }

    setLeak = event => {
        this.props.history.push("/leak/" + event.target.value);
    }

    render() {
        const {classes, leakHash} = this.props;
        const {leak} = this.state;
        return (
            <React.Fragment>
                <div className="text-align-center">
                    <Card className={"max-page-width auto-margins " + classes.cardPadding}>
                        <h1>Leak</h1>
                        {leakHash && leak && <a href={"javascript:;"} rel="noopener noreferrer" onClick={() => downloadFromIPFS(leak.hash, leak.mimeType, leak.title)}>
                            {leak.title}
                        </a>}
                        {(!leak || !leakHash) &&
                        <TextField
                        id="leak-search-hash"
                        label="Leak Hash"
                        className={classes.textField + " fullwidth"}
                        onChange={(event) => this.setLeak(event)}
                        margin="none"
                      />
                        }
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(LeakPage));