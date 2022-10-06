import React, {useEffect, useState} from 'react';
import {View, ScrollView, KeyboardTypeOptions} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import DatePicker from '@react-native-community/datetimepicker';

import {ModalView, SingleLineField} from '../../components';
import {SelectFields} from '../../types';
import {
  chargeCodeList,
  typeList,
  workRoleList,
} from '../../constants/SelectionList';
import {NoteTypes_DIR} from '../../constants/SampleArrays';
import {handleAddNote, SelectItems} from '../../utils/helperFunctions';

const NewTimeSheet = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [showDate, setShowDate] = useState(false);
  const [mode, setMode] = useState<Mode>('date');
  const [pickerType, setpickerType] = useState<PickerType>('dd');

  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'Please Select',
      subTitle: 'Charge Code',
      rightIcon: 'chevron-right',
      list: chargeCodeList,
      selectedItem: chargeCodeList[0],
      headerTitle: 'Charge Code',
    },
    {
      title: 'Please Select',
      subTitle: 'Date ',
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
      title: '',
      subTitle: 'Time',
      inputable: true,
      enable: false,
      keyboardType: 'number-pad',
      isRequired: true,
    },
    {
      title: 'Please Select',
      subTitle: 'Work Role',
      rightIcon: 'chevron-right',
      list: workRoleList,
      selectedItem: workRoleList[0],
      headerTitle: 'Work Role',
    },
    {
      title: 'Please Select',
      subTitle: 'Work Type',
      rightIcon: 'chevron-right',
      list: typeList,
      selectedItem: typeList[0],
      headerTitle: 'Work Type',
    },
    {
      title: 'Add Note',
      enable: false,
      rightIconRound: 'file-plus-outline',
      roundedIconEnable: true,
      onRoundIconPress: () =>
        handleAddNote(
          navigation,
          route,
          NoteTypes_DIR,
          'NewTimeSheet',
          'Stack1',
        ),
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
    roundedIconEnable?: boolean;
    onRoundIconPress?: () => void;
    keyboardType?: KeyboardTypeOptions | undefined;
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
          dataSource[1].title = date?.toDateString();
          setDataSource([...dataSource]);
          break;
        case 'st':
          dataSource[2].title = time;
          setDataSource([...dataSource]);
          break;
        case 'et':
          dataSource[3].title = time;
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

    if (route?.params?.date) {
      let newData = [...dataSource];
      newData[1].title = route?.params?.date;
      setDataSource(newData);
    }
    if (route?.params?.from == 'ServiceTickets') {
      let newData = [...dataSource];
      newData[0].title = route.params?.chargeCode;
      setDataSource(newData);
    }
    if (route?.params?.data && route?.params?.data?.from == 'TimeSheet') {
      let newData = [...dataSource];
      newData[0].title = route?.params?.data?.ticket?.ticket_no;
      newData[1].title = route?.params?.data?.date;
      newData[2].title =
        route?.params?.data?.ticket?.schedule_time?.split('-')[0] ||
        'Please select';
      newData[3].title =
        route?.params?.data?.ticket?.schedule_time?.split('-')[1] ||
        'Please select';
      newData[4].title = route?.params?.data?.totHrs?.toString();
      newData[5].title = route?.params?.data?.ticket?.phase;
      newData[6].title = route?.params?.data?.ticket?.site;
      newData[7].title = route?.params?.data?.ticket?.summary;
      setDataSource(newData);
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
          themeVariant="dark"
          positiveButtonLabel={
            pickerType == 'dd'
              ? 'Set Date'
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
                        'NewTimeSheet',
                        'Stack1',
                      )
              }
              roundedIconEnable={item?.roundedIconEnable}
              onRoundedIconPress={item?.onRoundIconPress}
              keyboardType={item?.keyboardType}
            />
          ))}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewTimeSheet;
