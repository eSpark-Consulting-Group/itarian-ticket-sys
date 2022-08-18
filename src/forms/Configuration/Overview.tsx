import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import {PriorityField, SingleLineField} from '../../components';
import {MultiLineField} from '../../components/FormFields';

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

const Overview = () => {
  const {colors}: Theme = useTheme();
  const [titleText, setTitleText] = useState('Some Configuration Title');
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
      subTitle: 'Company Name',
      title: 'Chris Craft Boots',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Contact',
      title: 'Steven Howard',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Site',
      title: 'Southern',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Address',
      title: 'Tempor do laborum magna quis in fugiat ad ex eiusmod',
      rightIconRound: 'map-marker-outline',
      titleWidth: 160,
    },
    {
      subTitle: 'Type',
      title: 'Printer',
      enable: false,
    },
    {
      subTitle: 'Status',
      title: 'New',
      enable: false,
    },
    {
      subTitle: 'Configuration Questions',
      title: 'Tap to View',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Manufacturer',
      title: 'Kents Works',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Mfg Part Number',
      title: 'A-751',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Mfg Part Number',
      title: 'A-751',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Model Number',
      title: '#90234',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Serial Number',
      title: 'S/N123PL',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Tag Number',
      title: 'T45',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Vendor',
      title: 'Loco Fixers',
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
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}>
        {dataSource.map((item: Item, index: number) => (
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
      </ScrollView>
      <MultiLineField title="Notes" />
      <MultiLineField title="Vendor Notes" />
    </>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  priorityBox: {
    backgroundColor: 'yellow',
    borderWidth: 1,
    height: 10,
    width: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.8,
  },
  subTitle: {
    opacity: 0.6,
  },
});
