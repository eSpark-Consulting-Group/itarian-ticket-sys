import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../theme/colors';
import {DateRangeSelector, EmptyListMsg, FloatButton} from '../../components';
import {
  expReportList,
  SchAdditionalButtons,
  scheduledList,
  timeSheetList,
} from '../../constants/SampleArrays';
import {TimeSheet} from '../../types';
import ListItem from '../Agenda/ListItem';

const TimeSheetsScreen = () => {
  const {colors}: Theme = useTheme();
  const [isDate, setIsDate] = useState(false);
  const [totHrs, setTotHrs] = useState(0);
  const [dateArr, setDateArr] = useState([
    {date: new Date()},
    {date: new Date()},
  ]);
  const [sheetData, setSheetData] = useState<TimeSheet[]>([]);

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
    const data = timeSheetList.filter(
      i => i.date >= dateArr[0].date && i.date <= dateArr[1].date,
    );
    setImmediate(() => {
      setSheetData(data);
      setImmediate(() => {
        setIsDate(true);
      });
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
        sheetData.length > 0 ? (
          <FlatList
            data={sheetData}
            renderItem={({item}) => (
              <ListItem dataSource={item} renderDate={true} />
            )}
          />
        ) : (
          <NotFound />
        )
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{color: colors.text}}>Please Select Date Range</Text>
        </View>
      )}
      <FloatButton AdditionalButtons={SchAdditionalButtons} />
    </View>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Data" />
    </View>
  );
};

export default TimeSheetsScreen;
