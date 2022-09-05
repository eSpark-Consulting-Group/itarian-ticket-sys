import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';

import styles from './style';
import {DateRangeSelector, EmptyListMsg, FloatButton} from '../../components';
import {timeSheetList} from '../../constants/SampleArrays';
import {TimeSheetAdditionalButtons} from '../../constants/ButtonsList';
import {AdditionalButtons, TimeSheet} from '../../types';
import ListItem from '../Agenda/ListItem';
import {getDatesInRange} from '../../utils/helperFunctions';

const TimeSheetsScreen = ({navigation}: any) => {
  const {colors}: Theme = useTheme();
  const [isDate, setIsDate] = useState(false);
  const [totHrs, setTotHrs] = useState(0);
  const [dateArr, setDateArr] = useState([
    {date: new Date()},
    {date: new Date()},
  ]);
  const [sheetData, setSheetData] = useState<TimeSheet[]>([]);
  const [actionButtons, setActionButtons] = useState<AdditionalButtons[]>(
    TimeSheetAdditionalButtons,
  );

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
    const dates = getDatesInRange(date1, date2);
    let Expense = 0;
    timeSheetList.map(i => {
      i.date >= date1 && i.date <= date2
        ? (Expense = Expense + i.totHrs)
        : null;
    });
    const data: TimeSheet[] = dates.map((date, ind) => {
      const index = timeSheetList.findIndex(val => {
        return val.date.toDateString() == date.toDateString();
      });

      if (index != -1) {
        return {
          id: ind + 1,
          date: new Date(date),
          totHrs: 2.5,
          data: timeSheetList[index].data,
        };
      } else {
        return {
          id: ind + 1,
          date: new Date(date),
          totHrs: 2.5,
          data: null,
        };
      }
    });

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
              <ListItem
                onPress={ticket => {
                  navigation.navigate('Stack1', {
                    screen: 'STickets',
                    params: {title: ticket.ticket_no.toString()},
                  });
                }}
                dataSource={item}
                renderDate={true}
              />
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
