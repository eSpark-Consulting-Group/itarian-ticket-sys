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
} from '../../constants/SampleArrays';
import ListItem from '../Agenda/ListItem';

const TimeSheetsScreen = () => {
  const {colors}: Theme = useTheme();
  const [isDate, setIsDate] = useState(false);
  const [dateArr, setDateArr] = useState([
    {date: new Date()},
    {date: new Date()},
  ]);

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
    setIsDate(true);
  };

  return (
    <View style={styles.container}>
      <DateRangeSelector
        fetchData={(date1: Date, date2: Date) => getDate(date1, date2)}
        total={'4.00'}
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
          <Text>Please Select Date Range</Text>
        </View>
      )}
      <FloatButton AdditionalButtons={SchAdditionalButtons} />
    </View>
  );
};

export default TimeSheetsScreen;
