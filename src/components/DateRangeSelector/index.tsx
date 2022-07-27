import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import FA from 'react-native-vector-icons/FontAwesome';

import {Theme} from '../../theme/colors';

import DatePicker from '@react-native-community/datetimepicker';

const DateRangeSelector = ({fetchData}: {fetchData: (date: any) => void}) => {
  const {colors, dark}: Theme = useTheme();
  const [showDate, setShowDate] = useState(false);
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
        fetchData(date);
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
          minimumDate={startDate}
          onChange={closeDatePicker}
          positiveButtonLabel={
            startDate ? 'Confirm End Date' : 'Confirm Start Date'
          }
        />
      )}
      <Pressable
        onPress={openDatePicker}
        android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}
        style={{
          height: '10%',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f5f5f5',
          elevation: 2,
          paddingHorizontal: 20,
        }}>
        <View>
          <Text style={{color: colors.text}}>
            {startDate
              ? startDateVal + ' - ' + endDateVal
              : 'Select Date Range'}
          </Text>
          <Text style={{color: '#28648f', fontWeight: 'bold'}}>
            {startDate ? '1846.00' : '0.00'}
          </Text>
        </View>
        <FA color={colors.text} name="chevron-down" size={15} />
      </Pressable>
    </>
  );
};

export default DateRangeSelector;
