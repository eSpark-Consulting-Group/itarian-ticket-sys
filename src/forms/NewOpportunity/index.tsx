import React, {ReactNode, useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import DatePicker from '@react-native-community/datetimepicker';

import {ModalHeader, ModalView, SingleLineField} from '../../components';
import {NoteTypes_ACIT} from '../../constants/SampleArrays';
import {SelectFields} from '../../types';
import {
  probabilityList,
  ratingList,
  salesRepList,
  stageList,
  typeList,
} from '../../constants/SelectionList';
import {handleAddNote, SelectItems} from '../../utils/helperFunctions';
import { companyStore } from '../../stores/companyStore';
import { useHookstate } from '@hookstate/core';
import { globalState } from '../../stores/globalAppState';

const NewOpportunity = ({navigation, route}: any) => {
  const {colors, dark}: Theme = useTheme();
  const companies: any = useHookstate(companyStore.companies)?.get()
  const ticketStatus: any = useHookstate(globalState?.ticketStatus).get()
  const ticketPriorities: any = useHookstate(globalState?.ticketPriorities).get()

  const [showDate, setShowDate] = useState(false);
  const [companyName, setCompanyName] = useState('Select Company');
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: '',
      subTitle: 'Oppotunity',
      inputable: true,
      enable: false,
      isRequired: true,
    },
    {
      title: 'Please Select',
      subTitle: 'Close Date',
      leftIcon: 'calendar-month',
      onPress: () => {
        setShowDate(true);
      },
    },
    {
      title: 'Please Select',
      subTitle: 'Priority',
      rightIcon: 'chevron-right',
      list: ticketPriorities,
      selectedItem: ticketPriorities[0],
      headerTitle: 'Priority',
    },
    {
      title: 'Please Select',
      subTitle: 'Status',
      rightIcon: 'chevron-right',
      list: ticketStatus,
      selectedItem: ticketStatus[0],
      headerTitle: 'Status',
    },
    {
      title: 'Please Select',
      subTitle: 'Stage',
      rightIcon: 'chevron-right',
      list: stageList,
      selectedItem: stageList[0],
      headerTitle: 'Stage',
    },
    {
      title: 'Please Select',
      subTitle: 'Probability',
      rightIcon: 'chevron-right',
      list: probabilityList,
      selectedItem: probabilityList[0],
      headerTitle: 'Probability',
    },
    {
      title: 'Please Select',
      subTitle: 'Rating',
      rightIcon: 'chevron-right',
      list: ratingList,
      selectedItem: ratingList[0],
      headerTitle: 'Rating',
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
      subTitle: 'Sales Rep',
      rightIcon: 'chevron-right',
      list: salesRepList,
      selectedItem: salesRepList[0],
      headerTitle: 'Sales Rep',
    },
    {
      title: 'Add a Note',
      rightIconRound: 'file-plus-outline',
      roundedIconEnable: true,
      enable: false,
      onRoundedIconPress: () =>
        handleAddNote(
          navigation,
          route,
          NoteTypes_ACIT,
          'NewOpportunity',
          'Stack2',
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
    roundedIconEnable?: boolean;
    onRoundedIconPress?: () => void;
    titleWidth?: number;
    showRightSwitch?: boolean;
    rightSwitchVal?: boolean;
    onChangeSwitch?: (value: boolean) => void;
    onChangeText?: (text: string) => void;
    leftIcon?: string;
    leftChild?: ReactNode;
    onPress?: () => void;
    list?: SelectFields[];
    selectedItem?: SelectFields;
    searchable?: boolean;
    headerTitle?: string;
    isRequired?: boolean;
  }

  const updateInput = (e: string, index: number) => {
    console.log('Text Index', e, index);
    let newData = [...dataSource];
    newData[index].title = e;
    console.log('New Data', newData);
    setDataSource(newData);
  };

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (
      route?.params?.item?.toString() &&
      route?.params?.item != 'GoneTo' &&
      route?.params?.item != 'Comp'
    ) {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
    }
    if (route?.params?.item?.toString() && route?.params?.item === 'Comp') {
      setCompanyName(route?.params?.selected?.name);
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

  const handleSelectCompany = () => {
    navigation.navigate('Stack2', {
      screen: 'CstmItemSelector',
      params: {
        ...route?.params,
        from: 'NewOpportunity',
        item: 'Comp',
        data: companies,
        selected: companies[0],
        stack: 'Stack1',
        // title: 'New Shit',
        headerTitle: 'Select Company',
        searchable: true, // boolean
      },
    });
  };

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);
    let time = date.toString().substring(16, 21);

    if (event?.type == 'set') {
      dataSource[1].title = date?.toDateString();
      setDataSource([...dataSource]);
    }
  };
  return (
    <ModalView bgColor={colors.card}>
      {showDate && (
        <DatePicker
          mode={'date'}
          value={new Date()}
          minimumDate={new Date()}
          onChange={onChangeDate}
        />
      )}

      <ModalHeader
        icon="office-building-marker-outline"
        title={companyName}
        disabled={false}
        onPress={handleSelectCompany}
      />
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
              leftIcon={item.leftIcon}
              rightIcon={item.rightIcon}
              rightIconRound={item.rightIconRound}
              roundedIconEnable={item.roundedIconEnable}
              onRoundedIconPress={item.onRoundedIconPress}
              onPress={
                item.onPress
                  ? item.onPress
                  : () =>
                      SelectItems(
                        item,
                        index,
                        navigation,
                        route,
                        'NewOpportunity',
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

export default NewOpportunity;
