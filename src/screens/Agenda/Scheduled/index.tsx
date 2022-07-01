import React, {useRef, useState} from 'react';
import {View, Text, FlatList, Dimensions, Animated} from 'react-native';

import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../../theme/colors';
import ListItem from '../ListItem';
import {FloatButton} from '../../../components';
import {
  SchAdditionalButtons,
  scheduledList,
} from '../../../constants/SampleArrays';

const ScheduledTab = () => {
  const {colors}: Theme = useTheme();

  return (
    <View style={styles.container}>
      <FlatList
        data={scheduledList}
        renderItem={({item}) => <ListItem id={item.id} item={item} />}
      />
      <FloatButton AdditionalButtons={SchAdditionalButtons} />
    </View>
  );
};

export default ScheduledTab;
