import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import {SingleLineField} from '../../components';

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
}

export default function App() {
  const {colors}: Theme = useTheme();
  const [ticketSwitch, setTicketSwitch] = useState(false);

  const dataSource: Item[] = [
    {
      title: 'My Tickets Only',
      showRightSwitch: true,
      enable: false,
      rightSwitchVal: ticketSwitch,
      onChangeSwitch: value => setTicketSwitch(value),
    },
    {
      title: 'All',
      subTitle: 'Service Board',
      rightIcon: 'chevron-right',
    },
    {
      title: 'All',
      subTitle: 'Service Board',
      enable: false,
    },
    {
      title: 'Please Select',
      subTitle: 'Priority',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Please Select',
      subTitle: 'Company',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Please Select',
      subTitle: 'Site',
      enable: false,
    },
    {
      title: 'Contact',
      subTitle: 'Please Select',
      rightIcon: 'chevron-right',
    },
    {
      title: 'All',
      subTitle: 'Type',
      enable: false,
    },
    {
      title: 'All',
      subTitle: 'Subtype',
      enable: false,
    },
    {
      title: 'All',
      subTitle: 'Item',
      enable: false,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      {dataSource.map((item: Item, index: number) => (
        <SingleLineField
          key={index}
          subTitle={item.subTitle}
          title={item.title}
          enable={item.enable}
          titleWidth={item.titleWidth}
          rightIcon={item.rightIcon}
          showRightSwitch={item.showRightSwitch}
          rightSwitchVal={item.rightSwitchVal}
          onChangeSwitch={item.onChangeSwitch}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
