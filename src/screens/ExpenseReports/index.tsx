import { View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';

import styles from './style';
import { Theme } from '../../theme/colors';
import { DateRangeSelector, FloatButton } from '../../components';
import {
  expReportList,
  SchAdditionalButtons,
  scheduledList,
} from '../../constants/SampleArrays';
import ListItem from '../Agenda/ListItem';

const ExpenseReportsScreen = () => {
  const { colors, dark }: Theme = useTheme();



  return (
    <View style={styles.container}>
      <DateRangeSelector />
      <FlatList
        data={expReportList}
        renderItem={({ item }) => <ListItem id={item.id} item={item} />}
      />
      <FloatButton AdditionalButtons={SchAdditionalButtons} />
      {/* <Text style={{color: colors.text}}>Expense Reports Screen</Text> */}
    </View>
  );
};

export default ExpenseReportsScreen;
