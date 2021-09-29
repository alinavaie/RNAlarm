import PushNotification, {Importance} from 'react-native-push-notification';

import NotificationHandler from './NotificationHandler';
import {Platform} from 'react-native';

export default class NotifService {
  constructor(onRegister, onNotification) {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    this.createDefaultChannels();

    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });

    PushNotification.getChannels(function (channels) {
      console.log(channels);
    });
  }

  createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // (required)
        channelName: 'Default channel', // (required)
        channelDescription: 'A default channel', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created =>
        console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.createChannel(
      {
        channelId: 'sound-channel1-id', // (required)
        channelName: 'Sound channel1', // (required)
        channelDescription: 'A sound channel', // (optional) default: undefined.
        soundName: 'nice.mp3', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created =>
        console.log(`createChannel 'sound-channel1-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.createChannel(
      {
        channelId: 'sound-channel2-id', // (required)
        channelName: 'Sound channel2', // (required)
        channelDescription: 'A sound channel', // (optional) default: undefined.
        soundName: 'pitch.mp3', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created =>
        console.log(`createChannel 'sound-channel2-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.createChannel(
      {
        channelId: 'sound-channel3-id', // (required)
        channelName: 'Sound channel3', // (required)
        channelDescription: 'A sound channel', // (optional) default: undefined.
        soundName: 'rush.mp3', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created =>
        console.log(`createChannel 'sound-channel3-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.createChannel(
      {
        channelId: 'sound-channel4-id', // (required)
        channelName: 'Sound channel4', // (required)
        channelDescription: 'A sound channel', // (optional) default: undefined.
        soundName: 'time.mp3', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created =>
        console.log(`createChannel 'sound-channel4-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  createOrUpdateChannel(soundName) {
    console.warn(soundName);
    this.lastChannelCounter++;
    PushNotification.createChannel(
      {
        channelId: 'custom-channel-id', // (required)
        channelName: `Custom channel - Counter: ${this.lastChannelCounter}`, // (required)
        channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
        // soundName: 'rush.mp3',
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  popInitialNotification() {
    PushNotification.popInitialNotification(notification =>
      console.log('InitialNotication:', notification),
    );
  }

  setChannel(sound) {
    let channel = 'default-channel-id';
    switch (sound) {
      case 'nice':
        channel = 'sound-channel1-id';
        break;
      case 'pitch':
        channel = 'sound-channel2-id';
        break;
      case 'rush':
        channel = 'sound-channel3-id';
        break;
      case 'time':
        channel = 'sound-channel4-id';
        break;
      default:
        channel = 'sound-channel1-id';
        break;
    }
    return channel;
  }

  setRepeatType(repeat) {
    let repeatType = null;
    switch (repeat) {
      case 'once':
        repeatType = null;
        break;
      case 'daily':
        repeatType = 'day';
        break;
      default:
        repeatType = 'week';
        break;
    }
    return repeatType;
  }

  scheduleNotif(alarm, time, index) {
    // console.log(time);
    // this.lastId++;
    PushNotification.localNotificationSchedule({
      // date: new Date(Date.now() + 10 * 1000), // in 30 secs
      date: new Date(time),
      /* Android Only Properties */
      channelId: this.setChannel(alarm.sound),
      // ticker: emptyProperty, // (optional)
      // autoCancel: false, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      // bigText: emptyProperty, // (optional) default: "message" prop
      // subText: emptyProperty, // (optional) default: none
      // color: 'white', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 1000, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      // tag: emptyProperty, // (optional) add tag to message
      // group: emptyProperty, // (optional) add group to message
      // groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      // ongoing: false, // (optional) set whether this is an "ongoing" notification
      actions: ['Stop Alarm', 'Snooze'], // (Android only) See the doc for notification actions to know more
      invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      // when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      // usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      // timeoutAfter: 30000, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
      priority: 'high',
      visibility: 'private',
      importance: 'high',
      allowWhileIdle: false,
      ignoreInForeground: false,
      // alertAction: 'view',
      /* iOS only properties */
      // category: '', // (optional) default: empty string

      /* iOS and Android properties */
      id: alarm.id + index, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: alarm.label, // (optional)
      message: '', // (required)
      // userInfo: {snooz: alarm.snooze}, // (optional) default: {} (using null throws a JSON value '<null>' error)

      userInfo: {snoozId: alarm.id + index + 10, snoozeTime: alarm.snooze}, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: true, // (optional) default: true
      // soundName: emptyProperty, // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      // number: emptyProperty, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: this.setRepeatType(alarm.repeat),
      repeatTime: 1,
    });
  }

  snoozNotif(alarm, time, index, repeatMainNotif) {
    const emptyProperty = Platform.select({ios: '', android: null});
    // this.lastId++;
    console.log(new Date(time + 60 * 1000 * alarm.snooze));
    console.log(new Date(time));
    console.log(time);

    PushNotification.localNotificationSchedule({
      // date: new Date(Date.now() + 60 * 1000), // in 30 secs
      // date: alarm.time.setTime(alarm.time.getTime() + 1000 * 60 * alarm.snooze),
      // date: alarm.time,
      date: new Date(time + 60 * 1000 * alarm.snooze), // in 30 secs

      /* Android Only Prop erties */
      channelId: this.setChannel(alarm.sound),
      ticker: emptyProperty, // (optional)
      autoCancel: false, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: emptyProperty, // (optional) default: "message" prop
      subText: emptyProperty, // (optional) default: none
      color: 'white', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 1000, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: emptyProperty, // (optional) add tag to message
      group: emptyProperty, // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      actions: ['Stop'], // (Android only) See the doc for notification actions to know more
      invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: 30000, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
      priority: 'high',
      visibility: 'private',
      importance: 'high',
      allowWhileIdle: false,
      ignoreInForeground: false,
      alertAction: 'view',
      /* iOS only properties */
      category: '', // (optional) default: empty string

      /* iOS and Android properties */
      id: alarm.id + index, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: alarm.label, // (optional)
      message: '', // (required)
      userInfo: {snoozId: alarm.id + index, repeatMainNotif: repeatMainNotif}, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: true, // (optional) default: true
      soundName: emptyProperty, // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: emptyProperty, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: 'minute',
      repeatTime: alarm.snooze,
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  cancelNotif(id) {
    PushNotification.cancelLocalNotification(id);
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  abandonPermissions() {
    PushNotification.abandonPermissions();
  }

  getScheduledLocalNotifications(callback) {
    PushNotification.getScheduledLocalNotifications(callback);
  }

  getDeliveredNotifications(callback) {
    PushNotification.getDeliveredNotifications(callback);
  }
}
