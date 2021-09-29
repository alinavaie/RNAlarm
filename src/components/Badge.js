import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {moderateScale, scale, verticalScale} from '../utils/Scaling';

import {Colors} from '../constant';
import React from 'react';

function Badge(props) {
  const {item, value, setValue} = props;
  return (
    <TouchableOpacity
      onPress={() => setValue(item)}
      style={[
        styles.badgeContainer,
        {
          backgroundColor:
            value[item]?.selected || value === item
              ? Colors.SECONDARY
              : 'white',
        },
      ]}>
      <Text
        style={[
          styles.badgeTitle,
          {
            color:
              !value[item]?.selected && value !== item
                ? Colors.PRIMARY
                : 'white',
          },
        ]}>
        {item} {typeof item === 'number' ? ' min' : ''}
      </Text>
    </TouchableOpacity>
  );
}

export default Badge;

const styles = StyleSheet.create({
  badgeContainer: {
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(4),
    borderRadius: 8,
    backgroundColor: 'white',
    marginHorizontal: verticalScale(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTitle: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    textTransform: 'uppercase',
  },
});
