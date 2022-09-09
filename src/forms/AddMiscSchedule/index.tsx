import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CstmButton, ModalView, SingleLineField} from '../../components';
import {Theme, useTheme} from '@react-navigation/native';
import DatePicker from '@react-native-community/datetimepicker';
import {SelectFields} from '../../types';
import {typeList, whereList} from '../../constants/SelectionList';

const AddMiscSchedule = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [showDate, setShowDate] = useState(false);
  const [mode, setMode] = useState<Mode>('date');
  const [pickerType, setpickerType] = useState<PickerType>('sd');

  const [dataSource, setDataSource] = useState<Item[]>([
    {title: 'Mark as Done', showRightSwitch: true, rightSwitchVal: true},
    {
      title: '',
      subTitle: 'Description',
      inputable: true,
      enable: false,
    },
    {
      title: 'Please Select',
      subTitle: 'Schedule Type',
      rightIcon: 'chevron-right',
      list: typeList,
      selectedItem: typeList[0],
      headerTitle: 'Schedule Type',
    },
    {
      title: 'Johnny Bravo',
      subTitle: 'Member Name',
      enable: false,
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
      subTitle: 'Start Date ',
      rightIcon: 'calendar',
      onPress: () => {
        setMode('date');
        setpickerType('sd');
        setShowDate(true);
      },
    },
    {
      title: 'Please Select',
      subTitle: 'End Date ',
      rightIcon: 'calendar',
      onPress: () => {
        setMode('date');
        setpickerType('ed');
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
  ]);

  interface Item {
    title: string;
    subTitle?: string;
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
  }

  type Mode = 'date' | 'time';
  type PickerType = 'sd' | 'ed' | 'st' | 'et';

  const updateInput = (e: string, index: number) => {
    console.log('Text Index', e, index);
    let newData = [...dataSource];
    newData[index].title = e;
    console.log('New Data', newData);
    setDataSource(newData);
  };

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);
    let time = date.toString().substring(16, 21);
    if (event?.type == 'set') {
      switch (pickerType) {
        case 'sd':
          dataSource[5].title = date?.toDateString();
          setDataSource([...dataSource]);
          break;
        case 'ed':
          dataSource[6].title = date?.toDateString();
          setDataSource([...dataSource]);
          break;
        case 'st':
          dataSource[7].title = time;
          setDataSource([...dataSource]);
          break;
        case 'et':
          dataSource[8].title = time;
          setDataSource([...dataSource]);
        default:
          break;
      }
    }
  };

  const updateSwitch = (index: number) => {
    let tempArr: Item[] = [...dataSource];
    tempArr[index].rightSwitchVal = !tempArr[index].rightSwitchVal;
    console.log('tempArr', tempArr);
    setDataSource(tempArr);
  };

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
    }
  }, [route?.params]);

  const handlePress = (item: Item, index: number) => {
    if (item?.list) {
      navigation.navigate('Stack2', {
        screen: 'CstmItemSelector',
        params: {
          ...route?.params,
          from: 'AddMiscSchedule',
          item: index,
          data: item.list,
          selected: item.selectedItem,
          stack: 'Stack1',
          title: route?.params?.title,
          headerTitle: item.headerTitle,
          searchable: item.searchable,
        },
      });
    }
  };
  return (
    <ModalView bgColor={colors.card}>
      {showDate && (
        <DatePicker
          mode={mode}
          value={new Date()}
          onChange={onChangeDate}
          is24Hour
          positiveButtonLabel={
            pickerType == 'sd'
              ? 'Set Start Date'
              : pickerType == 'st'
              ? 'Start Time'
              : pickerType == 'et'
              ? 'End Time'
              : 'Set End Date'
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
              onChangeSwitch={() => updateSwitch(index)}
              mode={item?.mode}
              onPress={
                item?.onPress ? item?.onPress : () => handlePress(item, index)
              }
            />
          ))}
        </View>
      </ScrollView>
      <CstmButton title="CLEAR DATES & TIMES" onPress={() => {}} />
    </ModalView>
  );
};

export default AddMiscSchedule;
