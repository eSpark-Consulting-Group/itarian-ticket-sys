import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';

import {SingleLineField} from '../../../../components/index';

export default function Overview() {
  const {colors}: Theme = useTheme();
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const overviewList = [
    {
      leftIcon: 'account',
      title: 'Steven Howard',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Opportunity',
      inputable: true,
      title: '3 Years Premium Service Contract',
      enable: false,
    },
    {
      title: 'Southern',
      subTitle: 'Site',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Close Date',
      leftIcon: 'calendar',
      title: '31 Dec 2022',
      enable: false,
    },
    {
      subTitle: 'Priority',
      title: 'Clear Flag',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Open',
      subTitle: 'Status',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Some Stage',
      subTitle: 'Stage',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Some Probibility',
      subTitle: 'Probibility',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Some Rating',
      subTitle: 'Rating',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Some Type',
      subTitle: 'Type',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Some Sales Rep',
      subTitle: 'Sales Rep',
      rightIcon: 'chevron-right',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      {overviewList.map((item, index) => (
        <SingleLineField
          key={index}
          subTitle={item.subTitle}
          inputable={item.inputable}
          title={item.title}
          enable={item.enable}
          rightIcon={item.rightIcon}
          leftIcon={item.leftIcon}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
