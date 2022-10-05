import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {ModalHeader, ModalView, SingleLineField} from '../../components';
import {SelectFields} from '../../types';
import {
  boardList,
  contactNameList,
  resourceList,
} from '../../constants/SelectionList';
import {NoteTypes_DIR} from '../../constants/SampleArrays';
import {handleAddNote, SelectItems} from '../../utils/helperFunctions';
import { globalState } from '../../stores/globalAppState';
import { useHookstate } from '@hookstate/core';

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
  const ticketStatus: any = useHookstate(globalState?.ticketStatus).get()

  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'Tim Smith',
      leftIcon: 'account',
      rightIcon: 'chevron-right',
      list: contactNameList,
      selectedItem: contactNameList[0],
      headerTitle: 'Member',
    },
    {
      title: '',
      subTitle: 'Summary',
      inputable: true,
      enable: false,
      mode: 'multiline',
    },
    {
      title: 'Please Select',
      subTitle: 'Service Board',
      enable: true,
      list: boardList,
      selectedItem: boardList[0],
      headerTitle: 'Service Board',
      rightIcon: 'chevron-right',
      isRequired: true,
    },
    {
      title: 'Please Select',
      subTitle: 'Status',
      enable: true,
      list: ticketStatus,
      selectedItem: ticketStatus[0],
      headerTitle: 'Status',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Add Resource',
      enable: true,
      headerTitle: 'Add Resource',
      onPress: () => {
        navigation?.navigate('Stack2', {
          screen: 'AddResource',
        });
      },
      rightIcon: 'chevron-right',
    },
    {
      title: 'Add Note',
      enable: false,
      rightIconRound: 'file-plus-outline',
      roundedIconEnable: true,
      onRoundIconPress: () =>
        handleAddNote(navigation, route, NoteTypes_DIR, 'NewTicket', 'Stack2'),
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

  return (
    <ModalView>
      <ModalHeader
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
      />

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
    </ModalView>
  );
}

const styles = StyleSheet.create({});
