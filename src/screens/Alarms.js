import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, scale, verticalScale} from '../utils/Scaling';

import AlarmItem from '../components/AlarmItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../constant';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import NewAlarmModal from '../components/NewAlarmModal';
import getNextDates from '../utils/GetNextDate';
import moment from 'moment';

const Alarms = props => {
  const {notif} = props;
  const [openModal, setOpenModal] = useState(false);
  const [alarmList, setAlaramList] = useState([]);

  useEffect(() => {
    fetchAlarms();
  }, [openModal]);

  useEffect(() => {
    const alarimListCopy = alarmList;
    alarmList.forEach((alarm, index) => {
      if (
        alarm.active &&
        alarm.repeat === 'once' &&
        moment(alarm.time).isBefore(moment(new Date()))
      ) {
        alarmList[index].active = false;
        storeAlarms(alarimListCopy);
      }
    });
  }, [alarmList.length]);

  const fetchAlarms = async () => {
    try {
      const value = await AsyncStorage.getItem('@alarms');
      if (value !== null) {
        // We have data!!
        const alarms = JSON.parse(value);
        setAlaramList(alarms);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const storeAlarms = async newList => {
    try {
      const jsonValue = JSON.stringify(newList);
      await AsyncStorage.setItem('@alarms', jsonValue);
      await fetchAlarms();
    } catch (e) {
      // saving error
    }
  };

  const deleteAlarm = selectedItem => {
    console.log(selectedItem);
    const filteredList = alarmList.filter(
      alarm => alarm.id !== selectedItem.id,
    );
    storeAlarms(filteredList);
    if (
      selectedItem.repeat === 'weekend' ||
      selectedItem.repeat === 'weekday'
    ) {
      for (let i = 0; i < selectedItem.notifNumber; i++) {
        notif.cancelNotif(selectedItem.id + i);
        notif.cancelNotif(selectedItem.id + i + 10);
      }
    } else {
      notif.cancelNotif(selectedItem.id);
      notif.cancelNotif(selectedItem.id + 10);
    }
  };

  const deactiveAlarm = selectedItem => {
    const copyList = alarmList;
    const selectedIndex = copyList.findIndex(
      item => item.id === selectedItem.id,
    );
    copyList[selectedIndex].active = !copyList[selectedIndex].active;

    if (copyList[selectedIndex].active) {
      if (
        selectedItem.repeat === 'weekend' ||
        selectedItem.repeat === 'weekday'
      ) {
        const dates = getNextDates(selectedItem.repeat, selectedItem.time);
        dates.forEach((date, index) => {
          notif.scheduleNotif(selectedItem, date, index);
          notif.snoozNotif(selectedItem, date, index + 10);
        });
      } else {
        notif.scheduleNotif(selectedItem, selectedItem.time, 0);
        notif.snoozNotif(
          selectedItem,
          selectedItem.time,
          10,
          selectedItem.repeat !== 'once',
        );
      }
    } else {
      if (
        selectedItem.repeat === 'weekend' ||
        selectedItem.repeat === 'weekday'
      ) {
        for (let i = 0; i < selectedItem.notifNumber; i++) {
          notif.cancelNotif(selectedItem.id + i);
          notif.cancelNotif(selectedItem.id + i + 10);
        }
      } else {
        notif.cancelNotif(selectedItem.id);
        notif.cancelNotif(selectedItem.id + 10);
      }
    }

    // console.log(copyList);
    storeAlarms(copyList);
  };

  const renderItem = ({item}) => (
    <AlarmItem
      alarm={item}
      deleteAlarm={() => deleteAlarm(item)}
      deactiveAlarm={() => deactiveAlarm(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        <Icon name={'clock-o'} size={scale(28)} color={Colors.SECONDARY} />{' '}
        Alarms
      </Text>
      <FlatList
        style={{width: '100%'}}
        data={alarmList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.getScheduledLocalNotifications(notifs => console.log(notifs));
        }}>
        <Text>Show notifications list</Text>
      </TouchableOpacity>

      <View style={styles.addButton}>
        {alarmList.length === 0 && (
          <Image
            source={require('../../assets/img/addNew.png')}
            style={{
              width: '50%',
              aspectRatio: 2,
              opacity: 0.3,
              marginBottom: verticalScale(10),
            }}
          />
        )}
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <Icon
            name={'plus-circle'}
            size={scale(60)}
            color={Colors.SECONDARY}
          />
        </TouchableOpacity>
      </View>

      <NewAlarmModal
        alarmList={alarmList}
        openModal={openModal}
        setOpenModal={setOpenModal}
        notif={notif}
      />
    </SafeAreaView>
  );
};

export default Alarms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(20),
    width: '100%',
  },
  addButton: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: verticalScale(20),
    left: 0,
    right: 0,
  },
  title: {
    fontSize: moderateScale(30),
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: verticalScale(15),
  },
});
