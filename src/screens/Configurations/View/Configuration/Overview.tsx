import React, {ReactNode, useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useTheme, useRoute, useNavigation} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from '@react-native-community/datetimepicker';

import {SingleLineField} from '../../../../components';
import {QNATypes, SelectFields} from '../../../../types';
import {
  companyNameList,
  configQuesList,
  contactNameList,
  installerNameList,
  manufacturerNameList,
  siteNameList,
  vendorNameList,
} from '../../../../constants/SelectionList';

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
  list?: SelectFields[] | QNATypes[];
  selectedItem?: SelectFields;
  rightChild?: ReactNode;
  searchable?: boolean;
  headerTitle?: string;
  onPress?: () => void;
  isRequired?: boolean;
}

type PickerType = 'PD' | 'ED' | 'ID';

const Overview = () => {
  const {colors} = useTheme();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const inputFields = [
    {text: 'Configuration Name'},
    {text: '123f'},
    {text: 'abc1'},
    {text: 'xyz1'},
    {text: 'kso1'},
    {text: 'Some Test Notes'},
    {text: 'Some Test Vendor Notes'},
  ];

  const [showDate, setShowDate] = useState(false);
  const [pickerType, setpickerType] = useState<PickerType>('PD');
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: inputFields[0].text,
      subTitle: 'Configuration Name',
      inputable: true,
      enable: false,
      isRequired: true,
    },
    {
      subTitle: 'Company Name',
      title: 'Chris Craft Boots',
      rightIcon: 'chevron-right',
      list: companyNameList,
      selectedItem: {id: 0, name: 'Chris Craft Boots'},
      searchable: true,
      headerTitle: 'Company Name',
    },
    {
      subTitle: 'Contact',
      title: 'Steven Howard',
      rightIcon: 'chevron-right',
      list: contactNameList,
      selectedItem: {id: 0, name: 'Steven Howard'},
      searchable: true,
      headerTitle: 'Contact Name',
    },
    {
      subTitle: 'Site',
      title: 'Southern',
      rightIcon: 'chevron-right',
      list: siteNameList,
      selectedItem: {id: 0, name: 'Southern'},
      searchable: false,
      headerTitle: 'Site Name',
    },
    {
      subTitle: 'Address',
      title: 'Tempor do laborum magna quis in fugiat ad ex eiusmod',
      rightIconRound: 'map-marker-outline',
      titleWidth: 160,
      enable: false,
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
      list: configQuesList,
    },
    {
      subTitle: 'Manufacturer',
      title: 'Kents Works',
      rightIcon: 'chevron-right',
      list: manufacturerNameList,
      selectedItem: {id: 0, name: 'Kents Works'},
      searchable: false,
      headerTitle: 'Manufacturer Name',
    },
    {
      subTitle: 'Mfg Part Number',
      title: inputFields[1].text,
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'Model Number',
      title: inputFields[2].text,
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'Serial Number',
      title: inputFields[3].text,
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'Tag Number',
      title: inputFields[4].text,
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'Vendor',
      title: 'Loco Fixers',
      rightIcon: 'chevron-right',
      list: vendorNameList,
      selectedItem: {id: 0, name: 'Loco Fixers'},
      searchable: false,
      headerTitle: 'Vendor Name',
    },
    {
      subTitle: 'Purchase Date',
      title: '20-05-2022',
      rightChild: <MCI name="calendar" size={26} color={colors.primary} />,
      onPress: () => {
        setpickerType('PD');
        setShowDate(true);
      },
    },
    {
      subTitle: 'Expiration Date',
      title: '25-11-2022',
      rightChild: <MCI name="calendar" size={26} color={colors.primary} />,
      onPress: () => {
        setpickerType('ED');
        setShowDate(true);
      },
    },
    {
      subTitle: 'Install Date',
      title: '04-10-2022',
      rightChild: <MCI name="calendar" size={26} color={colors.primary} />,
      onPress: () => {
        setpickerType('ID');
        setShowDate(true);
      },
    },
    {
      subTitle: 'Installed By',
      title: 'Kents Works',
      rightIcon: 'chevron-right',
      list: installerNameList,
      selectedItem: {id: 0, name: 'Kents Works'},
      searchable: false,
      headerTitle: 'Installer Name',
    },
    {
      subTitle: 'Bill Customer',
      title: `Current State: No`,
      showRightSwitch: true,
      enable: false,
      rightSwitchVal: false,
    },
    {
      subTitle: 'Needs Renewal',
      title: 'Tap to toggle on or off',
      showRightSwitch: true,
      enable: false,
      rightSwitchVal: false,
    },
    {
      subTitle: 'Notes',
      title: inputFields[5].text,
      mode: 'multiline',
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'Vendor Notes',
      title: inputFields[6].text,
      mode: 'multiline',
      inputable: true,
      enable: false,
    },
  ]);

  const handleSwitchChange = (value: boolean, index: number) => {
    let tempArr = [...dataSource];
    tempArr[index].rightSwitchVal = value;
    if (index == 18)
      tempArr[index].title = value ? 'Current State: Yes' : 'Current State: No';
    setDataSource(tempArr);
  };

  const handleChangeText = (value: string, index: number) => {
    let tempArr = [...dataSource];
    tempArr[index].title = value;
    setDataSource(tempArr);
  };

  useEffect(() => {
    if (route?.params?.item?.toString()) {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
    }
  }, [route?.params?.selected]);

  useEffect(() => {
    const Data: Item[] = [];
    dataSource.map(item =>
      Data.push({
        title: item.title,
        subTitle: item.subTitle,
        isRequired: item.isRequired,
      }),
    );
    navigation?.setParams({
      ...route?.params,
      data: Data,
    });
  }, [dataSource]);

  const handlePress = (item: Item, index: number) => {
    if (index != 7 && item.list) {
      navigation.navigate('Stack2', {
        screen: 'CstmItemSelector',
        params: {
          from: 'Configure1',
          item: index,
          data: item.list,
          selected: item.selectedItem,
          stack: 'Stack1',
          title: route?.params?.title,
          headerTitle: 'Company Name',
          searchable: true,
        },
      });
    }
    if (index == 7) {
      navigation.navigate('Stack2', {
        screen: 'QNA',
        params: {
          from: 'Configure1',
          item: index,
          data: item.list,
          selected: item.selectedItem,
          stack: 'Stack1',
          title: route?.params?.title,
          headerTitle: 'Company Name',
          searchable: true,
        },
      });
    }
  };

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);
    if (event?.type == 'set') {
      switch (pickerType) {
        case 'PD':
          dataSource[14].title = date?.toDateString();
          setDataSource([...dataSource]);
          break;
        case 'ED':
          dataSource[15].title = date?.toDateString();
          setDataSource([...dataSource]);
          break;
        case 'ID':
          dataSource[16].title = date?.toDateString();
          setDataSource([...dataSource]);
        default:
          break;
      }
    }
  };

  return (
    <>
      {showDate && (
        <DatePicker
          mode={'date'}
          value={new Date()}
          minimumDate={new Date()}
          onChange={onChangeDate}
        />
      )}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}>
        {dataSource.map((item: Item, index: number) => (
          <SingleLineField
            key={index}
            subTitle={item.isRequired ? item.subTitle + '*' : item.subTitle}
            title={item.title}
            inputable={item.inputable}
            onChangeText={value => handleChangeText(value, index)}
            enable={item.enable}
            rightIconRound={item.rightIconRound}
            titleWidth={item.titleWidth}
            rightIcon={item.rightIcon}
            showRightSwitch={item.showRightSwitch}
            rightSwitchVal={item.rightSwitchVal}
            onChangeSwitch={value => handleSwitchChange(value, index)}
            rightChild={item.rightChild}
            mode={item.mode}
            onPress={
              item?.onPress ? item.onPress : () => handlePress(item, index)
            }
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
