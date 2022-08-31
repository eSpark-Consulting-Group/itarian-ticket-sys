import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import {
  PriorityField,
  RoundedIcon,
  SingleLineField,
} from '../../../../components';
import {moderateScale} from 'react-native-size-matters';
import {SelectFields} from '../../../../types';

interface Item {
  headerTitle?: string;
  title: string;
  subTitle?: string;
  enable?: boolean;
  rightIcon?: string;
  titleWidth?: number;
  list?: SelectFields[];
  selectedItem?: SelectFields;
  leftIcon?: string;
  searchable?: boolean;
  rightChild?: React.ReactNode;
}

const dataSource: Item[] = [
  {
    title: '(815)-555-1234',
    headerTitle: 'Company Phone No.',
    rightChild: <RoundedIcon icon="phone" />,
    enable: false,
  },
  {
    title: '645 Elm Street Tampa, Fl 32364',
    headerTitle: 'Company Address',
    rightChild: <RoundedIcon icon="map-marker-outline" />,
    enable: false,
    titleWidth: moderateScale(130),
  },
  {
    title: 'Tim Smith',
    leftIcon: 'account',
    headerTitle: 'Company Address',
    enable: false,
  },
  {
    title: 'TSmith@AcmeItSolutions.com',
    headerTitle: 'Email (Primary)',
    rightChild: <RoundedIcon icon="email-outline" />,
    enable: false,
  },
];

const Overview = () => {
  const {colors}: Theme = useTheme();
  const [Ds, setDs] = useState<Item[]>(dataSource);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      {Ds.map((item: Item, index: number) => (
        <SingleLineField
          key={index}
          title={item.title}
          titleWidth={item.titleWidth}
          subTitle={item.subTitle}
          leftIcon={item.leftIcon}
          rightChild={item.rightChild}
          enable={item.enable}
        />
      ))}
    </ScrollView>
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
