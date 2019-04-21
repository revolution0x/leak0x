import React, { Component } from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import {getLeakFromIpfsHash} from '../../services/leak0x';
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
        this.getLeakFromLeakHash(this.props.leakHash);
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

    render() {
        const {classes} = this.props;
        const {leak} = this.state;
        console.log('leak', leak);
        return (
            <React.Fragment>
                <div className="text-align-center">
                    <Card className={"max-page-width auto-margins " + classes.cardPadding}>
                        <h1>Leak</h1>
                        {leak && <a href={"javascript:;"} rel="noopener noreferrer" onClick={() => downloadFromIPFS(leak.hash, leak.mimeType, leak.title)}>
                            {leak.title}
                        </a>}
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(styles, { withTheme: true })(LeakPage);