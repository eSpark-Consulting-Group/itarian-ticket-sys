import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  const [dateArr, setDateArr] = useState([
    {date: new Date()},
    {date: new Date()},
  ]);

  let totExp = 0;

  // useEffect(() => {
  //   expReportList.map(i => (totExp = totExp + i.totExp));
  //   console.log('totExpense', totExp);
  // }, []);

  const getDate = (date1: Date, date2: Date) => {
    let now = new Date();
    const d1 = new Date(now.setDate(now.getDate() - 30));
    const d2 = new Date(2022, 7, 5);
    let datArr = [...dateArr];
    datArr[0].date = date1;
    datArr[1].date = date2;
    setDateArr(datArr);
    console.log('datArr------>', datArr);
    console.log('currdat------>', d1);
    expReportList.map(i =>
      i.date > date1 && i.date < date2 ? (totExp = totExp + i.totExp) : null,
    );
    setIsDate(true);
  };

  return (
    <View style={styles.container}>
      <DateRangeSelector
        fetchData={(date1: Date, date2: Date) => getDate(date1, date2)}
        total={totExp.toFixed(2)}
      />
      {isDate ? (
        <FlatList
          data={expReportList}
          renderItem={({item}) => (
            <ListItem id={item.id} item={item} dateRange={dateArr} />
          )}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{color: colors.text}}>Please Select Date Range</Text>
        </View>
      )}
      <FloatButton AdditionalButtons={SchAdditionalButtons} />
    </View>
  );
};

export default ExpenseReportsScreen;
