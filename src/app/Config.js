import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toggle from 'material-ui/Toggle';
import CircularProgress from 'material-ui/CircularProgress';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Config extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      availableApps: [],
      installedApps: [],
      currentAction: null,
      actionTitle: '',
      actionDone: true
    };
  }

  updateModel() {
    var availableApps = [];
    var installedApps = [];
    return fetch('/api/v1/packages/search').
      then(res => {
        return res.json(); 
      }).
      then(available => {
        availableApps = available || [];
        return fetch('/api/v1/packages/installed');
      }).
      then(res => {
        return res.json();
      }).
      then(installed => {
        installed.forEach(app => {
          installedApps.push(app.package);
        });

        const newState = {
          availableApps,
          installedApps
        };

        this.setState(newState);

        return newState;
      });
  }

  componentDidMount() {
    this.updateModel();
  }

  onAppStatusChange(app, install) {
    if (install) {
      this.installApp(app);
    } else {
      this.uninstallApp(app);
    }
  }

  installApp(app) {
    this.setState({
      currentAction: 'installing',
      actionTitle: 'Installing ' + app.name,
      actionDone: true
    });
    fetch('/api/v1/packages/' + app.name, {
      method: 'POST'
    }).
    then(response => {
      if (response.status === 200) {
        return this.updateModel();
      }

      return Promise.reject(response.status);
    }).
    then(() => {
      this.setState({
        actionTitle: 'Installed correctly',
        actionDone: false
      });
    }).
    catch(e => {
      this.setState({
        actionTitle: 'Error during the installation: ' + e,
        actionDone: false
      });
    })
  }

  uninstallApp(app) {

  }

  renderItems() {
    var items = [];
    this.state.availableApps.forEach((app, index) => {
        const isInstalled =  !!this.state.installedApps.find((installed) => {
          return app.name === installed.name;
        });

        items.push(<ListItem
              primaryText={app.name}
              secondaryText={app.description}
              key={index}
              rightToggle={<Toggle 
                toggled={isInstalled} 
                onToggle={this.onAppStatusChange.bind(this, app, !isInstalled)}
                />}/>);
    });
    return items;
  }

  handleDialogClose() {
    this.setState( {
      currentAction: null,
      actionTitle: '',
      actionDone: true
    });
  }

  render() {
    const items = this.renderItems();
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
         <List>
          <Subheader>List of available web apps</Subheader>
          {items}
         </List>
         <Dialog
          title={this.state.actionTitle}
          modal={true}
          open={this.state.currentAction != null}
          actions={<FlatButton
            label="Done"
            primary={true}
            onTouchTap={this.handleDialogClose.bind(this)}
            disabled={this.state.actionDone}
          />}
         >
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <CircularProgress/>
          </div>
         </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Config;
