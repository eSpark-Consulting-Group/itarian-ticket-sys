import React, {useEffect, useState} from 'react';

import {useTheme} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';
import {State, useState as hookState} from '@hookstate/core';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Theme} from '../theme/colors';
import {globalState} from '../utils/globalState';

import {ModalField, ModalForm} from '../components';
import {GoneToFormArray, StatusFormArray} from '../constants/SampleArrays';

const Stack = createNativeStackNavigator();

const Stacks = ({navigation}: NativeStackHeaderProps) => {
  const {colors}: Theme = useTheme();
  const [prevVal, setPrevVal] = useState(false);
  const [switchVal, setSwitchVal] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [currTime, setCurrTime] = useState(new Date());
  const [timeDur, setTimeDur] = useState('--');
  const [dateDur, setDateDur] = useState('--');
  const [currDate, setCurrDate] = useState(new Date());
  const [currChkInd, setCurrChkInd] = useState<number | null>(null);
  const [checkedIndex, setCheckedIndex] = useState<number | null>(null);
  const [goneToArray, setGoneToArray] = useState([
    {
      name: 'Appoinment',
      check: 'unchecked',
    },
    {
      name: 'Client',
      check: 'unchecked',
    },
    {
      name: 'Gone for the day',
      check: 'unchecked',
    },
    {
      name: 'Lunch',
      check: 'unchecked',
    },
    {
      name: 'Other',
      check: 'unchecked',
    },
    {
      name: 'Sick',
      check: 'unchecked',
    },
    {
      name: 'Vacation',
      check: 'unchecked',
    },
  ]);
  const currStatusVal: State<boolean> = hookState(globalState.currentStatus);

  const saveStatus = () => {
    setPrevVal(switchVal);
    currStatusVal.set(switchVal);
    navigation.navigate({
      name: 'Profile',
      params: {status: switchVal},
      merge: true,
    });
  };

  const backStatus = () => {
    setSwitchVal(prevVal);
    currStatusVal.set(prevVal);
    navigation.navigate({
      name: 'Profile',
      params: {status: prevVal},
      merge: true,
    });
  };

  const saveGoneTo = () => {
    setCheckedIndex(currChkInd);
    navigation.navigate('My Status');
  };

  const backGoneTo = () => {
    setCurrChkInd(checkedIndex);
    navigation.navigate('My Status');
  };

  const closeTImePicker = (event: any, time: any) => {
    setShowTime(false);
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    console.log('Pressed Date', event, hours + ':' + minutes + ' ' + ampm);
    setTimeDur(hours + ':' + minutes + ' ' + ampm);
    setCurrTime(time);
  };

  const closeDatePicker = (event: any, date: any) => {
    setShowDate(false);
    let month = date.toString().slice(4, 7);
    let dat = date.getDate();
    let year = date.getFullYear();
    console.log('Pressed Date', event, month + ' ' + dat + ',' + year);
    setDateDur(month + ' ' + dat + ', ' + year);
    setCurrDate(date);
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
        },
        animation: 'slide_from_bottom',
        presentation: 'modal',
      }}>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}>
        <Stack.Screen
          name={'My Status'}
          options={{
            animation: 'slide_from_bottom',
            headerLeft: () => (
              <Ionicons
                size={30}
                name="close"
                style={{right: 6}}
                color={'#fff'}
                onPress={backStatus}
              />
            ),
            headerRight: () => (
              <FA
                size={27}
                name="save"
                color={'#fff'}
                onPress={saveStatus}
                // style={{right: 10}}
              />
            ),
          }}>
          {() => (
            <ModalForm fieldsArray={StatusFormArray} navigation={navigation}>
              <ModalField
                mode="inlined"
                headingLeft="Are you out of office"
                switchRight={true}
                switch_val={switchVal}
                onToggleSwitch={() => setSwitchVal(!switchVal)}
              />
              {switchVal && (
                <>
                  <ModalField
                    mode="inlined"
                    headingLeft="Gone To"
                    subHeadingLeft={
                      checkedIndex != null
                        ? goneToArray[checkedIndex].name
                        : 'Please Select'
                    }
                    onPressLeft={() => navigation.navigate('Gone To')}
                    pressEnableLeft={true}
                  />
                  {/* <CstmMultiLine title="Additional Info" /> */}
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
          )}
        </Stack.Screen>
        <Stack.Screen
          name={'Gone To'}
          options={{
            animation: 'slide_from_bottom',
            headerLeft: () => (
              <Ionicons
                size={30}
                name="close"
                style={{right: 6}}
                color={'#fff'}
                onPress={backGoneTo}
              />
            ),
            headerRight: () => (
              <FA size={27} name="check" color={'#fff'} onPress={saveGoneTo} />
            ),
          }}>
          {() => (
            <ModalForm fieldsArray={GoneToFormArray}>
              {goneToArray.map((item, index) => (
                <ModalField
                  key={item.name}
                  mode="inlined"
                  headingLeft={item.name}
                  checkBoxRight
                  checkBox_Val={currChkInd == index ? 'checked' : 'unchecked'}
                  onCheckPress={() => setCurrChkInd(index)}
                />
              ))}
            </ModalForm>
          )}
        </Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Stacks;
