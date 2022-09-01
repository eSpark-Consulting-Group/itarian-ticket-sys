import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import DatePicker from '@react-native-community/datetimepicker';
import {State, useState as hookState} from '@hookstate/core';

import {ModalView, SingleLineField} from '../../components';
import {globalState} from '../../stores/globalAppState';
import { userStore } from '../../stores/userStore';

const NewActivity = ({route}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [showDate, setShowDate] = useState(false);
  const [mode, setMode] = useState<Mode>('date');
  const [pickerType, setpickerType] = useState<PickerType>('dd');

  const [StartTime, setStartTime] = useState(null);
  const [endTime, setendTime] = useState(null);
  const user: State<any> = hookState(userStore.user);

  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: '',
      subTitle: 'Summary',
      inputable: true,
      enable: false,
    },
    {title: 'Please Select', subTitle: 'Company ', rightIcon: 'chevron-right'},
    {title: 'Please Select', subTitle: 'Contact ', rightIcon: 'chevron-right'},
    {
      title: 'Please Select',
      subTitle: 'Due Date ',
      rightIcon: 'calendar',
      onPress: () => {
        setMode('date');
        setpickerType('dd');
        setShowDate(true);
      },
    },
    {
      title: 'Please Select',
      subTitle: 'Start Time ',
      rightIcon: 'clock',
      onPress: () => {
        setMode('time');
        setpickerType('st');
        setShowDate(true);
      },
    },
    {
      title: 'Please Select',
      subTitle: 'End Time ',
      rightIcon: 'clock',
      onPress: () => {
        setMode('time');
        setpickerType('et');
        setShowDate(true);
      },
    },
    {title: 'Please Select', subTitle: 'Type', rightIcon: 'chevron-right'},
    {title: 'Please Select', subTitle: 'Where', rightIcon: 'chevron-right'},
    {title: 'Please Select', subTitle: 'Status', rightIcon: 'chevron-right'},
    {title: 'Please Select', subTitle: 'Resource', rightIcon: 'chevron-right'},
    {
      title: '',
      subTitle: 'Notes',
      inputable: true,
      enable: false,
      mode: 'multiline',
    },
  ]);

  interface Item {
    title: string;
    subTitle: string;
    inputable?: boolean;
    enable?: boolean;
    rightIcon?: string;
    rightIconRound?: string;
    titleWidth?: number;
    showRightSwitch?: boolean;
    rightSwitchVal?: boolean;
    onChangeSwitch?: (value: boolean) => void;
    onChangeText?: (text: string) => void;
    mode?: 'none' | 'multiline';
    onPress?: () => void;
  }

  type Mode = 'date' | 'time';
  type PickerType = 'dd' | 'st' | 'et';

  useEffect(() => {
    if (route?.params?.from) {
      let newData = [...dataSource];
      newData[9].title = user.get().user?.username;
      setDataSource(newData);
    }
  }, [route?.params]);

  const updateInput = (e: string, index: number) => {
    let newData = [...dataSource];
    newData[index].title = e;
    setDataSource(newData);
  };

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);
    let time = date.toString().substring(16, 21);

    if (event?.type == 'set') {
      switch (pickerType) {
        case 'dd':
          dataSource[3].title = date?.toDateString();
          setDataSource([...dataSource]);
          break;
        case 'st':
          setStartTime(date?.toISOString());
          dataSource[4].title = time;
          setDataSource([...dataSource]);
          break;
        case 'et':
          setendTime(date?.toISOString());
          dataSource[5].title = time;
          setDataSource([...dataSource]);
        default:
          break;
      }
    }
  };

  return (
    <ModalView bgColor={colors.card}>
      {showDate && (
        <DatePicker
          mode={mode}
          value={new Date()}
          minimumDate={new Date()}
          onChange={onChangeDate}
          positiveButtonLabel={
            pickerType == 'dd'
              ? 'Set Due Date'
              : pickerType == 'st'
              ? 'Confirm Start Time'
              : 'Confirm End Time'
          }
        />
      )}
      <ScrollView style={{flex: 1}}>
        <View style={{backgroundColor: colors.background}}>
          {dataSource.map((item, index) => (
            <SingleLineField
              key={index}
              subTitle={item.subTitle}
              title={item.title}
              inputable={item.inputable}
              onChangeText={e => updateInput(e, index)}
              enable={item.enable}
              rightIconRound={item.rightIconRound}
              titleWidth={item.titleWidth}
              rightIcon={item.rightIcon}
              showRightSwitch={item.showRightSwitch}
              rightSwitchVal={item.rightSwitchVal}
              onChangeSwitch={item.onChangeSwitch}
              mode={item?.mode}
              onPress={item?.onPress}
            />
          ))}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewActivity;
