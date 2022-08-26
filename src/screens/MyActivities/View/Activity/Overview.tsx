import React, {ReactNode, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {useTheme, Theme, useRoute} from '@react-navigation/native';
import {SingleLineField} from '../../../../components';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import II from 'react-native-vector-icons/Ionicons';
import {Activity, SelectFields} from '../../../../types';

interface Item {
  title: string;
  subTitle: string;
  inputable?: boolean;
  enable?: boolean;
  rightIcon?: string;
  onChangeText?: (text: string) => void;
  mode?: 'none' | 'multiline';
  list?: SelectFields[];
  selectedItem?: SelectFields;
  rightChild?: ReactNode;
  searchable?: boolean;
  headerTitle?: string;
  gap?: boolean;
}

const Overview = () => {
  const {colors}: Theme = useTheme();
  const route: any = useRoute();
  const item: Activity = route?.params?.data;
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: item?.name,
      subTitle: 'Summary',
      inputable: true,
    },
    {
      title: item?.company_name,
      subTitle: 'Company',
      rightIcon: 'chevron-right',
    },
    {
      title: item?.date,
      subTitle: 'Due Date',
      rightChild: <MCI name="calendar" size={26} color={colors.primary} />,
    },
    {
      title: item?.start_time,
      subTitle: 'Start Time',
      rightChild: <II name="ios-stopwatch" size={26} color={colors.primary} />,
    },
    {
      title: item?.end_time,
      subTitle: 'End Time',
      rightChild: <II name="ios-stopwatch" size={26} color={colors.primary} />,
      gap: false,
    },
    {
      title: 'Kyle Coney',
      subTitle: 'Contact',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Inquiry',
      subTitle: 'Type',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Remote',
      subTitle: 'Where',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Status',
      subTitle: 'Status',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Resource',
      subTitle: 'Resource',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Visit potential prospect',
      subTitle: 'Notes',
      inputable: true,
      mode: 'multiline',
    },
  ]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      {dataSource.map((item: Item, index: number) => (
        <SingleLineField
          key={index}
          subTitle={item.subTitle}
          title={item.title}
          inputable={item.inputable}
          onChangeText={value => {}}
          enable={item.enable}
          rightIcon={item.rightIcon}
          rightChild={item.rightChild}
          mode={item.mode}
          onPress={() => {}}
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
