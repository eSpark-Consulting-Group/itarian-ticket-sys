import React, {useEffect, useState} from 'react';
import {View, ScrollView, KeyboardTypeOptions} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';

import {ModalView, SingleLineField} from '../../components';
import {SelectFields} from '../../types';
import {contactNameList, countryList, stateList} from '../../constants/SelectionList';
import {SelectItems} from '../../utils/helperFunctions';

const NewCompany = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: '',
      subTitle: 'Company Name',
      inputable: true,
      enable: false,
      isRequired: true,
    },
    {
      title: '',
      subTitle: 'Company Phone No',
      inputable: true,
      enable: false,
      keyboardType: 'number-pad',
      isRequired: true,
    },
    {
      title: '',
      subTitle: 'Company Email',
      inputable: true,
      enable: false,
      isRequired: true,
    },
    {
      title: 'Please Select',
      subTitle: 'Main User',
      list: contactNameList,
      selectedItem: contactNameList[0],
      headerTitle: 'Member',
      rightIcon: 'chevron-right',
      isRequired: true,
    },
    {
      title: '',
      subTitle: 'Address',
      inputable: true,
      enable: false,
      isRequired: true,
      mode: 'multiline'
    },
    {
      title: '',
      subTitle: 'Internal Notes',
      inputable: true,
      enable: false,
      isRequired: true,
      mode: 'multiline'
    },
    // {
    //   title: '',
    //   subTitle: 'Zip Code',
    //   inputable: true,
    //   enable: false,
    //   keyboardType: 'number-pad',
    //   isRequired: true,
    // },
    // {
    //   title: '',
    //   subTitle: 'City',
    //   inputable: true,
    //   enable: false,
    //   isRequired: true,
    // },
    // {
    //   title: 'Please Select',
    //   subTitle: 'State',
    //   rightIcon: 'chevron-right',
    //   list: stateList,
    //   selectedItem: stateList[0],
    //   headerTitle: 'State',
    // },
    // {
    //   title: 'Please Select',
    //   subTitle: 'Country',
    //   rightIcon: 'chevron-right',
    //   list: countryList,
    //   selectedItem: countryList[0],
    //   headerTitle: 'State',
    //   isRequired: true,
    // },
    // {
    //   title: '',
    //   subTitle: 'First Name',
    //   inputable: true,
    //   enable: false,
    //   isRequired: true,
    // },
    // {
    //   title: '',
    //   subTitle: 'Last Name',
    //   inputable: true,
    //   enable: false,
    //   isRequired: true,
    // },
    // {
    //   title: '',
    //   subTitle: 'Email',
    //   inputable: true,
    //   enable: false,
    //   isRequired: true,
    // },
    // {
    //   title: '',
    //   subTitle: 'Phone No.',
    //   inputable: true,
    //   enable: false,
    //   isRequired: true,
    // },
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
    keyboardType?: KeyboardTypeOptions | undefined;
    isRequired?: boolean;
    mode?: 'none' | 'multiline';
  }

  const updateInput = (e: string, index: number) => {
    console.log('Text Index', e, index);
    let newData = [...dataSource];
    newData[index].title = e;
    // console.log('New Data', newData);
    setDataSource(newData);
  };

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      console.log('updateObj');
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
              keyboardType={item?.keyboardType}
              mode={item?.mode}
              onPress={() =>
                SelectItems(
                  item,
                  index,
                  navigation,
                  route,
                  'NewCompany',
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

export default NewCompany;
