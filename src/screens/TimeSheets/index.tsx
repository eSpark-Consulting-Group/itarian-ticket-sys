import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../theme/colors';
import {DateRangeSelector, FloatButton} from '../../components';
import {
  expReportList,
  SchAdditionalButtons,
  scheduledList,
  timeSheetList,
} from '../../constants/SampleArrays';
import ListItem from '../Agenda/ListItem';

const TimeSheetsScreen = () => {
  const {colors}: Theme = useTheme();
  const [isDate, setIsDate] = useState(false);
  const [totHrs, setTotHrs] = useState(0);
  const [dateArr, setDateArr] = useState([
    {date: new Date()},
    {date: new Date()},
  ]);

  const getDate = (date1: Date, date2: Date) => {
    let datArr = [...dateArr];
    datArr[0].date = date1;
    datArr[1].date = date2;
    setDateArr(datArr);
    let Expense = 0;
    timeSheetList.map(i => {
      i.date >= date1 && i.date <= date2
        ? (Expense = Expense + i.totHrs)
        : null;
    });
    setTotHrs(Expense);
    setIsDate(true);
  };

  const clearTotal = () => {
    setTotHrs(0);
    setIsDate(false);
  };

  return (
    <View style={styles.container}>
      <DateRangeSelector
        fetchData={(date1: Date, date2: Date) => getDate(date1, date2)}
        clearDate={clearTotal}
        total={totHrs.toFixed(2)}
        totalType={'hrs'}
      />
      {isDate ? (
        <FlatList
          data={timeSheetList}
          renderItem={({item}) => (
            <>
              {item.date >= dateArr[0].date && item.date <= dateArr[1].date && (
                <ListItem id={item.id} item={item} dateRange={dateArr} />
              )}
            </>
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

export default TimeSheetsScreen;
