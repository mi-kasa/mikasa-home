/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
//import Drawer from 'material-ui/Drawer';
import StatusDrawer  from './StatusDrawer'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IFrame from 'react-iframe';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      drawerOpen: false,
      installed_apps: [],
      current_page: ''
    };
  }

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }

  componentDidMount() {
    // Get installed apps
    fetch('/api/v1/packages/installed').
      then(response => {
        return response.json()
      }).
      then(apps => {
        var installed_apps = apps.map(app => {
          const pkg = app.package;
          return {
            name: pkg.name,
            description: pkg.description
          }
        });
        this.setState({installed_apps});
      });
  }

  navigate(url) {
    this.setState({
      current_page: url,
      drawerOpen: false
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <AppBar
          title="Mi-Kasa"
          onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
          onTitleTouchTap={this.toggleDrawer.bind(this)}
          iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <StatusDrawer
          drawerOpen={this.state.drawerOpen}
          toggleDrawer={this.toggleDrawer.bind(this)}
          apps={this.state.installed_apps}
          navigator={this.navigate.bind(this)}/>
        <IFrame
            url={this.state.current_page}
          />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
