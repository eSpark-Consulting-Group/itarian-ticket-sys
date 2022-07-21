import {View, Text, FlatList} from 'react-native';
import React from 'react';
import styles from './style';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../theme/colors';
import {FloatButton} from '../../components';
import {
  expReportList,
  SchAdditionalButtons,
  scheduledList,
} from '../../constants/SampleArrays';
import ListItem from '../Agenda/ListItem';

const ExpenseReportsScreen = () => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <FlatList
        data={expReportList}
        renderItem={({item}) => <ListItem id={item.id} item={item} />}
      />
      <FloatButton AdditionalButtons={SchAdditionalButtons} />
      {/* <Text style={{color: colors.text}}>Expense Reports Screen</Text> */}
    </View>
  );
};

export default ExpenseReportsScreen;
