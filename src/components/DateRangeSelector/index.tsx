import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import FA from 'react-native-vector-icons/FontAwesome';
import DatePicker from '@react-native-community/datetimepicker';

import {Theme} from '../../theme/colors';
import styles from './style';

const DateRangeSelector = ({
  fetchData,
  total,
}: {
  fetchData: (date1: Date, date2: Date) => void;
  total?: string | number;
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
    let month = date.toString().slice(4, 7);
    let dat = date.getDate();
    console.log('event', event);
    if (event.type == 'set') {
      if (startDate) {
        console.log('got Start Date');
        setEndDateVal(month + ' ' + dat);
        fetchData(startDate, date);
      } else {
        setImmediate(() => {
          console.log('Dobara Chala kia');
          setShowDate(true);
        });
        setStartDate(date);
        setStartDateVal(month + ' ' + dat);
      }
    }
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
      <Pressable
        onPress={openDatePicker}
        android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}
        style={styles.container}>
        <View>
          <Text style={{color: colors.text}}>
            {startDate
              ? startDateVal + ' - ' + endDateVal
              : 'Select Date Range'}
          </Text>
          <Text style={{color: '#28648f', fontWeight: 'bold'}}>
            {total ? total : '0.00'}
          </Text>
        </View>
        <FA color={colors.text} name="chevron-down" size={15} />
      </Pressable>
    </>
  );
};

export default DateRangeSelector;
