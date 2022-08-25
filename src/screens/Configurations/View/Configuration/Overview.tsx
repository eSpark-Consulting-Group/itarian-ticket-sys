import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  useTheme,
  Theme,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import {SingleLineField} from '../../../../components';
import {SelectFields} from '../../../../types';
import {companyNameList} from '../../../../constants/SampleArrays';

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

type State = {
  companyName: SelectFields;
};

const Overview = () => {
  const {colors}: Theme = useTheme();
  const navigation: any = useNavigation();
  const route: any = useRoute();
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
      title: '',
      mode: 'multiline',
      inputable: true,
      onChangeText: setTitleText,
      enable: false,
    },
    {
      subTitle: 'Vendor Notes',
      title: '',
      mode: 'multiline',
      inputable: true,
      onChangeText: setTitleText,
      enable: false,
    },
  ];

  const [Ds, setDs] = useState<Item[]>(dataSource);

  const [state, setState] = useState<State>({
    companyName: {name: 'Chris Craft Boots', id: 1},
  });

  console.log('jua', route?.params);
  useEffect(() => {
    if (route?.params?.item) {
      var obj: any = state;
      obj[route?.params?.item] = route?.params?.selected;
      setState({...obj});
    }
  }, [route?.params]);

  const handlePress = (item: Item, index: number) => {
    let tempArr = [...dataSource];
    if (index == 1) {
      navigation.navigate('Stack2', {
        screen: 'CstmItemSelector',
        params: {
          from: 'Configure1',
          item: 'companyName',
          data: companyNameList,
          selected: state?.companyName,
          stack: 'Stack1',
          title: route?.params?.title,
          headerTitle: 'Company Name',
          searchable: true,
        },
      });
    }
    setDs(tempArr);
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}>
        {Ds.map((item: Item, index: number) => (
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
            mode={item.mode}
            onPress={() => handlePress(item, index)}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
