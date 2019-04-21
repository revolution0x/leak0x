import React, { Component } from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import {getWhistleblowerLeaks, getLeakFromLeakId} from "../../services/leak0x";
import {getFromIPFS, downloadFromIPFS} from "../../utils/ipfs";

const styles = theme => ({
    cardPadding: {
        padding: theme.spacing.unit * 2,
    }
})

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaks: []
        };
    }

    componentDidMount() {
        this.getWhistleblowerLeakCollection(this.props.address);
    }

    getWhistleblowerLeakCollection = async (address) => {
        let leaks = await getWhistleblowerLeaks(address);
        for(let leakIdBN of leaks) {
            const leakId = parseInt(leakIdBN);
            const leakRaw = await getLeakFromLeakId(leakId);
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
                    leaks: [...this.state.leaks, leak]
                })
            }
        }
    }

    render() {
        const {leaks} = this.state;
        const {classes, address} = this.props;
        console.log('leaks', leaks);
        return (
            <React.Fragment>
                <div className="text-align-center">
                    <Card className={"max-page-width auto-margins " + classes.cardPadding}>
                        <h1>Profile: {address}</h1>
                    </Card>
                    {leaks.map((leak, index) => {
                        return <Card className={"max-page-width auto-margins " + classes.cardPadding} key={leak.hash}>
                            <a href={"javascript:;"} rel="noopener noreferrer" onClick={() => downloadFromIPFS(leak.hash, leak.mimeType, leak.title)}>
                                {leak.title}
                            </a>
                        </Card>
                    })}
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(styles, { withTheme: true })(ProfilePage);