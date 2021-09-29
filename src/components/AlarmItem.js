import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale, verticalScale} from '../utils/Scaling';

import {Colors} from '../constant';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import React from 'react';
import moment from 'moment';

const AlarmItem = props => {
  const {label, time, repeat, active} = props.alarm;

  const getRepeat = () => {
    let repeatType = 'once';
    switch (repeat) {
      case 'daily':
        repeatType = 'Every day';
        break;
      case 'weekly':
        repeatType = `Every ${moment(time).format('dddd')}`;
        break;
      case 'weekday':
        repeatType = 'Mon | Tue | Wed | Thu | Fri';
        break;
      case 'weekend':
        repeatType = 'Sat | Sun';
        break;
      default:
        repeatType = 'once';
        break;
    }
    return repeatType;
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.labelStyle}>{!!label ? label : 'New Alarm'}</Text>
        <Text style={styles.timeStyle}>
          {moment(time).format('hh : mm')}
          <Text style={styles.afternoonStyle}>
            {moment(time).isAfter(moment({hour: 12, minute: 0}))
              ? ' PM'
              : ' AM'}
          </Text>
        </Text>
        <View style={styles.daysContainer}>
          <Text style={styles.onTime}>{getRepeat()}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={props.deactiveAlarm}>
          <Icon
            name={active ? 'bell-o' : 'bell-slash-o'}
            size={20}
            color={active ? Colors.LIGHT_GRAY : Colors.SECONDARY}
            style={{marginRight: scale(10)}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.deleteAlarm}>
          <Icon
            name={'trash-o'}
            size={22}
            color={Colors.LIGHT_GRAY}
            style={{marginHorizontal: scale(10)}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlarmItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'whitesmoke',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(3),
    width: '100%',
    marginBottom: verticalScale(10),
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    color: Colors.LIGHT_GRAY,
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  timeStyle: {
    color: Colors.PRIMARY,
    fontSize: moderateScale(23),
    fontWeight: '500',
  },
  afternoonStyle: {
    color: Colors.PRIMARY,
    fontSize: moderateScale(18),
    fontWeight: '400',
  },
  dayStyle: {
    color: Colors.LIGHT_GRAY,
    fontSize: moderateScale(11),
    paddingRight: scale(5),
    textTransform: 'uppercase',
  },
  onTime: {
    color: Colors.LIGHT_GRAY,
    fontSize: moderateScale(11),
    textTransform: 'uppercase',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
