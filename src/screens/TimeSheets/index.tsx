import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../theme/colors';
import {DateRangeSelector, EmptyListMsg, FloatButton} from '../../components';
import {

  TimeSheetAdditionalButtons,
  timeSheetList,
} from '../../constants/SampleArrays';
import {AdditionalButtons, TimeSheet} from '../../types';
import ListItem from '../Agenda/ListItem';

const TimeSheetsScreen = ({navigation} :any) => {
  const {colors}: Theme = useTheme();
  const [isDate, setIsDate] = useState(false);
  const [totHrs, setTotHrs] = useState(0);
  const [dateArr, setDateArr] = useState([
    {date: new Date()},
    {date: new Date()},
  ]);
  const [sheetData, setSheetData] = useState<TimeSheet[]>([]);
  const [actionButtons, setActionButtons] =
  useState<AdditionalButtons[]>(TimeSheetAdditionalButtons);

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[0].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewTimeSheet',
      });
    };
    setActionButtons(tempArr);
  };

  useEffect(() => {
    updatePress();
  }, []);

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
      <FloatButton AdditionalButtons={actionButtons} />
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
