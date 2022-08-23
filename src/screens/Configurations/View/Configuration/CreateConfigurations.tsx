import {View, Text, TextInput, FlatList, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {
  CstmTitleInput,
  GapView,
  ModalView,
  SingleLineField,
} from '../../../../components';
import {Theme, useTheme} from '@react-navigation/native';
import {MultiLineField} from '../../../../components/FormFields';

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
}

const NewConfiguration = () => {
  const {colors, dark}: Theme = useTheme();
  const [titleText, setTitleText] = useState('');
  const [billCustomer, setBillCustomer] = useState(false);
  const [needsRenewal, setNeedsRenewal] = useState(false);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: '',
      subTitle: 'Configuration Name',
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'Company',
      title: 'Please Select',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Type',
      title: 'Please Select',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Status',
      title: 'Please Select',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Manufacturer',
      title: 'Please Select',
      rightIcon: 'chevron-right',
    },
    {
      title: '',
      subTitle: 'Mfg Part Number',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Model Number',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Serial Number',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Tag Number',
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'Vendor',
      title: 'Please Select',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Purchase Date',
      title: '20-05-2022',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Expiration Date',
      title: '25-11-2022',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Install Date',
      title: '04-10-2022',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Installed By',
      title: 'Kents Works',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Bill Customer',
      title: `Current State: ${billCustomer ? 'Yes' : 'No'}`,
      showRightSwitch: true,
      enable: false,
      rightSwitchVal: billCustomer,
      onChangeSwitch: value => {
        setBillCustomer(value);
      },
    },
    {
      subTitle: 'Needs Renewal',
      title: 'Tap to toggle on or off',
      showRightSwitch: true,
      enable: false,
      rightSwitchVal: needsRenewal,
      onChangeSwitch: value => {
        setNeedsRenewal(value);
      },
    },
    {
      subTitle: 'Notes',
      title: 'Tap to View Notes',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Vendor Notes',
      title: 'Tap to View Vendor Notes',
      rightIcon: 'chevron-right',
    },
    {
      title: '',
      mode: 'multiline',
      subTitle: 'Notes',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      mode: 'multiline',
      subTitle: 'Vendor Notes',
      inputable: true,
      enable: false,
    },
  ]);

  const updateInput = (e: string, index: number) => {
    console.log('Text Index', e, index);
    let newData = [...dataSource];
    newData[index].title = e;
    console.log('New Data', newData);
    setDataSource(newData);
  };

  const updateSwitch = (index: number) => {
    let newData = [...dataSource];
    newData[index].rightSwitchVal = !newData[index].rightSwitchVal;
    console.log('New Data', newData[index]);
    setDataSource(newData);
  };

  return (
    <ModalView bgColor={colors.card}>
      <ScrollView>
        <View style={{backgroundColor: colors.background}}>
          {dataSource.map((item, index) => (
            <SingleLineField
              key={index}
              mode={item.mode}
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
            />
          ))}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewConfiguration;
