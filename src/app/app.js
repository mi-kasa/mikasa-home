import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main';
import Config from './Config';

injectTapEventPlugin();

const view = document.location.pathname;

switch(view) {
  case '/config.html':
    render(<Config />, document.getElementById('app'));
    break;
  default:
    render(<Main />, document.getElementById('app'));
}
