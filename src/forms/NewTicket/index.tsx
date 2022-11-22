import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {ModalHeader, ModalView, SingleLineField} from '../../components';
import {SelectFields} from '../../types';
import {
  boardList,
  contactNameList,
  priorityList,
  resourceList,
  statusList,
} from '../../constants/SelectionList';
import {NoteTypes_DIR} from '../../constants/SampleArrays';
import {handleAddNote, SelectItems} from '../../utils/helperFunctions';
import {globalState} from '../../stores/globalAppState';
import {useHookstate} from '@hookstate/core';
import DatePicker from '@react-native-community/datetimepicker';

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
  leftIcon?: string;
  onRoundIconPress?: () => void;
  isRequired?: boolean;
}

export default function NewTicket({route, navigation}: any) {
  const {colors, dark} = useTheme();
  const ticketStatus: any = useHookstate(globalState?.ticketStatus).get();

  const [showDate, setShowDate] = useState(false);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: '',
      subTitle: 'Subject',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Details',
      inputable: true,
      enable: false,
      mode: 'multiline',
    },
    {
      title: 'Please Select',
      subTitle: 'Assigned to',
      list: contactNameList,
      selectedItem: contactNameList[0],
      headerTitle: 'Member',
      rightIcon: 'chevron-right',
      isRequired: true,
    },
    {
      title: 'Please Select',
      subTitle: 'Due Date ',
      rightIcon: 'calendar',
      onPress: () => {
        setShowDate(true);
      },
    },
    {
      title: 'Please Select',
      subTitle: 'Sla Plan',
      enable: true,
      list: boardList,
      selectedItem: boardList[0],
      headerTitle: 'Sla Plans',
      rightIcon: 'chevron-right',
      isRequired: true,
    },
    {
      title: 'Please Select',
      subTitle: 'Priority',
      enable: true,
      list: priorityList,
      selectedItem: priorityList[0],
      headerTitle: 'Priority',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Please Select',
      subTitle: 'Help Topic',
      enable: true,
      list: priorityList,
      selectedItem: priorityList[0],
      headerTitle: 'Priority',
      rightIcon: 'chevron-right',
    },
  ]);

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

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);
    let time = date.toString().substring(16, 21);

    if (event?.type == 'set') {
      dataSource[3].title = date?.toDateString();
      setDataSource([...dataSource]);
    }
  };

  return (
    <ModalView>
      {/* <ModalHeader
        title="Acme Company Ltd"
        subTitle="63 Elm Street, Tampa Bay, FL 023912"
        icon="office-building-marker-outline"
        disabled={false}
        onPress={() => console.log('Press hoa')}
        right={
          <MCI
            name={'chevron-right'}
            size={30}
            color={colors.text}
            style={{opacity: 0.6}}
          />
        }
      /> */}

      {showDate && (
        <DatePicker
          mode={'date'}
          value={new Date()}
          minimumDate={new Date()}
          onChange={onChangeDate}
          positiveButtonLabel={'Set Due Date'}
        />
      )}
      <ScrollView>
        {dataSource?.map((value: Item, index: number) => (
          <SingleLineField
            key={index}
            title={value.title}
            subTitle={value.isRequired ? value.subTitle + '*' : value.subTitle}
            onPress={
              value?.onPress
                ? value.onPress
                : () =>
                    SelectItems(
                      value,
                      index,
                      navigation,
                      route,
                      'NewTicket',
                      'Stack1',
                    )
            }
            enable={value.enable}
            inputable={value.inputable}
            mode={value.mode}
            rightIcon={value.rightIcon}
            rightIconRound={value.rightIconRound}
            roundedIconEnable={value.roundedIconEnable}
            onRoundedIconPress={value.onRoundIconPress}
            leftIcon={value.leftIcon}
          />
        ))}
      </ScrollView>
    </ModalView>
  );
}

const styles = StyleSheet.create({});
