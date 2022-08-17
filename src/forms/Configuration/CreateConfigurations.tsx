import {View, Text, TextInput, FlatList, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {
  CstmTitleInput,
  GapView,
  ModalView,
  SingleLineField,
} from '../../components';
import {Theme, useTheme} from '@react-navigation/native';

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

const NewConfiguration = () => {
  const {colors, dark}: Theme = useTheme();
  const [titleText, setTitleText] = useState('');
  const [billCustomer, setBillCustomer] = useState(false);
  const [needsRenewal, setNeedsRenewal] = useState(false);

  const dataSource: Item[] = [
    {
      title: titleText,
      subTitle: 'Configuration Name',
      inputable: true,
      onChangeText: setTitleText,
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
      title: titleText,
      subTitle: 'Mfg Part Number',
      inputable: true,
      onChangeText: setTitleText,
      enable: false,
    },
    {
      title: titleText,
      subTitle: 'Model Number',
      inputable: true,
      onChangeText: setTitleText,
      enable: false,
    },
    {
      title: titleText,
      subTitle: 'Serial Number',
      inputable: true,
      onChangeText: setTitleText,
      enable: false,
    },
    {
      title: titleText,
      subTitle: 'Tag Number',
      inputable: true,
      onChangeText: setTitleText,
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
  ];

  return (
    <ModalView bgColor={colors.card}>
      <ScrollView>
        <View>
          {/* <View
            style={{
              width: '100%',
              paddingHorizontal: 15,
            }}>
            <CstmTitleInput title={'Configuration Name'} value={''} />
            <GapView />
          </View> */}
          <View style={{backgroundColor: colors.background}}>
            {dataSource.map((item, index) => (
              <SingleLineField
                key={index}
                subTitle={item.subTitle}
                title={item.title}
                inputable={item.inputable}
                onChangeText={item.onChangeText}
                enable={item.enable}
                rightIconRound={item.rightIconRound}
                titleWidth={item.titleWidth}
                rightIcon={item.rightIcon}
                showRightSwitch={item.showRightSwitch}
                rightSwitchVal={item.rightSwitchVal}
                onChangeSwitch={item.onChangeSwitch}
              />
            ))}
          </View>
          {/* <View
            style={{
              width: '100%',
              paddingHorizontal: 15,
            }}>
            <CstmTitleInput title={'Mfg Part Number'} value={''} />
            <GapView />
            <CstmTitleInput title={'Model Number'} value={''} />
            <GapView />
            <CstmTitleInput title={'Serial Number'} value={''} />
            <GapView />
            <CstmTitleInput title={'Tag Number'} value={''} />
            <GapView />
            <CstmTitleInput title={'Serial Number'} value={''} />
            <GapView />
          </View> */}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewConfiguration;
