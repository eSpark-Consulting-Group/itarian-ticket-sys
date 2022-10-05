import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import DatePicker from '@react-native-community/datetimepicker';
import {State, useHookstate} from '@hookstate/core';

import {ModalView, SingleLineField} from '../../components';
import {globalState} from '../../stores/globalAppState';
import {userStore} from '../../stores/userStore';
import {
  contactNameList,
  resourceList,
  statusList,
  typeList,
  whereList,
} from '../../constants/SelectionList';
import {SelectFields} from '../../types';
import {SelectItems} from '../../utils/helperFunctions';
import { companyStore } from '../../stores/companyStore';

const NewActivity = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [showDate, setShowDate] = useState(false);
  const [mode, setMode] = useState<Mode>('date');
  const [pickerType, setpickerType] = useState<PickerType>('dd');

  const [StartTime, setStartTime] = useState(null);
  const [endTime, setendTime] = useState(null);
  const user: State<any> = useHookstate(userStore.user);
  const companies: any = useHookstate(companyStore.companies)?.get()

  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: '',
      subTitle: 'Summary',
      inputable: true,
      enable: false,
      isRequired: true,
    },
    {
      title: 'Please Select',
      subTitle: 'Company ',
      rightIcon: 'chevron-right',
      list: companies,
      selectedItem: companies[0],
      searchable: true,
      headerTitle: 'Company',
    },
    {
      title: 'Please Select',
      subTitle: 'Contact ',
      rightIcon: 'chevron-right',
      list: contactNameList,
      selectedItem: contactNameList[0],
      searchable: true,
      headerTitle: 'Contact',
    },
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
    {
      title: 'Please Select',
      subTitle: 'Type',
      rightIcon: 'chevron-right',
      list: typeList,
      selectedItem: typeList[0],
      headerTitle: 'Type',
    },
    {
      title: 'Please Select',
      subTitle: 'Where',
      rightIcon: 'chevron-right',
      list: whereList,
      selectedItem: whereList[0],
      headerTitle: 'Where',
    },
    {
      title: 'Please Select',
      subTitle: 'Status',
      rightIcon: 'chevron-right',
      list: statusList,
      selectedItem: statusList[0],
      headerTitle: 'Status',
    },
    {
      title: 'Please Select',
      subTitle: 'Resource',
      rightIcon: 'chevron-right',
      list: resourceList,
      selectedItem: resourceList[0],
      headerTitle: 'Resource',
    },
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
    list?: SelectFields[];
    selectedItem?: SelectFields;
    searchable?: boolean;
    headerTitle?: string;
    isRequired?: boolean;
  }

  type Mode = 'date' | 'time';
  type PickerType = 'dd' | 'st' | 'et';

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

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
    }
  }, [route?.params?.selected]);

  useEffect(() => {
    const Data: Item[] = [];
    dataSource.map(item =>
      Data.push({
        title: item.title,
        subTitle: item.subTitle,
        isRequired: item.isRequired,
      }),
    );
    navigation?.setParams({
      ...route?.params,
      data: Data,
    });
  }, [dataSource]);

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
              subTitle={item.isRequired ? item.subTitle + '*' : item.subTitle}
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
              onPress={
                item?.onPress
                  ? item.onPress
                  : () =>
                      SelectItems(
                        item,
                        index,
                        navigation,
                        route,
                        'NewActivity',
                        'Stack1',
                      )
              }
            />
          ))}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewActivity;
