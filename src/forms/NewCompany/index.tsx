import {View, Text, TextInput, FlatList, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {GapView, ModalView, SingleLineField} from '../../components';
import {Theme, useTheme} from '@react-navigation/native';

const NewCompany = () => {
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
    {title: 'Please Select', subTitle: 'State', rightIcon: 'chevron-right'},
    {title: 'Please Select', subTitle: 'Country', rightIcon: 'chevron-right'},
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

  // type Item = {
  //   id: number;
  //   title: string;
  //   value?: string;
  //   width?: string;
  //   subItem?: Item;
  // };

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
  }

  const updateInput = (e: string, index: number) => {
    console.log('Text Index', e, index);
    let newData = [...dataSource];
    newData[index].title = e;
    console.log('New Data', newData);
    setDataSource(newData);
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
            />
          ))}
          {/* <GapView /> */}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewCompany;
