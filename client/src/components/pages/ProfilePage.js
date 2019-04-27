import React, { Component } from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import {getWhistleblowerLeaks, getLeakFromLeakId, getWhistleBlowerProfile} from "../../services/leak0x";
import {getFromIPFS, downloadFromIPFS} from "../../utils/ipfs";
import { Link } from "react-router-dom";
import { Blockie } from 'rimble-ui';

const styles = theme => ({
    cardPadding: {
        padding: theme.spacing.unit * 2,
    },
    cardMargin: {
        marginTop: theme.spacing.unit * 2,
    },
    headingMargin: {
        marginBottom: "0px"
    }
})

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaks: [],
            pseudonym: "",
            profilePicture: ""
        };
    }

    componentDidMount() {
        const {address} = this.props;
        this.getWhistleBlowerProfile(address);
        this.getWhistleblowerLeakCollection(address);
    }

    getWhistleBlowerProfile = async (address) => {
        let whistleBlowerProfile = await getWhistleBlowerProfile(address);
        let pseudonym = whistleBlowerProfile[1];
        let profilePicture = whistleBlowerProfile[5];
        this.setState({pseudonym, profilePicture});
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
        const {leaks, pseudonym, profilePicture} = this.state;
        const {classes, address} = this.props;
        console.log('leaks', leaks);
        return (
            <React.Fragment>
                <div className="text-align-center">
                    <Card className={"max-page-width auto-margins " + classes.cardPadding}>
                        {(profilePicture.length === 0) &&
                            <Blockie opts={{seed: address, size: 15, scale: 3}}></Blockie>
                        }
                        {(profilePicture.length > 0) &&
                            <img src={"https://ipfs.infura.io/ipfs/" + profilePicture}/>
                        }
                        <h1 className={classes.headingMargin}>
                            {(pseudonym.length > 0) && pseudonym}
                            {(pseudonym.length === 0) && address}
                        </h1>
                    </Card>
                    {leaks.map((leak, index) => {
                        return <Card className={"max-page-width auto-margins " + classes.cardPadding + " " + classes.cardMargin} key={leak.hash + index}>
                            <Link to={"/leak/" + leak.hash}>
                                {leak.title}
                            </Link>
                        </Card>
                    })}
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(styles, { withTheme: true })(ProfilePage);