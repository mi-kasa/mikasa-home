import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

class StatusDrawer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const apps = this.renderInstalledApps();
    return (
        <Drawer
          docked={false}
          width={200}
          open={this.props.drawerOpen}
          onRequestChange={(drawerOpen) => {this.props.toggleDrawer()}}
        >
          <div>
            <Card>
              <CardHeader
                title="Francisco Jordano"
                subtitle="administrator"
                avatar="https://pbs.twimg.com/profile_images/1202630894/uh_bigger.jpg"
              />
            </Card>
            {apps}
            <Divider />
            <List>
              <Subheader>Configuration</Subheader>
            </List>
          </div>
        </Drawer>
    );
  }

  renderInstalledApps() {
    if (!this.props.drawerOpen) {
      return <div/>;
    }
    var items = [];
    this.props.apps.forEach((app, index) => {
      const mounted = `mounted at ${app.mount}`;
      items.push(<ListItem
            primaryText={app.name}
            secondaryText={mounted}
            key={index}
            onTouchTap={this.props.navigator.bind(null, app.mount)}
          />)
    });
    return (
      <List>
        <Subheader>Applications</Subheader>
        {items}
      </List>
    );
  }
}

export default StatusDrawer;
