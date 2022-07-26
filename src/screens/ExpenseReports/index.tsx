import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../theme/colors';
import {DateRangeSelector, FloatButton} from '../../components';
import {
  expReportList,
  SchAdditionalButtons,
  scheduledList,
} from '../../constants/SampleArrays';
import ListItem from '../Agenda/ListItem';

const ExpenseReportsScreen = () => {
  const {colors, dark}: Theme = useTheme();
  const [isDate, setIsDate] = useState(false);

  const getDate = (item: any) => {
    console.log('Item', item);
    setIsDate(true);
  };

  return (
    <View style={styles.container}>
      <DateRangeSelector fetchData={(item: any) => getDate(item)} />
      {isDate ? (
        <FlatList
          data={expReportList}
          renderItem={({item}) => <ListItem id={item.id} item={item} />}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>Please Select Date Range</Text>
        </View>
      )}
      <FloatButton AdditionalButtons={SchAdditionalButtons} />
    </View>
  );
};

export default ExpenseReportsScreen;
