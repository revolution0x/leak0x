import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import store from '../state';
import {connect} from 'react-redux';
import {showLeftMenu} from '../state/actions';
import {Link} from 'react-router-dom';


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class OurDrawers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            top: false,
            left: store.getState().showLeftMenu,
            bottom: false,
            right: false,
        };
        store.subscribe(() => {
            this.setState({
                left: store.getState().showLeftMenu
            });
        });
    }

  

  toggleDrawer = (side, open) => () => {
    if(side === "left"){
        this.props.dispatch(showLeftMenu(open));
    }
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
            <Link to={'/'} className={"no-decorate"}>
                <ListItem button key={"Home"}>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary={"Home"} />
                </ListItem>
            </Link>
            <Link to={'/create'} className={"no-decorate"}>
                <ListItem button key={"Create"}>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary={"Create"} />
                </ListItem>
            </Link>
            <Link to={'/discover'} className={"no-decorate"}>
                <ListItem button key={"Discover"}>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary={"Discover"} />
                </ListItem>
            </Link>
        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

OurDrawers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(OurDrawers));