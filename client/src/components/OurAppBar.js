import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {connect} from 'react-redux';
import store from '../state';
import {showLeftMenu, setActiveAccount} from '../state/actions';
import leak0xLogo from "../images/leak0x.png";
import {Link} from "react-router-dom";
import { PublicAddress, Blockie } from 'rimble-ui';

console.log('store',store.getState());

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 5,
  }
};

class OurAppBar extends React.Component {
  constructor(props) {
    super(props);
    store.subscribe(() => {
      this.setState({
        showLeftMenu: store.getState().showLeftMenu,
        activeAccount: store.getState().setActiveAccount
      });
    });
  }

  state = {
    anchorEl: null,
  };

  componentDidMount() {
    const {accounts} = this.props;
    if((accounts && accounts[0]) && this.state.activeAccount !== accounts[0]){
      this.props.dispatch(setActiveAccount(accounts[0]));
    }
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleMenu = () => {
      this.props.dispatch(showLeftMenu(!this.state.showLeftMenu));
  }

  render() {
    const { classes, accounts, dispatch } = this.props;
    const { activeAccount, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
      <AppBar position="static" className="transparent our-gradient">
          <Toolbar>
          </Toolbar>
        </AppBar>
        <AppBar position="fixed" className="our-gradient">
          <Toolbar>
            <IconButton onClick={() => this.toggleMenu()} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Link to="/" className={"logo-container" + " " + classes.grow}>
              <img src={leak0xLogo} alt="leak0x Logo"/>
            </Link>
            {activeAccount && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

OurAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(OurAppBar));