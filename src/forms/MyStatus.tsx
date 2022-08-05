import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTheme} from '@react-navigation/native';

import {ModalField, ModalForm} from '../components';
import {StatusFormArray} from '../constants/SampleArrays';
import {Theme} from '../theme/colors';
import {globalState} from '../utils/globalState';
import {State, useState as hookState} from '@hookstate/core';

const MyStatus = ({route, navigation}: any) => {
  console.log('Route', route);
  const {status: OutStatus} = route.params;
  const switchVal: State<boolean> = hookState(globalState.statusSwitch);
  const {colors}: Theme = useTheme();
  // const [switchVal, setSwitchVal] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [currTime, setCurrTime] = useState(new Date());
  const [currDate, setCurrDate] = useState(new Date());
  const [timeDur, setTimeDur] = useState('--');
  const [dateDur, setDateDur] = useState('--');

  const closeTImePicker = (event: any, time: any) => {
    setShowTime(false);
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    console.log('Pressed Date', event, hours + ':' + minutes + ' ' + ampm);
    if (event.type == 'set') {
      setTimeDur(hours + ':' + minutes + ' ' + ampm);
    }
    setCurrTime(time);
  };

  const closeDatePicker = (event: any, date: any) => {
    setShowDate(false);
    let month = date.toString().slice(4, 7);
    let dat = date.getDate();
    let year = date.getFullYear();
    console.log('Pressed Date', event, month + ' ' + dat + ',' + year);
    if (event.type == 'set') {
      setDateDur(month + ' ' + dat + ', ' + year);
    }
    setCurrDate(date);
  };

  const changeSwitch = () => {
    const {setParams} = navigation;
    setParams({
      status: !OutStatus,
    });
    switchVal.set(!switchVal.get());
  };

  return (
    <ModalForm fieldsArray={StatusFormArray} navigation={navigation}>
      <ModalField
        mode="inlined"
        headingLeft="Are you out of office"
        switchRight={true}
        switch_val={switchVal.get()}
        onToggleSwitch={changeSwitch}
        // onToggleSwitch={() => setSwitchVal(!switchVal)}
      />
      {switchVal.get() && (
        <>
          <ModalField
            mode="inlined"
            headingLeft="Gone To"
            // subHeadingLeft={
            //   checkedIndex != null
            //     ? goneToArray[checkedIndex].name
            //     : 'Please Select'
            // }
            onPress={() => navigation.navigate('Stack2', {screen: 'GoneTo'})}
            // onPress={() => console.log('Navigation', props.navigation.navigate())}
            pressEnable={true}
          />
          <ModalField mode="multiline" headingLeft="Additional Info" />
          <ModalField
            mode="inlined"
            headingLeft="Date Back"
            subHeadingLeft={dateDur}
            subIconLeft="calendar-outline"
            pressEnableLeft
            onPressLeft={() => setShowDate(true)}
            headingRight="Time Back"
            subHeadingRight={timeDur}
            subIconRight="timer-outline"
            pressEnableRight
            onPressRight={() => setShowTime(true)}
          />
        </>
      )}
      {showTime && (
        <DateTimePicker
          accentColor={colors.primary}
          mode="time"
          value={currTime}
          onChange={closeTImePicker}
        />
      )}
      {showDate && (
        <DateTimePicker
          mode="date"
          value={currDate}
          onChange={closeDatePicker}
        />
      )}
    </ModalForm>
  );
};

export default MyStatus;

const styles = StyleSheet.create({});
