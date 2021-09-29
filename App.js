/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import Alarms from './src/screens/Alarms';
import NotifService from './NotifService';

const notif = new NotifService();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sound: 'default',
    };
  }

  render() {
    return <Alarms notif={notif} />;
  }
}
