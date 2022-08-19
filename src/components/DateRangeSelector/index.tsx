import {View, Text,} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import FA from 'react-native-vector-icons/FontAwesome';
import DatePicker from '@react-native-community/datetimepicker';

import {Theme} from '../../theme/colors';
import styles from './style';
import { CstmPressable } from '../CstmPressable/indes';

const DateRangeSelector = ({
  fetchData,
  clearDate,
  total,
  totalType,
}: {
  fetchData: (date1: Date, date2: Date) => void;
  clearDate: () => void;
  total?: string | number;
  totalType?: string;
}) => {
  const {colors, dark}: Theme = useTheme();
  const [showDate, setShowDate] = useState(false);
  const [currDate, setCurrDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(
    new Date(currDate.setDate(currDate.getDate() + 30)),
  );
  const [minDate, setMinDate] = useState(
    new Date(currDate.setDate(currDate.getDate() - 60)),
  );
  const [startDate, setStartDate] = useState<undefined | Date>();
  const [startDateVal, setStartDateVal] = useState('--');
  const [endDateVal, setEndDateVal] = useState('--');

  const openDatePicker = () => {
    if (startDate) {
      console.log('got Start Date');
      setStartDate(undefined);
      setShowDate(true);
    } else {
      console.log('got Start Date');
      setShowDate(true);
    }
  };

  const closeDatePicker = (event: any, date: any) => {
    setShowDate(false);
    let D1 = date.setHours(0, 0, 0, 0);
    let D2 = date.setHours(23, 59, 0, 0);
    let strtDate = new Date(D1);
    let endDate = new Date(D2);
    console.log('event', strtDate, endDate);
    let month = strtDate.toLocaleString().slice(4, 7);
    let dat = strtDate.getDate();
    if (event.type == 'set') {
      if (startDate) {
        console.log('got Start Date');
        setEndDateVal(month + ' ' + dat);
        fetchData(startDate, endDate);
      } else {
        setImmediate(() => {
          console.log('Dobara Chala kia');
          setShowDate(true);
        });
        setStartDate(strtDate);
        setStartDateVal(month + ' ' + dat);
      }
    } else {
      onCancelDate();
      setStartDate(undefined);
    }
  };

  const onCancelDate = () => {
    clearDate();
  };

  return (
    <>
      {showDate && (
        <DatePicker
          mode="date"
          value={startDate ? startDate : new Date()}
          minimumDate={startDate ? startDate : minDate}
          maximumDate={maxDate}
          onChange={closeDatePicker}
          positiveButtonLabel={
            startDate ? 'Confirm End Date' : 'Confirm Start Date'
          }
        />
      )}
      <CstmPressable
        onPress={openDatePicker}
        android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}
        style={{...styles.container, backgroundColor: colors.card}}>
        <View>
          <Text style={{color: colors.text}}>
            {startDate
              ? startDateVal + ' - ' + endDateVal
              : 'Select Date Range'}
          </Text>
          <Text style={{color: '#28648f', fontWeight: 'bold'}}>
            {total ? total : '0.00'} {totalType}
          </Text>
        </View>
        <FA color={colors.text} name="chevron-down" size={15} />
      </CstmPressable>
    </>
  );
};

export default DateRangeSelector;
