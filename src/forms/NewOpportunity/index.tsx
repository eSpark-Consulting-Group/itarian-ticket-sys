import { View, Text, TextInput, FlatList, ScrollView } from 'react-native';
import React, { ReactNode, useState } from 'react';
import { GapView, ModalHeader, ModalView, SingleLineField } from '../../components';
import { NavigationRouteContext, Theme, useTheme } from '@react-navigation/native';
import AD from 'react-native-vector-icons/AntDesign';
import { NONoteTypes } from '../../constants/SampleArrays';

const NewOpportunity = ({ navigation, route }: any) => {
  const { colors, dark }: Theme = useTheme();
  const [dataSource, setDataSource] = useState<Item[]>([

    {
      title: '',
      subTitle: 'Oppotunity',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Close Date',
      leftIcon: 'calendar-month',
    },
    {
      title: 'Please Select',
      subTitle: 'Priority',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Please Select',
      subTitle: 'Status',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Please Select',
      subTitle: 'Stage',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Please Select',
      subTitle: 'Probability',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Please Select',
      subTitle: 'Rating',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Please Select',
      subTitle: 'Type',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Please Select',
      subTitle: 'Sales Rep',
      rightIcon: 'chevron-right',
    },
    {
      title: 'Add a Note',
      leftChild: (
        <AD
          name="addfile"
          size={20}
          color={colors.text}
          style={{ opacity: 0.8 }}
          onPress={() => console.log('Pressed')}
        />
      ),
      onPress: () => navigation.navigate('Stack2', {
        screen: 'ComposeNote',
        params: {
          from: 'NewOpportunity',
          item: 'GoneTo',
          data: NONoteTypes,
          selected: null,
          stack: 'Stack2',
          title: route?.params?.title,
          headerTitle: 'Note Type',
          status: route?.params?.status,
        },
      })
      // onPress: () => navigation.navigate('Stack2', { screen: 'ComposeNote' })
    },
  ]);

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
    leftIcon?: string;
    leftChild?: ReactNode;
    onPress?: () => void
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
      <ModalHeader
        icon="office-building-marker-outline"
        title="Select Company"

      />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ backgroundColor: colors.background }}>
          {dataSource.map((item, index) => (
            <SingleLineField
              key={index}
              subTitle={item.subTitle}
              title={item.title}
              inputable={item.inputable}
              onChangeText={e => updateInput(e, index)}
              enable={item.enable}
              leftIcon={item.leftIcon}
              leftChild={item.leftChild}
              rightIcon={item.rightIcon}
              onPress={item.onPress}
            />
          ))}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewOpportunity;
