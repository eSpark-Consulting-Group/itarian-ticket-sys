import React from 'react';
import {View, FlatList} from 'react-native';

import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../../theme/colors';
import ListItem from '../ListItem';
import {
  UnschAdditionalButtons,
  unscheduledList,
} from '../../../constants/SampleArrays';
import {FloatButton} from '../../../components';

const UnscheduledTab = () => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <FlatList
        data={unscheduledList}
        renderItem={({item}) => <ListItem id={item.id} item={item} />}
      />
      <FloatButton AdditionalButtons={UnschAdditionalButtons} />
    </View>
  );
};

export default UnscheduledTab;
