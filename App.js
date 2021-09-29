/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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

    // this.notif = new NotifService(
    //   this.onRegister.bind(this),
    //   this.onNotif.bind(this),
    // );
  }

  render() {
    return (
      <Alarms notif={notif} />
      // <View style={styles.container}>
      //   <Text style={styles.title}>
      //     Example app react-native-push-notification
      //   </Text>
      //   <View style={styles.spacer}></View>
      //   <TextInput
      //     style={styles.textField}
      //     value={this.state.registerToken}
      //     placeholder="Register token"
      //   />
      //   <View style={styles.spacer}></View>

      //   <TouchableOpacity
      //     style={styles.button}
      //     onPress={() => {
      //       this.notif.localNotif('rush');
      //     }}>
      //     <Text>Local Notification (now)</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={styles.button}
      //     onPress={() => {
      //       this.notif.localNotif('pitch.mp3');
      //     }}>
      //     <Text>Local Notification with sound (now)</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={styles.button}
      //     onPress={() => {
      //       this.notif.scheduleNotif('pitch.mp3');
      //     }}>
      //     <Text>Schedule Notification in 30s</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={styles.button}
      //     onPress={() => {
      //       this.notif.scheduleNotif('sample.mp3');
      //     }}>
      //     <Text>Schedule Notification with sound in 30s</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={styles.button}
      //     onPress={() => {
      //       this.notif.cancelNotif();
      //     }}>
      //     <Text>Cancel last notification (if any)</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={styles.button}
      //     onPress={() => {
      //       this.notif.cancelAll();
      //     }}>
      //     <Text>Cancel all notifications</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={styles.button}
      //     onPress={() => {
      //       this.notif.checkPermission(this.handlePerm.bind(this));
      //     }}>
      //     <Text>Check Permission</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={styles.button}
      //     onPress={() => {
      //       this.notif.requestPermissions();
      //     }}>
      //     <Text>Request Permissions</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={styles.button}
      //     onPress={() => {
      //       this.notif.abandonPermissions();
      //     }}>
      //     <Text>Abandon Permissions</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={styles.button}
      //     onPress={() => {
      //       this.notif.getScheduledLocalNotifications(notifs =>
      //         console.log(notifs),
      //       );
      //     }}>
      //     <Text>Console.Log Scheduled Local Notifications</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={styles.button}
      //     onPress={() => {
      //       this.notif.getDeliveredNotifications(notifs => console.log(notifs));
      //     }}>
      //     <Text>Console.Log Delivered Notifications</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={styles.button}
      //     onPress={() => {
      //       this.notif.createOrUpdateChannel('rush.mp3');
      //     }}>
      //     <Text>Create or update a channel</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={styles.button}
      //     onPress={() => {
      //       this.notif.popInitialNotification();
      //     }}>
      //     <Text>popInitialNotification</Text>
      //   </TouchableOpacity>

      //   <View style={styles.spacer}></View>

      //   {this.state.fcmRegistered && <Text>FCM Configured !</Text>}

      //   <View style={styles.spacer}></View>
      // </View>
    );
  }

  // onRegister(token) {
  //   this.setState({registerToken: token.token, fcmRegistered: true});
  // }

  // onNotif(notif) {
  //   Alert.alert(notif.title, notif.message);
  // }

  // handlePerm(perms) {
  //   Alert.alert('Permissions', JSON.stringify(perms));
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 5,
    padding: 5,
    width: '70%',
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
