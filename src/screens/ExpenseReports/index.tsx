import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../theme/colors';
import {DateRangeSelector, EmptyListMsg, FloatButton} from '../../components';
import {
  expReportList,
  ExpenseAdditionalButtons,
  scheduledList,
} from '../../constants/SampleArrays';
import {AdditionalButtons, ExpReportList} from '../../types';
import ListItem from '../Agenda/ListItem';

const ExpenseReportsScreen = ({navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [isDate, setIsDate] = useState(false);
  const [totExp, setTotExp] = useState(0);
  const [dateArr, setDateArr] = useState([
    {date: new Date()},
    {date: new Date()},
  ]);
  const [expData, setExpData] = useState<ExpReportList[]>([]);
  const [actionButtons, setActionButtons] =
  useState<AdditionalButtons[]>(ExpenseAdditionalButtons);

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[0].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewExpenseReport',
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
    expReportList.map(i => {
      i.date >= date1 && i.date <= date2
        ? (Expense = Expense + i.totExp)
        : null;
    });
    const data = expReportList.filter(
      i => i.date >= dateArr[0].date && i.date <= dateArr[1].date,
    );
    console.log('DATA', data);
    setImmediate(() => {
      setExpData(data);
      console.log('fgf');
      setImmediate(() => {
        setIsDate(true);
        console.log('qwe');
      });
    });
    setTotExp(Expense);
  };

  const clearTotal = () => {
    setTotExp(0);
    setIsDate(false);
  };

  return (
    <View style={styles.container}>
      <DateRangeSelector
        fetchData={(date1: Date, date2: Date) => getDate(date1, date2)}
        clearDate={clearTotal}
        total={totExp.toFixed(2)}
      />

      {isDate ? (
        expData.length > 0 ? (
          <FlatList
            data={expData}
            renderItem={({item}) => {
              return <ListItem 
              onPress={(ticket) => {
                navigation.navigate('Stack1', {
                  screen: 'STickets',
                  params: {title: ticket.ticket_no.toString()},
                });
              }} dataSource={item} renderDate={true} />;
            }}
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

export default ExpenseReportsScreen;
