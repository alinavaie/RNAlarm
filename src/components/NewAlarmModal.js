import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, scale, verticalScale} from '../utils/Scaling';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Badge from './Badge';
import {Colors} from '../constant';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import getNextDate from '../utils/GetNextDate';
import moment from 'moment';

var Sound = require('react-native-sound');

const repeatList = ['once', 'daily', 'weekly', 'weekday', 'weekend'];
const sounds = ['nice', 'pitch', 'rush', 'time'];
const snoozes = [5, 10, 15, 30];

const NewAlarmModal = props => {
  const {openModal, setOpenModal, alarmList, notif} = props;
  const [time, setTime] = useState(new Date());
  const [isAfterNoon, setIsAfternoom] = useState(false);
  const [repeat, setRepeat] = useState('once');
  const [selectedSound, setSelectedSound] = useState('nice');
  const [selectedSnooze, setSelectedSnooze] = useState(5);
  const [play, setPlay] = useState(false);
  const [alarm, setAlarm] = useState(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    setTime(new Date());
    setRepeat('once');
    setLabel('');
    setSelectedSound('nice');
    setSelectedSnooze(5);
  }, [openModal]);

  const storeData = async () => {
    // console.log('time', time);
    // console.log(time.getTime());
    // console.log(
    //   'snooze',
    //   time.setTime(time.getTime() + 1000 * 60 * selectedSnooze),
    // );
    console.log(moment(time).isAfter(moment(new Date())));
    const value = {
      id: Math.floor(Math.random() * 10000 + 1),
      label: !!label ? label : 'New Alarm',
      sound: selectedSound,
      snooze: selectedSnooze,
      notifNumber: repeat === 'weekend' ? 4 : repeat === 'weekday' ? 10 : 2,
      repeat: repeat,
      time: moment(time).isSameOrBefore(moment(new Date()))
        ? time.setDate(time.getDate() + 1)
        : time,

      active: true,
    };
    await alarmList.push(value);
    try {
      const jsonValue = JSON.stringify(alarmList);
      await AsyncStorage.setItem('@alarms', jsonValue);
      await setOpenModal(false);
      if (repeat === 'weekend' || repeat === 'weekday') {
        const dates = getNextDate(repeat, time);
        dates.forEach((date, index) => {
          console.log(date);
          // console.log(value.time);
          notif.scheduleNotif(value, date, index);
          notif.snoozNotif(value, date, index + 10);
        });
      } else {
        notif.scheduleNotif(value, value.time, 0);
        // notif.snoozNotif(value, value.time, 10, value.repeat !== 'once');
      }
    } catch (e) {
      // saving error
    }

    // event.persist();
  };
  const alarmControl = () => {
    setPlay(!play);

    var newaAlarm = new Sound(
      `${selectedSound}.mp3`,
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log(
          'duration in seconds: ' +
            newaAlarm.getDuration() +
            'number of channels: ' +
            newaAlarm.getNumberOfChannels(),
        );
        // Play the sound with an onEnd callback
        newaAlarm.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
          newaAlarm.release();
        });
      },
    );
    setAlarm(newaAlarm);
  };

  const stopAlarm = () => {
    setPlay(false);
    alarm.stop(() => alarm.release(setAlarm(null)));
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        // transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(!openModal);
        }}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <TouchableOpacity onPress={() => setOpenModal(false)}>
              <Icon name="close" size={30} color={Colors.PRIMARY} />
            </TouchableOpacity>
            <TouchableOpacity onPress={storeData}>
              <Icon name="check" size={30} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
          <Text style={styles.wakeText}>
            Wake me up at{' '}
            <Text style={styles.timeDisplay}>
              {moment(time).format('h:mm')}
              <Text style={styles.noonStyle}>
                {isAfterNoon ? ' PM' : ' AM'}
              </Text>
            </Text>
          </Text>

          <DatePicker
            date={new Date(time)}
            textColor={Colors.PRIMARY}
            mode="time"
            androidVariant="nativeAndroid"
            onDateChange={t => {
              setTime(t.getTime());
              setIsAfternoom(moment(t).isAfter(moment({hour: 12, minute: 0})));
            }}
          />
          <View style={styles.bottomContainer}>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subTitleText}>Label</Text>
            </View>
            <TextInput
              style={styles.textInputStyle}
              placeholder="eg: Wake Up Alarm"
              maxLength={30}
              onChangeText={setLabel}
            />
            <View style={styles.subTitleContainer}>
              <Text style={styles.subTitleText}>Repeat</Text>
            </View>
            <View style={[styles.badgeListContainer, {width: '100%'}]}>
              {repeatList.map((item, index) => (
                <Badge
                  key={index}
                  item={item}
                  value={repeat}
                  setValue={() => setRepeat(item)}
                />
              ))}
            </View>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subTitleText}>Sound</Text>
            </View>
            <View style={styles.soundsContainer}>
              <View style={styles.badgeListContainer}>
                {sounds.map((item, index) => (
                  <Badge
                    key={index}
                    item={item}
                    value={selectedSound}
                    setValue={() => {
                      if (play) {
                        stopAlarm();
                      }
                      setSelectedSound(item);
                    }}
                  />
                ))}
              </View>
              {play ? (
                <TouchableOpacity onPress={stopAlarm}>
                  <Icon
                    name={'stop-circle'}
                    size={30}
                    color={Colors.SECONDARY}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={alarmControl}>
                  <Icon
                    name={'play-circle'}
                    size={30}
                    color={Colors.SECONDARY}
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.subTitleContainer}>
              <Text style={styles.subTitleText}>Snooze</Text>
            </View>
            <View style={[styles.badgeListContainer, {width: '100%'}]}>
              {snoozes.map((item, index) => (
                <Badge
                  key={index}
                  item={item}
                  value={selectedSnooze}
                  setValue={setSelectedSnooze}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewAlarmModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: verticalScale(22),
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    marginTop: verticalScale(22),
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  wakeText: {
    fontSize: moderateScale(40),
    fontWeight: '200',
    color: Colors.DARK_GRAY,
    marginBottom: verticalScale(15),
  },
  timeDisplay: {
    fontSize: moderateScale(45),
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  noonStyle: {
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  badgeListContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
  },
  subTitleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),
  },
  subTitleText: {
    color: Colors.DARK_GRAY,
    fontSize: moderateScale(18),
    fontWeight: '300',
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  bottomContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: verticalScale(10),
    backgroundColor: 'whitesmoke',
    borderRadius: 12,
    paddingHorizontal: scale(12),
  },
  soundsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInputStyle: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 5,
  },
});
