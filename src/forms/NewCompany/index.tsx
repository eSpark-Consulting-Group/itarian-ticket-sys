import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';

import {ModalView, SingleLineField} from '../../components';
import {SelectFields} from '../../types';
import {countryList, siteList, stateList} from '../../constants/SelectionList';

const NewCompany = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: '',
      subTitle: 'New Company',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Company ID',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Company Phone No',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Address 1',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Address 2',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Zip Code',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'City',
      inputable: true,
      enable: false,
    },
    {
      title: 'Please Select',
      subTitle: 'State',
      rightIcon: 'chevron-right',
      list: stateList,
      selectedItem: stateList[0],
      headerTitle: 'State',
    },
    {
      title: 'Please Select',
      subTitle: 'Country',
      rightIcon: 'chevron-right',
      list: countryList,
      selectedItem: countryList[0],
      headerTitle: 'State',
    },
    {
      title: '',
      subTitle: 'First Name',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Last Name',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Email',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Phone No.',
      inputable: true,
      enable: false,
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
    list?: SelectFields[];
    selectedItem?: SelectFields;
    searchable?: boolean;
    headerTitle?: string;
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
          from: 'NewCompany',
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
              onPress={() => handlePress(item, index)}
            />
          ))}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewCompany;
