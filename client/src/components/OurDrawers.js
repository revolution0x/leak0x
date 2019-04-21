import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/LeakAdd';
import ViewLeakIcon from '@material-ui/icons/Visibility';
import DiscoverIcon from '@material-ui/icons/Explore';
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
            {/* <Link to={'/'} className={"no-decorate"}>
                <ListItem button key={"Home"}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary={"Home"} />
                </ListItem>
            </Link> */}
            <Link to={'/'} className={"no-decorate"}>
                <ListItem button key={"Create"}>
                <ListItemIcon><CreateIcon /></ListItemIcon>
                <ListItemText primary={"Create"} />
                </ListItem>
            </Link>
            <Link to={'/leak'} className={"no-decorate"}>
                <ListItem button key={"View Leak"}>
                <ListItemIcon><ViewLeakIcon /></ListItemIcon>
                <ListItemText primary={"View Leak"} />
                </ListItem>
            </Link>
            <Link to={'/discover'} className={"no-decorate"}>
                <ListItem button key={"Discover"}>
                <ListItemIcon><DiscoverIcon /></ListItemIcon>
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