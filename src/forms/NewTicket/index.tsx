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
  statusList,
} from '../../constants/SelectionList';
import {NoteTypes_DIR} from '../../constants/SampleArrays';

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
}

export default function NewTicket({route, navigation}: any) {
  const {colors, dark} = useTheme();
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
      title: 'Please select',
      subTitle: 'Service Board',
      enable: true,
      list: boardList,
      selectedItem: boardList[0],
      headerTitle: 'Service Board',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Please Select',
      subTitle: 'Status',
      enable: true,
      list: statusList,
      selectedItem: statusList[0],
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
      onRoundIconPress: handleAddNote,
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
  }, [route?.params]);

  function handleAddNote() {
    navigation.navigate('Stack2', {
      screen: 'ComposeNote',
      params: {
        from: 'NewTicket',
        item: 'GoneTo',
        data: NoteTypes_DIR,
        stack: 'Stack2',
        title: route?.params?.title, // used for Dynamic Headers Used
        headerTitle: 'Note Type',
        status: route?.params?.status,
      },
    });
  }

  const handlePress = (item: Item, index: number) => {
    if (item?.list) {
      navigation.navigate('Stack2', {
        screen: 'CstmItemSelector',
        params: {
          ...route?.params,
          from: 'NewTicket',
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
          subTitle={value.subTitle}
          onPress={
            value?.onPress ? value.onPress : () => handlePress(value, index)
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
