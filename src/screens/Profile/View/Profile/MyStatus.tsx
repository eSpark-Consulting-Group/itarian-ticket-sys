import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTheme, Theme} from '@react-navigation/native';

import {Switch} from 'react-native-paper';
import {ModalField, ModalView, SingleLineField} from '../../../../components';
import {GoneToFormArray} from '../../../../constants/SampleArrays';

const MyStatus = ({route, navigation}: any) => {
  console.log('Route', route);
  const {status: OutStatus} = route.params;
  const {colors}: Theme = useTheme();
  const [goneTo, setGoneTo] = useState<any>(null);
  const [showTime, setShowTime] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [currTime, setCurrTime] = useState(new Date());
  const [currDate, setCurrDate] = useState(new Date());
  const [timeDur, setTimeDur] = useState('--');
  const [dateDur, setDateDur] = useState('--');

  useEffect(() => {
    if (route?.params?.item) {
      setGoneTo(route?.params?.selected);
    }
  }, [route?.params]);

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
  };

  return (
    <ModalView>
      <SingleLineField
        title="Are you out of office"
        onPress={changeSwitch}
        rightChild={
          <Switch
            value={OutStatus}
            style={{marginRight: 5}}
            color={colors.primary}
            thumbColor={colors.primary}
            onValueChange={changeSwitch}
            trackColor={{true: '#5b57578f', false: '#5b57578f'}}
          />
        }
      />
      {OutStatus && (
        <>
          <SingleLineField
            title={goneTo?.name || 'Please Select'}
            onPress={() =>
              navigation.navigate('Stack2', {
                screen: 'CstmItemSelector',
                params: {
                  from: 'MyStatus',
                  item: 'GoneTo',
                  data: GoneToFormArray,
                  selected: goneTo,
                  stack: 'Stack1',
                  title: route?.params?.title,
                  headerTitle: 'Gone To',
                  status: route?.params?.status,
                },
              })
            }
            rightIcon="chevron-right"
            subTitle="Gone To"
          />
          <SingleLineField
            title=""
            enable={false}
            subTitle="Additional Info"
            mode="multiline"
            inputable
          />
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
    </ModalView>
  );
};

export default MyStatus;

const styles = StyleSheet.create({});
